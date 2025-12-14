"""Migrate items between collections."""

import re
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

import typer
import yaml
from rich.console import Console
from rich.panel import Panel

from .registry import get_registry

console = Console()

# Default project path
DEFAULT_PROJECT = Path.home() / "Desktop/zPersonalProjects/WarrenZhu050413.github.io"


def migrate_cmd(
    slug: str,
    source: str,
    target: str,
    force: bool = False,
    debug: bool = False,
) -> None:
    """Migrate an item from one collection to another.

    Handles:
    - File movement
    - Frontmatter updates (layout, required fields)
    - Date prefix changes (for posts)
    - Git commit and push
    """
    registry = get_registry()

    # Validate collections
    source_config = registry.get_collection(source)
    target_config = registry.get_collection(target)

    if not source_config:
        console.print(f"[red]Unknown source collection: {source}[/red]")
        console.print(f"[dim]Available: {', '.join(registry.get_collection_names())}[/dim]")
        raise typer.Exit(1)

    if not target_config:
        console.print(f"[red]Unknown target collection: {target}[/red]")
        console.print(f"[dim]Available: {', '.join(registry.get_collection_names())}[/dim]")
        raise typer.Exit(1)

    # Find source file
    source_dir = DEFAULT_PROJECT / source_config.dir_name
    source_file = source_dir / f"{slug}.md"

    if not source_file.exists():
        # Try with glob for date-prefixed files
        matches = list(source_dir.glob(f"*{slug}.md"))
        if matches:
            source_file = matches[0]
        else:
            console.print(f"[red]Not found: {source_config.dir_name}/{slug}.md[/red]")
            raise typer.Exit(1)

    # Read source content
    content = source_file.read_text()

    # Parse frontmatter
    if not content.startswith("---"):
        console.print("[red]Invalid file format: missing frontmatter[/red]")
        raise typer.Exit(1)

    parts = content.split("---", 2)
    if len(parts) < 3:
        console.print("[red]Invalid file format: incomplete frontmatter[/red]")
        raise typer.Exit(1)

    try:
        frontmatter = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as e:
        console.print(f"[red]Error parsing frontmatter: {e}[/red]")
        raise typer.Exit(1)

    body = parts[2].strip()
    title = frontmatter.get("title", slug)

    # Show preview
    console.print(
        Panel(
            f"[cyan]Title:[/cyan] {title}\n"
            f"[cyan]From:[/cyan] {source} ({source_config.dir_name})\n"
            f"[cyan]To:[/cyan] {target} ({target_config.dir_name})\n"
            f"\n[dim]Body preview:[/dim]\n{body[:200]}{'...' if len(body) > 200 else ''}",
            title="Migration Preview",
            border_style="cyan",
        )
    )

    # Confirm
    if not force:
        if not typer.confirm("\nProceed with migration?", default=True):
            console.print("[yellow]Cancelled.[/yellow]")
            raise typer.Exit(0)

    # Update frontmatter for target
    frontmatter["layout"] = target_config.layout

    # Handle required fields for target
    for field in target_config.fields:
        if field.required and field.name not in frontmatter:
            if field.name == "url_link":
                # Try to extract URL from body
                url_match = re.search(r"https?://[^\s<>\"]+", body)
                if url_match:
                    frontmatter[field.name] = url_match.group()
                    console.print(f"[dim]Auto-extracted URL: {frontmatter[field.name]}[/dim]")
                else:
                    val = typer.prompt(f"{field.prompt} (required)")
                    frontmatter[field.name] = val
            else:
                val = typer.prompt(f"{field.prompt} (required)")
                frontmatter[field.name] = val

    # Generate target filename
    clean_slug = slug
    # Remove date prefix if present
    date_prefix_match = re.match(r"^\d{4}-\d{2}-\d{2}-(.+)$", slug)
    if date_prefix_match:
        clean_slug = date_prefix_match.group(1)

    if target_config.date_prefix:
        # Add date prefix for posts
        date_str = frontmatter.get("date", "")
        if date_str:
            try:
                if isinstance(date_str, str):
                    parsed_date = datetime.fromisoformat(date_str.replace(" -", "-").split()[0])
                else:
                    parsed_date = date_str
                date_prefix = parsed_date.strftime("%Y-%m-%d")
            except (ValueError, AttributeError):
                date_prefix = datetime.now().strftime("%Y-%m-%d")
        else:
            date_prefix = datetime.now().strftime("%Y-%m-%d")
        target_filename = f"{date_prefix}-{clean_slug}.md"
    else:
        target_filename = f"{clean_slug}.md"

    target_dir = DEFAULT_PROJECT / target_config.dir_name
    target_dir.mkdir(exist_ok=True)
    target_file = target_dir / target_filename

    # Check for duplicates
    if target_file.exists():
        console.print(f"[red]Error: {target_filename} already exists in {target}[/red]")
        raise typer.Exit(1)

    # Build new content
    fm_lines = []
    for key, val in frontmatter.items():
        if isinstance(val, str):
            # Escape for YAML
            escaped = yaml.dump(val, default_flow_style=True, allow_unicode=True)
            escaped = escaped.replace("\n...", "").strip()
            fm_lines.append(f"{key}: {escaped}")
        else:
            fm_lines.append(f"{key}: {val}")

    new_content = f"---\n{chr(10).join(fm_lines)}\n---\n\n{body}\n"

    # Write target file
    target_file.write_text(new_content)
    console.print(f"[green]Created: {target_config.dir_name}/{target_filename}[/green]")

    # Delete source file
    source_file.unlink()
    console.print(f"[yellow]Deleted: {source_config.dir_name}/{source_file.name}[/yellow]")

    # Git commit and push
    commit_message = f"Migrate '{title}' from {source} to {target}"

    try:
        subprocess.run(
            ["git", "add", str(target_file.resolve()), str(source_file.resolve())],
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
    except subprocess.CalledProcessError as e:
        console.print(f"[yellow]Warning: Git operation failed: {e}[/yellow]")
        console.print("[dim]Files were moved but not committed.[/dim]")

    console.print(f"\n[bold green]Migration complete![/bold green]")
