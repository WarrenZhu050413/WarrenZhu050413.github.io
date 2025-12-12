"""Unified pull command for classifying and creating content from emails."""

import json
import os
import re
import subprocess
import tempfile
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from pathlib import Path

import typer
import yaml
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from rich.table import Table

from .config import (
    DEFAULT_PROJECT,
    LINKS_CONFIG,
    POSTS_CONFIG,
    RANDOM_CONFIG,
    SENTENCES_CONFIG,
)

console = Console()


class ContentType(str, Enum):
    """Types of content that can be created."""

    SENTENCE = "sentence"
    RANDOM = "random"
    LINK = "link"
    POST = "post"
    SKIP = "skip"


CONTENT_CONFIGS = {
    ContentType.SENTENCE: SENTENCES_CONFIG,
    ContentType.RANDOM: RANDOM_CONFIG,
    ContentType.LINK: LINKS_CONFIG,
    ContentType.POST: POSTS_CONFIG,
}

CONTENT_COLORS = {
    ContentType.SENTENCE: "cyan",
    ContentType.RANDOM: "magenta",
    ContentType.LINK: "green",
    ContentType.POST: "yellow",
    ContentType.SKIP: "dim",
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
    """Escape a title for YAML front matter using PyYAML."""
    result = yaml.dump(title, default_flow_style=True, allow_unicode=True)
    return result.replace("\n...", "").strip()


def fetch_emails(debug: bool = False) -> list[EmailCandidate]:
    """Fetch emails from wzhu+notes@college.harvard.edu."""
    email_address = "wzhu+notes@college.harvard.edu"
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


def classify_with_ai(candidate: EmailCandidate) -> ContentType:
    """Use Claude to classify the content type."""
    from claude_agent_sdk import (
        AssistantMessage,
        ClaudeAgentOptions,
        ClaudeSDKClient,
        TextBlock,
    )
    import asyncio

    system_prompt = """You are a content classifier. Given an email subject and body, classify it into ONE of these categories:

1. SENTENCE - A short, profound observation or quote. Usually 1-2 sentences of timeless wisdom.
2. RANDOM - A casual thought, amusing observation, or whimsical idea. Not profound, just fun.
3. LINK - Contains a URL to an external resource worth saving.
4. POST - A longer piece of writing, an essay, or detailed thoughts that deserve their own blog post.

Respond with ONLY the category name in uppercase: SENTENCE, RANDOM, LINK, or POST"""

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

            if "SENTENCE" in full_response:
                return ContentType.SENTENCE
            elif "RANDOM" in full_response:
                return ContentType.RANDOM
            elif "LINK" in full_response:
                return ContentType.LINK
            elif "POST" in full_response:
                return ContentType.POST
            else:
                return ContentType.RANDOM  # Default fallback

    return asyncio.run(classify())


def display_candidate(candidate: EmailCandidate, index: int, classification: ContentType | None = None):
    """Display a candidate email with optional classification."""
    color = CONTENT_COLORS.get(classification, "white") if classification else "white"
    label = f" → {classification.value}" if classification else ""

    console.print(
        Panel(
            f"[bold]{candidate.subject}[/bold]\n\n"
            f"{candidate.body[:400]}{'...' if len(candidate.body) > 400 else ''}\n\n"
            f"[dim]Date: {candidate.date}[/dim]",
            title=f"#{index}{label}",
            border_style=color,
        )
    )


def prompt_classification() -> ContentType:
    """Prompt user to select a classification."""
    console.print("\n[dim]Classify as:[/dim]")
    console.print("  [cyan][s]entence[/cyan] - Profound observation")
    console.print("  [magenta][r]andom[/magenta] - Casual thought")
    console.print("  [green][l]ink[/green] - External URL")
    console.print("  [yellow][p]ost[/yellow] - Blog post")
    console.print("  [dim][x] skip[/dim]")

    choice = Prompt.ask("Choice", choices=["s", "r", "l", "p", "x"], default="r")

    mapping = {
        "s": ContentType.SENTENCE,
        "r": ContentType.RANDOM,
        "l": ContentType.LINK,
        "p": ContentType.POST,
        "x": ContentType.SKIP,
    }
    return mapping[choice]


def create_content(
    candidate: EmailCandidate,
    content_type: ContentType,
    debug: bool = False,
) -> bool:
    """Create content file and push to git."""
    if content_type == ContentType.SKIP:
        return False

    config = CONTENT_CONFIGS[content_type]
    collection_dir = DEFAULT_PROJECT / config.dir_name
    collection_dir.mkdir(exist_ok=True)

    # Generate slug
    slug = slugify(candidate.subject)

    # Check for duplicates
    target = collection_dir / f"{slug}.md"
    if target.exists():
        suffix = 1
        while target.exists():
            new_slug = f"{slug}-{suffix}"
            target = collection_dir / f"{new_slug}.md"
            suffix += 1
        slug = target.stem

    # For posts, add date prefix
    if content_type == ContentType.POST:
        try:
            parsed_date = datetime.fromisoformat(candidate.date)
            date_prefix = parsed_date.strftime("%Y-%m-%d")
        except (ValueError, AttributeError):
            date_prefix = datetime.now().strftime("%Y-%m-%d")
        target = collection_dir / f"{date_prefix}-{slug}.md"

    # Format date
    try:
        parsed_date = datetime.fromisoformat(candidate.date)
        offset = parsed_date.strftime("%z")
        formatted_date = parsed_date.strftime(f"%Y-%m-%d %H:%M:%S {offset}")
    except (ValueError, AttributeError):
        formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")

    # Build frontmatter
    escaped_title = yaml_escape_title(candidate.subject)
    fm_lines = [f"title: {escaped_title}", f"date: {formatted_date}"]

    if content_type == ContentType.POST:
        fm_lines.append("layout: post")
        fm_lines.append("categories: [writing]")

    if content_type == ContentType.LINK:
        # Try to extract URL from body
        url_match = re.search(r"https?://[^\s<>\"]+", candidate.body)
        if url_match:
            fm_lines.append(f"url_link: {url_match.group()}")

    file_content = (
        f"""---
{chr(10).join(fm_lines)}
---

{candidate.body}
""".strip()
        + "\n"
    )

    target.write_text(file_content)
    console.print(f"[green]Created: {config.dir_name}/{target.name}[/green]")

    # Commit and push
    project_dir = DEFAULT_PROJECT
    commit_title = candidate.subject[:47] + "..." if len(candidate.subject) > 50 else candidate.subject
    commit_message = f"New {content_type.value}: {commit_title}"

    try:
        subprocess.run(
            ["git", "add", str(target.resolve())],
            cwd=str(project_dir),
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "commit", "-m", commit_message],
            cwd=str(project_dir),
            check=True,
            capture_output=True,
        )
        subprocess.run(
            ["git", "push"],
            cwd=str(project_dir),
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

    Modes:
    - Default: Show candidates and prompt for each
    - --auto: Use AI to classify, then confirm batch
    - --interactive: Classify each one interactively
    """
    candidates = fetch_emails(debug)

    if not candidates:
        return

    # Auto mode: classify all with AI first
    if auto:
        console.print("[cyan]Classifying with AI...[/cyan]\n")
        classifications: list[tuple[EmailCandidate, ContentType]] = []

        for i, candidate in enumerate(candidates, 1):
            with console.status(f"[bold green]Classifying {i}/{len(candidates)}..."):
                content_type = classify_with_ai(candidate)
                classifications.append((candidate, content_type))
                display_candidate(candidate, i, content_type)
                console.print()

        # Show summary
        console.print("\n[bold]Classification Summary:[/bold]")
        table = Table()
        table.add_column("#", style="dim", width=3)
        table.add_column("Subject", style="white")
        table.add_column("Type", style="cyan")

        for i, (candidate, content_type) in enumerate(classifications, 1):
            color = CONTENT_COLORS[content_type]
            table.add_row(str(i), candidate.subject[:50], f"[{color}]{content_type.value}[/{color}]")

        console.print(table)

        if dry_run:
            console.print("\n[dim]Dry run mode - no changes made.[/dim]")
            return

        # Confirm and process
        if typer.confirm("\nProceed with these classifications?", default=True):
            created = 0
            for candidate, content_type in classifications:
                if create_content(candidate, content_type, debug):
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
            content_type = prompt_classification()
            if create_content(candidate, content_type, debug):
                created += 1
            console.print()

        console.print(f"\n[bold green]Done! Created {created} items.[/bold green]")
        return

    # Default: just show what's available
    console.print("[bold]Available items:[/bold]\n")
    for i, candidate in enumerate(candidates, 1):
        display_candidate(candidate, i)
        console.print()

    console.print("[dim]Use --auto for AI classification, --interactive for manual classification.[/dim]")
