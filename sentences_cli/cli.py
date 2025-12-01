"""One True Sentences CLI - Write the truest sentence that you know."""

import os
import re
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
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
    file_content = f'''---
title: "{title}"
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

            console.print("\n[dim]Commands: [c]reate, [e]dit, [d]elete, [p]review, pu[s]h, [q]uit[/dim]")
            action = typer.prompt("Action", default="q")

            if action.lower() in ('q', 'quit'):
                break
            elif action.lower() in ('c', 'create'):
                create(None)
            elif action.lower() in ('e', 'edit'):
                edit(None)
            elif action.lower() in ('d', 'delete'):
                delete(None, force=False)
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
