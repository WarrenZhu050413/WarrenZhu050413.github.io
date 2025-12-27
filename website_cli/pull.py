"""Unified pull command for classifying and creating content from emails.

Uses _data/collections.yaml as the source of truth for:
- Available collections
- AI classification hints
- Field requirements
"""

import json
import os
import re
import subprocess
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path

import typer
import yaml
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.table import Table

from .registry import get_registry, CollectionConfig

console = Console()

# Default project path
DEFAULT_PROJECT = Path.home() / "Desktop/zPersonalProjects/WarrenZhu050413.github.io"

# Color mapping for collections
COLLECTION_COLORS = {
    "sentences": "cyan",
    "random": "magenta",
    "links": "green",
    "posts": "yellow",
}


@dataclass
class EmailCandidate:
    """An email candidate for classification."""

    message_id: str
    subject: str
    body: str
    date: str
    sender: str = ""


def slugify(text: str, max_length: int = 50) -> str:
    """Convert text to URL-safe slug."""
    slug = text.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    slug = slug.strip("-")
    return slug[:max_length]


def yaml_escape_title(title: str) -> str:
    """Escape a title for YAML front matter."""
    result = yaml.dump(title, default_flow_style=True, allow_unicode=True)
    return result.replace("\n...", "").strip()


def fetch_emails(debug: bool = False) -> list[EmailCandidate]:
    """Fetch emails from wzhu+website@college.harvard.edu."""
    email_address = "wzhu+website@college.harvard.edu"
    console.print(f"[cyan]Searching for emails to {email_address}...[/cyan]")

    try:
        result = subprocess.run(
            [
                "gmail",
                "search",
                f"to:{email_address}",
                "--folder",
                "INBOX",
                "--max",
                "50",
                "--output-format",
                "json",
            ],
            capture_output=True,
            text=True,
            check=True,
        )
        data = json.loads(result.stdout)
        all_emails = data.get("emails", [])
        emails = [e for e in all_emails if "DRAFT" not in e.get("labels", [])]
    except subprocess.CalledProcessError as e:
        console.print(f"[red]Failed to search emails: {e.stderr}[/red]")
        raise typer.Exit(1)
    except json.JSONDecodeError:
        console.print("[red]Failed to parse email search results[/red]")
        raise typer.Exit(1)

    if not emails:
        console.print("[yellow]No new notes in inbox[/yellow]")
        raise typer.Exit(0)

    console.print(f"[green]Found {len(emails)} email(s) in inbox[/green]\n")

    candidates = []
    for email in emails:
        subject = email.get("subject", "").strip()
        date_str = email.get("date", "")
        message_id = email.get("message_id", "")
        sender = email.get("from", "")

        if not subject:
            continue

        # Read full email body
        try:
            cmd = ["gmail", "read", message_id, "--full", "--output-format", "json"]
            body_result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            body_data = json.loads(body_result.stdout)
            body = body_data.get("body_plain", body_data.get("body", "")).strip()
        except (subprocess.CalledProcessError, json.JSONDecodeError):
            body = ""

        candidates.append(
            EmailCandidate(
                message_id=message_id,
                subject=subject,
                body=body,
                date=date_str,
                sender=sender,
            )
        )

    return candidates


def classify_with_ai(candidate: EmailCandidate) -> str:
    """Use Claude to classify the content type.

    Returns collection name from registry.
    """
    from claude_agent_sdk import (
        AssistantMessage,
        ClaudeAgentOptions,
        ClaudeSDKClient,
        TextBlock,
    )
    import asyncio

    registry = get_registry()
    system_prompt = registry.get_classification_prompt()

    prompt = f"""Subject: {candidate.subject}

Body:
{candidate.body[:1000]}

Classify this content:"""

    async def classify():
        options = ClaudeAgentOptions(
            model="haiku",
            system_prompt=system_prompt,
            permission_mode="default",
            max_turns=1,
        )

        async with ClaudeSDKClient(options=options) as client:
            await client.query(prompt)

            response_text = []
            async for msg in client.receive_response():
                if isinstance(msg, AssistantMessage):
                    for block in msg.content:
                        if isinstance(block, TextBlock):
                            response_text.append(block.text)

            full_response = "".join(response_text).strip().upper()

            # Match response to collection name
            for name in registry.get_collection_names():
                if name.upper() in full_response:
                    return name

            # Default fallback
            return "random"

    return asyncio.run(classify())


def display_candidate(
    candidate: EmailCandidate, index: int, classification: str | None = None
):
    """Display a candidate email with optional classification."""
    color = COLLECTION_COLORS.get(classification, "white") if classification else "white"
    label = f" → {classification}" if classification else ""

    console.print(
        Panel(
            f"[bold]{candidate.subject}[/bold]\n\n"
            f"{candidate.body[:400]}{'...' if len(candidate.body) > 400 else ''}\n\n"
            f"[dim]Date: {candidate.date}[/dim]",
            title=f"#{index}{label}",
            border_style=color,
        )
    )


def prompt_classification() -> str:
    """Prompt user to select a classification."""
    registry = get_registry()
    collection_names = registry.get_collection_names()

    console.print("\n[dim]Classify as:[/dim]")
    shortcuts = {}
    for i, name in enumerate(collection_names):
        config = registry.get_collection(name)
        color = COLLECTION_COLORS.get(name, "white")
        shortcut = name[0].lower()
        shortcuts[shortcut] = name
        console.print(f"  [{color}]\\[{shortcut}]{name[1:]}[/{color}] - {config.tagline[:40]}")

    shortcuts["x"] = "skip"
    console.print("  [dim]\\[x] skip[/dim]")

    choice = Prompt.ask("Choice", choices=list(shortcuts.keys()), default="r")
    return shortcuts.get(choice, "random")


def create_content(
    candidate: EmailCandidate,
    collection_name: str,
    debug: bool = False,
) -> bool:
    """Create content file and push to git."""
    if collection_name == "skip":
        return False

    registry = get_registry()
    config = registry.get_collection(collection_name)

    if not config:
        console.print(f"[red]Unknown collection: {collection_name}[/red]")
        return False

    collection_dir = DEFAULT_PROJECT / config.dir_name
    collection_dir.mkdir(exist_ok=True)

    # Generate slug
    slug = slugify(candidate.subject)

    # Build filename
    if config.date_prefix:
        try:
            parsed_date = datetime.fromisoformat(candidate.date)
            date_prefix = parsed_date.strftime("%Y-%m-%d")
        except (ValueError, AttributeError):
            date_prefix = datetime.now().strftime("%Y-%m-%d")
        filename = f"{date_prefix}-{slug}.md"
    else:
        filename = f"{slug}.md"

    target = collection_dir / filename

    # Check for duplicates
    if target.exists():
        suffix = 1
        while target.exists():
            if config.date_prefix:
                filename = f"{date_prefix}-{slug}-{suffix}.md"
            else:
                filename = f"{slug}-{suffix}.md"
            target = collection_dir / filename
            suffix += 1

    # Format date
    try:
        parsed_date = datetime.fromisoformat(candidate.date)
        offset = parsed_date.strftime("%z")
        formatted_date = parsed_date.strftime(f"%Y-%m-%d %H:%M:%S {offset}")
    except (ValueError, AttributeError):
        formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")

    # Build frontmatter
    escaped_title = yaml_escape_title(candidate.subject)
    fm_lines = [f"layout: {config.layout}", f"title: {escaped_title}", f"date: {formatted_date}"]

    # Handle extra fields
    for field in config.fields:
        if field.name == "url_link":
            # Try to extract URL from body
            url_match = re.search(r"https?://[^\s<>\"]+", candidate.body)
            if url_match:
                fm_lines.append(f"url_link: {url_match.group()}")
        elif field.name == "categories" and collection_name == "posts":
            fm_lines.append("categories: [writing]")

    file_content = f"---\n{chr(10).join(fm_lines)}\n---\n\n{candidate.body}\n"

    target.write_text(file_content)
    console.print(f"[green]Created: {config.dir_name}/{filename}[/green]")

    # Commit and push
    commit_title = (
        candidate.subject[:47] + "..." if len(candidate.subject) > 50 else candidate.subject
    )
    commit_message = f"New {collection_name}: {commit_title}"

    try:
        subprocess.run(
            ["git", "add", str(target.resolve())],
            cwd=str(DEFAULT_PROJECT),
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", commit_message],
            cwd=str(DEFAULT_PROJECT),
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "push"],
            cwd=str(DEFAULT_PROJECT),
            check=True,
            capture_output=True,
        )
        console.print(f"[green]Pushed: {commit_message}[/green]")

        # Archive email
        archive_email(candidate.message_id, debug)
        return True

    except subprocess.CalledProcessError as e:
        console.print(f"[red]Failed to push: {e}[/red]")
        return False


def archive_email(message_id: str, debug: bool = False) -> bool:
    """Archive an email by removing it from INBOX."""
    GMAILLM_PYTHON = Path.home() / ".local/share/uv/tools/gmaillm/bin/python3"

    script = f"""
from gmaillm.gmail_client import GmailClient
client = GmailClient()
client.service.users().messages().modify(
    userId='me',
    id='{message_id}',
    body={{'removeLabelIds': ['INBOX']}}
).execute()
print('OK')
"""
    try:
        python_cmd = str(GMAILLM_PYTHON) if GMAILLM_PYTHON.exists() else "python3"
        result = subprocess.run(
            [python_cmd, "-c", script], capture_output=True, text=True, timeout=30
        )
        if result.returncode == 0 and "OK" in result.stdout:
            return True
        if debug:
            console.print(f"[yellow]Archive stderr: {result.stderr}[/yellow]")
        return False
    except Exception as e:
        if debug:
            console.print(f"[yellow]Archive failed: {e}[/yellow]")
        return False


def pull_cmd(
    auto: bool = False,
    interactive: bool = False,
    dry_run: bool = False,
    debug: bool = False,
):
    """Pull and classify notes from email.

    Uses collections from _data/collections.yaml for classification.
    """
    candidates = fetch_emails(debug)

    if not candidates:
        return

    registry = get_registry()

    # Auto mode: classify all with AI first
    if auto:
        console.print("[cyan]Classifying with AI...[/cyan]\n")
        classifications: list[tuple[EmailCandidate, str]] = []

        for i, candidate in enumerate(candidates, 1):
            with console.status(f"[bold green]Classifying {i}/{len(candidates)}..."):
                collection_name = classify_with_ai(candidate)
                classifications.append((candidate, collection_name))
                display_candidate(candidate, i, collection_name)
                console.print()

        # Show summary
        console.print("\n[bold]Classification Summary:[/bold]")
        table = Table()
        table.add_column("#", style="dim", width=3)
        table.add_column("Subject", style="white")
        table.add_column("Type", style="cyan")

        for i, (candidate, collection_name) in enumerate(classifications, 1):
            color = COLLECTION_COLORS.get(collection_name, "white")
            table.add_row(
                str(i), candidate.subject[:50], f"[{color}]{collection_name}[/{color}]"
            )

        console.print(table)

        if dry_run:
            console.print("\n[dim]Dry run mode - no changes made.[/dim]")
            return

        # Confirm and process
        if typer.confirm("\nProceed with these classifications?", default=True):
            created = 0
            for candidate, collection_name in classifications:
                if create_content(candidate, collection_name, debug):
                    created += 1
            console.print(f"\n[bold green]Done! Created {created} items.[/bold green]")
        else:
            console.print("[yellow]Cancelled.[/yellow]")
        return

    # Interactive mode: classify each one
    if interactive:
        if dry_run:
            console.print("[dim]Dry run mode - showing candidates only.[/dim]\n")
            for i, candidate in enumerate(candidates, 1):
                display_candidate(candidate, i)
                console.print()
            return

        created = 0
        for i, candidate in enumerate(candidates, 1):
            display_candidate(candidate, i)
            collection_name = prompt_classification()
            if create_content(candidate, collection_name, debug):
                created += 1
            console.print()

        console.print(f"\n[bold green]Done! Created {created} items.[/bold green]")
        return

    # Default: just show what's available
    console.print("[bold]Available items:[/bold]\n")
    for i, candidate in enumerate(candidates, 1):
        display_candidate(candidate, i)
        console.print()

    console.print(
        "[dim]Use --auto for AI classification, --interactive for manual classification.[/dim]"
    )
    console.print(f"[dim]Available collections: {', '.join(registry.get_collection_names())}[/dim]")
