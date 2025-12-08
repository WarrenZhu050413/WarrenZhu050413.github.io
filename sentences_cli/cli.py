"""One True Sentences CLI - Write the truest sentence that you know."""

import os
import re
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
import yaml
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

# Configuration
SITE_URL = "https://www.warrenzhu.com/sentences"
DEFAULT_PROJECT = Path.home() / "Desktop/zPersonalProjects/WarrenZhu050413.github.io"
_sentences_dir: Path | None = None


def get_sentences_dir() -> Path:
    """Find _sentences directory (cwd, env var, or default project)."""
    global _sentences_dir
    if _sentences_dir is not None:
        return _sentences_dir
    # Check environment variable
    if env_dir := os.environ.get("SENTENCES_DIR"):
        _sentences_dir = Path(env_dir)
    # Check current directory
    elif (Path.cwd() / "_sentences").exists():
        _sentences_dir = Path.cwd() / "_sentences"
    else:
        # Default to Warren's project
        _sentences_dir = DEFAULT_PROJECT / "_sentences"
    return _sentences_dir

# Initialize
app = typer.Typer(
    name="sentences",
    help="Write the truest sentence that you know.",
    no_args_is_help=False,
    add_completion=False,
)
console = Console()


# ============ HELPERS ============

def slugify(text: str, max_length: int = 50) -> str:
    """Convert text to URL-safe slug."""
    slug = text.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug[:max_length]


def yaml_escape_title(title: str) -> str:
    """Escape a title for YAML front matter using PyYAML."""
    # Use yaml.dump to properly escape all special characters
    # Remove document end marker (\n...) and trailing whitespace
    result = yaml.dump(title, default_flow_style=True, allow_unicode=True)
    return result.replace('\n...', '').strip()


def get_sentences() -> list[dict]:
    """Get all sentences from _sentences/ directory."""
    sentences = []
    sentences_dir = get_sentences_dir()
    if not sentences_dir.exists():
        return sentences

    for f in sorted(sentences_dir.glob("*.md"), reverse=True):
        content = f.read_text()

        # Parse front matter
        title = ""
        date = ""
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                fm = parts[1]
                for line in fm.strip().split("\n"):
                    if line.startswith("title:"):
                        title = line.split(":", 1)[1].strip().strip('"\'')
                    elif line.startswith("date:"):
                        date = line.split(":", 1)[1].strip().split()[0]

        sentences.append({
            "slug": f.stem,
            "title": title,
            "date": date,
            "path": str(f),
        })

    return sentences


def display_sentences(sentences: list[dict], show_numbers: bool = True):
    """Display sentences in a table."""
    if not sentences:
        console.print("[yellow]No sentences yet.[/yellow]")
        return

    table = Table(title=f"One True Sentences ({len(sentences)})")

    if show_numbers:
        table.add_column("#", style="dim", justify="right", width=3)
    table.add_column("Slug", style="cyan", no_wrap=True)
    table.add_column("Title", style="white")
    table.add_column("Date", style="dim")

    for i, s in enumerate(sentences, 1):
        row = []
        if show_numbers:
            row.append(str(i))
        row.extend([s["slug"], s["title"][:50] + "..." if len(s["title"]) > 50 else s["title"], s["date"]])
        table.add_row(*row)

    console.print(table)


# ============ COMMANDS ============

@app.command()
def list(debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info")):
    """List all your one true sentences."""
    if debug:
        console.print(f"[dim]Sentences dir: {get_sentences_dir()}[/dim]")
        console.print(f"[dim]Exists: {get_sentences_dir().exists()}[/dim]")
    sentences = get_sentences()
    display_sentences(sentences, show_numbers=False)


@app.command()
def create(
    title: Optional[str] = typer.Argument(None, help="Your one true sentence"),
):
    """Write a new one true sentence."""
    sentences_dir = get_sentences_dir()
    # Ensure directory exists
    sentences_dir.mkdir(exist_ok=True)

    # Get the sentence
    if not title:
        title = typer.prompt("Write the truest sentence that you know")

    if not title.strip():
        console.print("[red]Title cannot be empty.[/red]")
        raise typer.Exit(1)

    # Get content (optional) - launch editor or skip
    content = ""
    console.print("\n[dim]Add a reflection? [Enter to write, q to skip][/dim]")
    choice = typer.prompt("", default="", show_default=False)

    if choice.lower() != 'q':
        # Launch editor for reflection
        editor = os.environ.get("EDITOR", "vim")
        with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
            f.write(f"# Reflection on: {title}\n\n")
            f.write("# Write your reflection below. Lines starting with # will be removed.\n\n\n")
            temp_path = f.name

        # Position cursor below comments (line 6) if using vim
        if "vim" in editor:
            subprocess.run([editor, "+6", temp_path])
        else:
            subprocess.run([editor, temp_path])

        # Read back the content, filtering out comment lines
        with open(temp_path, 'r') as f:
            lines = [line for line in f.readlines() if not line.startswith('#')]
            content = ''.join(lines).strip()

        os.unlink(temp_path)

        if content:
            console.print("[green]Reflection added.[/green]")
        else:
            console.print("[dim]No reflection added.[/dim]")

    # Generate slug
    suggested = slugify(title)
    console.print(f"\n[cyan]Suggested filename:[/cyan] {suggested}")
    slug = typer.prompt("Filename (this becomes the URL)", default=suggested)
    slug = slugify(slug)

    # Check for duplicates
    target = sentences_dir / f"{slug}.md"
    if target.exists():
        console.print(f"[red]Error: {slug}.md already exists![/red]")
        raise typer.Exit(1)

    # Create file
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")
    escaped_title = yaml_escape_title(title)
    file_content = f'''---
title: {escaped_title}
date: {now}
---

{content}
'''.strip() + "\n"

    target.write_text(file_content)

    console.print(Panel(
        f"[green]Created:[/green] _sentences/{slug}.md\n"
        f"[cyan]URL:[/cyan] {SITE_URL}/{slug}/",
        title="Success",
        border_style="green"
    ))


@app.command()
def edit(
    slug: Optional[str] = typer.Argument(None, help="Sentence slug to edit"),
):
    """Refine a sentence (opens in $EDITOR)."""
    sentences = get_sentences()

    if not sentences:
        console.print("[yellow]No sentences to edit.[/yellow]")
        raise typer.Exit(0)

    # If no slug provided, show interactive selection
    if not slug:
        display_sentences(sentences)
        console.print()
        choice = typer.prompt("Select sentence to edit (number or 'q' to quit)", default="1")

        if choice.lower() == 'q':
            raise typer.Exit(0)

        try:
            index = int(choice) - 1
            if 0 <= index < len(sentences):
                slug = sentences[index]["slug"]
            else:
                console.print("[red]Invalid selection.[/red]")
                raise typer.Exit(1)
        except ValueError:
            console.print("[red]Invalid selection.[/red]")
            raise typer.Exit(1)

    # Find and open the file
    target = get_sentences_dir() / f"{slug}.md"
    if not target.exists():
        console.print(f"[red]Not found: {slug}.md[/red]")
        raise typer.Exit(1)

    editor = os.environ.get("EDITOR", "vim")
    console.print(f"[cyan]Opening {slug}.md in {editor}...[/cyan]")
    subprocess.run([editor, str(target)])
    console.print("[green]Done.[/green]")


@app.command()
def delete(
    slug: Optional[str] = typer.Argument(None, help="Sentence slug to delete"),
    force: bool = typer.Option(False, "--force", "-f", help="Skip confirmation"),
):
    """Delete a sentence."""
    sentences = get_sentences()

    if not sentences:
        console.print("[yellow]No sentences to delete.[/yellow]")
        raise typer.Exit(0)

    # If no slug provided, show interactive selection
    if not slug:
        display_sentences(sentences)
        console.print()
        choice = typer.prompt("Select sentence to delete (number or 'q' to quit)", default="q")

        if choice.lower() == 'q':
            raise typer.Exit(0)

        try:
            index = int(choice) - 1
            if 0 <= index < len(sentences):
                slug = sentences[index]["slug"]
            else:
                console.print("[red]Invalid selection.[/red]")
                raise typer.Exit(1)
        except ValueError:
            console.print("[red]Invalid selection.[/red]")
            raise typer.Exit(1)

    target = get_sentences_dir() / f"{slug}.md"
    if not target.exists():
        console.print(f"[red]Not found: {slug}.md[/red]")
        raise typer.Exit(1)

    if not force:
        confirm = typer.confirm(f"Delete {slug}.md?", default=False)
        if not confirm:
            console.print("[yellow]Cancelled.[/yellow]")
            raise typer.Exit(0)

    target.unlink()
    console.print(f"[green]Deleted: {slug}.md[/green]")


def get_project_dir() -> Path:
    """Get the project root directory."""
    sentences_dir = get_sentences_dir()
    return sentences_dir.parent


def archive_email(message_id: str, debug: bool = False) -> bool:
    """Archive an email by removing it from INBOX using Gmail API."""
    # Use the gmaillm tool's Python which has gmaillm installed
    GMAILLM_PYTHON = Path.home() / ".local/share/uv/tools/gmaillm/bin/python3"

    script = f'''
from gmaillm.gmail_client import GmailClient
client = GmailClient()
client.service.users().messages().modify(
    userId='me',
    id='{message_id}',
    body={{'removeLabelIds': ['INBOX']}}
).execute()
print('OK')
'''
    try:
        python_cmd = str(GMAILLM_PYTHON) if GMAILLM_PYTHON.exists() else "python3"
        if debug:
            console.print(f"[dim]Using python: {python_cmd} (exists: {GMAILLM_PYTHON.exists()})[/dim]")
        result = subprocess.run(
            [python_cmd, "-c", script],
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode == 0 and 'OK' in result.stdout:
            return True
        if debug:
            console.print(f"[yellow]Archive stderr: {result.stderr}[/yellow]")
        return False
    except Exception as e:
        if debug:
            console.print(f"[yellow]Archive failed: {e}[/yellow]")
        return False


@app.command()
def preview(
    slug: Optional[str] = typer.Argument(None, help="Specific sentence slug to preview"),
    port: int = typer.Option(4000, "--port", "-p", help="Server port"),
):
    """Preview sentences in browser (launches Jekyll server)."""
    import webbrowser
    import time

    project_dir = get_project_dir()

    # Determine URL to open
    if slug:
        # Check if sentence exists
        target = get_sentences_dir() / f"{slug}.md"
        if not target.exists():
            console.print(f"[red]Not found: {slug}.md[/red]")
            raise typer.Exit(1)
        url = f"http://localhost:{port}/sentences/{slug}/"
    else:
        url = f"http://localhost:{port}/sentences/"

    console.print(f"[cyan]Starting Jekyll server on port {port}...[/cyan]")
    console.print(f"[dim]Will open: {url}[/dim]")

    # Start Jekyll server
    try:
        proc = subprocess.Popen(
            ["bundle", "exec", "jekyll", "serve", "--port", str(port)],
            cwd=project_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
        )

        # Wait for server to start
        console.print("[dim]Waiting for server...[/dim]")
        time.sleep(3)

        # Open browser
        webbrowser.open(url)
        console.print(f"[green]Opened {url}[/green]")
        console.print("[dim]Press Ctrl+C to stop server[/dim]")

        # Wait for process
        proc.wait()
    except KeyboardInterrupt:
        console.print("\n[yellow]Stopping server...[/yellow]")
        proc.terminate()
        proc.wait()
        console.print("[green]Done.[/green]")


@app.command()
def push(
    message: Optional[str] = typer.Argument(None, help="Commit message (optional)"),
    verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed Claude output"),
):
    """Commit and push sentences changes using Claude."""
    import json

    project_dir = get_project_dir()

    # Check for changes in _sentences
    result = subprocess.run(
        ["git", "status", "--porcelain", "_sentences/"],
        cwd=project_dir,
        capture_output=True,
        text=True,
    )

    if not result.stdout.strip():
        console.print("[yellow]No changes in _sentences/ to push.[/yellow]")
        raise typer.Exit(0)

    console.print("[cyan]Changes detected:[/cyan]")
    console.print(result.stdout)

    # Build prompt for Claude
    if message:
        prompt = f'Commit and push the changes in _sentences/ with message: "{message}"'
    else:
        prompt = "Commit and push the changes in _sentences/. Generate an appropriate commit message based on the changes."

    console.print("\n[cyan]Asking Claude to push...[/cyan]")

    # Run claude with stream-json output to capture session_id
    # Note: --verbose is required when using stream-json with -p
    try:
        cmd = ["claude", "-p", prompt, "--output-format", "stream-json", "--verbose"]

        proc = subprocess.Popen(
            cmd,
            cwd=project_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
        )

        session_id = None
        for line in proc.stdout:
            line = line.strip()
            if not line:
                continue

            # Try to parse JSON to extract session_id and show progress
            try:
                data = json.loads(line)
                if "session_id" in data:
                    session_id = data["session_id"]
                # Show assistant messages for visibility
                if data.get("type") == "assistant" and "message" in data:
                    msg = data["message"]
                    if isinstance(msg, dict) and "content" in msg:
                        for block in msg.get("content", []):
                            if block.get("type") == "text":
                                console.print(f"[dim]{block.get('text', '')[:200]}...[/dim]" if len(block.get('text', '')) > 200 else f"[dim]{block.get('text', '')}[/dim]")
                elif data.get("type") == "result":
                    if "result" in data:
                        console.print(f"\n[green]{data['result']}[/green]")
            except json.JSONDecodeError:
                if verbose:
                    console.print(f"[dim]{line}[/dim]")

        proc.wait()

        # Display session_id prominently
        if session_id:
            console.print(f"\n[bold cyan]Session ID:[/bold cyan] {session_id}")
            console.print(f"[dim]To continue this session: claude -c {session_id}[/dim]")
        else:
            console.print("\n[yellow]Could not capture session ID[/yellow]")

    except FileNotFoundError:
        console.print("[red]Error: 'claude' CLI not found. Make sure Claude Code is installed.[/red]")
        raise typer.Exit(1)


@app.command()
def pull(
    interactive: bool = typer.Option(False, "--interactive", "-i", help="Interactive mode: review each email before creating"),
    auto_push: bool = typer.Option(False, "--push", "-p", help="Automatically approve and push all emails"),
    debug: bool = typer.Option(False, "--debug", "-d", help="Show debug information"),
):
    """Pull sentences from emails sent to wzhu+sentences@college.harvard.edu."""
    import json as json_module

    SENTENCES_EMAIL = "wzhu+sentences@college.harvard.edu"

    console.print(f"[cyan]Searching for emails to {SENTENCES_EMAIL}...[/cyan]")

    # Search for emails to the sentences address (INBOX only, not archived)
    try:
        result = subprocess.run(
            ["gmail", "search", f"to:{SENTENCES_EMAIL}", "--folder", "INBOX", "--max", "50", "--output-format", "json"],
            capture_output=True,
            text=True,
            check=True,
        )
        data = json_module.loads(result.stdout)
        all_emails = data.get("emails", [])
        # Filter out drafts - only process sent/delivered emails
        emails = [e for e in all_emails if "DRAFT" not in e.get("labels", [])]
        if debug and len(all_emails) != len(emails):
            console.print(f"[dim]Filtered out {len(all_emails) - len(emails)} draft(s)[/dim]")
    except subprocess.CalledProcessError as e:
        console.print(f"[red]Failed to search emails: {e.stderr}[/red]")
        raise typer.Exit(1)
    except json_module.JSONDecodeError:
        console.print("[red]Failed to parse email search results[/red]")
        raise typer.Exit(1)

    if not emails:
        console.print("[yellow]No new sentences in inbox (emails to wzhu+sentences@college.harvard.edu)[/yellow]")
        raise typer.Exit(0)

    console.print(f"[green]Found {len(emails)} email(s) in inbox[/green]\n")

    # Get existing sentences to check for duplicates
    existing_sentences = get_sentences()
    existing_slugs = {s["slug"] for s in existing_sentences}

    # Parse emails into sentence candidates
    candidates = []
    for email in emails:
        subject = email.get("subject", "").strip()
        date_str = email.get("date", "")
        message_id = email.get("message_id", "")

        if not subject:
            continue

        # Read full email body
        try:
            cmd = ["gmail", "read", message_id, "--full", "--output-format", "json"]
            if debug:
                console.print(f"[dim]Running: {' '.join(cmd)}[/dim]")
            body_result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                check=True,
            )
            if debug:
                console.print(f"[dim]stdout: {body_result.stdout[:200]}...[/dim]")
            body_data = json_module.loads(body_result.stdout)
            body = body_data.get("body_plain", body_data.get("body", "")).strip()
            if debug:
                console.print(f"[dim]body: {body[:100]}...[/dim]")
        except subprocess.CalledProcessError as e:
            if debug:
                console.print(f"[red]Error: {e.stderr}[/red]")
            body = ""
        except json_module.JSONDecodeError as e:
            if debug:
                console.print(f"[red]JSON decode error: {e}[/red]")
            body = ""

        # Generate slug
        slug = slugify(subject)

        # Check if already exists
        is_duplicate = slug in existing_slugs

        candidates.append({
            "message_id": message_id,
            "title": subject,
            "body": body,
            "date": date_str,
            "slug": slug,
            "is_duplicate": is_duplicate,
        })

    if not candidates:
        console.print("[yellow]No valid sentence candidates found[/yellow]")
        raise typer.Exit(0)

    # Display candidates
    console.print("[bold]Sentence Candidates:[/bold]\n")
    for i, c in enumerate(candidates, 1):
        status = "[yellow](duplicate)[/yellow]" if c["is_duplicate"] else "[green](new)[/green]"
        console.print(Panel(
            f"[bold]{c['title']}[/bold]\n\n"
            f"{c['body'][:300]}{'...' if len(c['body']) > 300 else ''}\n\n"
            f"[dim]Date: {c['date']}[/dim]\n"
            f"[dim]Slug: {c['slug']}[/dim]",
            title=f"#{i} {status}",
            border_style="cyan" if not c["is_duplicate"] else "yellow",
        ))
        console.print()

    # Filter out duplicates for processing
    new_candidates = [c for c in candidates if not c["is_duplicate"]]

    if not new_candidates:
        console.print("[yellow]All emails are duplicates of existing sentences[/yellow]")
        raise typer.Exit(0)

    console.print(f"[cyan]{len(new_candidates)} new sentence(s) to process[/cyan]\n")

    if not interactive and not auto_push:
        console.print("[dim]Use -i for interactive mode or -p to auto-push[/dim]")
        raise typer.Exit(0)

    # Process candidates
    sentences_dir = get_sentences_dir()
    sentences_dir.mkdir(exist_ok=True)
    project_dir = get_project_dir()

    created_count = 0
    skipped_count = 0

    for i, candidate in enumerate(new_candidates, 1):
        console.print(f"\n[bold cyan]Processing {i}/{len(new_candidates)}: {candidate['title']}[/bold cyan]")

        if interactive:
            # Show the candidate
            console.print(Panel(
                f"[bold]{candidate['title']}[/bold]\n\n"
                f"{candidate['body']}\n\n"
                f"[dim]Date: {candidate['date']}[/dim]\n"
                f"[dim]Slug: {candidate['slug']}[/dim]",
                border_style="cyan",
            ))

            console.print("\n[dim]Options: \\[a]pprove, \\[s]kip, \\[e]dit[/dim]")
            choice = typer.prompt("Action", default="a").lower()

            if choice in ('s', 'skip'):
                console.print("[yellow]Skipped[/yellow]")
                skipped_count += 1
                continue

            if choice in ('e', 'edit'):
                # Edit in $EDITOR
                editor = os.environ.get("EDITOR", "vim")
                with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
                    f.write(f"# Title (first line becomes the sentence title)\n")
                    f.write(f"{candidate['title']}\n\n")
                    f.write(f"# Body (everything below becomes the elaboration)\n")
                    f.write(f"{candidate['body']}\n")
                    temp_path = f.name

                subprocess.run([editor, temp_path])

                # Parse edited content
                with open(temp_path, 'r') as f:
                    content = f.read()
                os.unlink(temp_path)

                # Parse: first non-comment, non-empty line is title, rest is body
                lines = content.split('\n')
                new_title = None
                body_lines = []
                in_body = False

                for line in lines:
                    if line.startswith('#'):
                        if 'body' in line.lower():
                            in_body = True
                        continue
                    if not in_body:
                        if line.strip() and not new_title:
                            new_title = line.strip()
                    else:
                        body_lines.append(line)

                if new_title:
                    candidate['title'] = new_title
                    candidate['slug'] = slugify(new_title)
                candidate['body'] = '\n'.join(body_lines).strip()

                console.print(f"[green]Updated: {candidate['title']}[/green]")

        # Create the sentence file
        target = sentences_dir / f"{candidate['slug']}.md"

        # Handle duplicate slugs from editing
        if target.exists():
            console.print(f"[yellow]Slug {candidate['slug']} already exists, adding suffix[/yellow]")
            suffix = 1
            while target.exists():
                new_slug = f"{candidate['slug']}-{suffix}"
                target = sentences_dir / f"{new_slug}.md"
                suffix += 1
            candidate['slug'] = target.stem

        # Parse and format date
        try:
            parsed_date = datetime.fromisoformat(candidate['date'])
            offset = parsed_date.strftime("%z")
            if len(offset) == 5:  # +0500 -> +05:00
                offset = offset[:3] + ":" + offset[3:]
            formatted_date = parsed_date.strftime(f"%Y-%m-%d %H:%M:%S {offset.replace(':', '')}")
        except (ValueError, AttributeError):
            formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")

        # Use yaml_escape_title for proper YAML escaping
        escaped_title = yaml_escape_title(candidate['title'])
        file_content = f'''---
title: {escaped_title}
date: {formatted_date}
---

{candidate['body']}
'''.strip() + "\n"

        target.write_text(file_content)
        console.print(f"[green]Created: _sentences/{candidate['slug']}.md[/green]")

        # Commit and push this sentence
        file_path = f"_sentences/{candidate['slug']}.md"
        commit_title = candidate['title'][:47] + "..." if len(candidate['title']) > 50 else candidate['title']
        commit_message = f"New sentences: {commit_title}"

        try:
            subprocess.run(
                ["git", "add", file_path],
                cwd=project_dir,
                check=True,
                capture_output=True,
            )
            subprocess.run(
                ["git", "commit", "-m", commit_message],
                cwd=project_dir,
                check=True,
                capture_output=True,
            )
            subprocess.run(
                ["git", "push"],
                cwd=project_dir,
                check=True,
                capture_output=True,
            )
            console.print(f"[green]Pushed: {commit_message}[/green]")
            created_count += 1

            # Archive the email (remove from INBOX)
            try:
                archive_email(candidate['message_id'], debug)
                if debug:
                    console.print(f"[dim]Archived email {candidate['message_id']}[/dim]")
            except Exception as e:
                if debug:
                    console.print(f"[yellow]Failed to archive email: {e}[/yellow]")

        except subprocess.CalledProcessError as e:
            console.print(f"[red]Failed to push: {e}[/red]")
            # Continue with next sentence

    console.print(f"\n[bold green]Done! Created {created_count} sentence(s), skipped {skipped_count}[/bold green]")


@app.callback(invoke_without_command=True)
def callback(ctx: typer.Context):
    """Write the truest sentence that you know."""
    if ctx.invoked_subcommand is None:
        # Interactive mode - show menu
        while True:
            console.print("\n[bold cyan]One True Sentences[/bold cyan]")
            console.print("[dim]Write the truest sentence that you know.[/dim]\n")
            sentences = get_sentences()
            display_sentences(sentences)

            console.print("\n[dim]Commands: [c]reate, [e]dit, [d]elete, p[u]ll, [p]review, pu[s]h, [q]uit[/dim]")
            action = typer.prompt("Action", default="q")

            if action.lower() in ('q', 'quit'):
                break
            elif action.lower() in ('c', 'create'):
                create(None)
            elif action.lower() in ('e', 'edit'):
                edit(None)
            elif action.lower() in ('d', 'delete'):
                delete(None, force=False)
            elif action.lower() in ('u', 'pull'):
                pull(interactive=True)
            elif action.lower() in ('p', 'preview'):
                preview(None)
            elif action.lower() in ('s', 'push'):
                push(None)
            elif action.isdigit():
                # Direct number selection for editing
                idx = int(action) - 1
                if 0 <= idx < len(sentences):
                    edit(sentences[idx]["slug"])
                else:
                    console.print("[red]Invalid selection.[/red]")
            else:
                console.print("[yellow]Unknown command.[/yellow]")


def main():
    """Entry point for the CLI."""
    app()


if __name__ == "__main__":
    main()
