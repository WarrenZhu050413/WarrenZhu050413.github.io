"""Website CLI - Manage warrenzhu.com content.

All collections are auto-generated from _data/collections.yaml.
To add a new collection, edit that file - no code changes needed!
"""

import typer
from rich.console import Console

from .collection import Collection
from .migrate import migrate_cmd
from .pull import pull_cmd
from .registry import get_registry

console = Console()

# Main app
app = typer.Typer(
    name="website",
    help="Manage warrenzhu.com content.",
    no_args_is_help=True,
    add_completion=False,
)


def _register_collections() -> None:
    """Dynamically register all collections from registry."""
    registry = get_registry()

    for name, config in registry.collections.items():
        collection = Collection(config)
        app.add_typer(
            collection.app,
            name=name,
            help=config.tagline,
        )


# Register collections at import time
_register_collections()


@app.command()
def pull(
    auto: bool = typer.Option(False, "--auto", "-a", help="Auto-classify with AI"),
    interactive: bool = typer.Option(
        False, "--interactive", "-i", help="Interactive classification"
    ),
    dry_run: bool = typer.Option(False, "--dry-run", "-n", help="Show candidates only"),
    debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info"),
):
    """Pull and classify notes from email.

    Fetches emails from wzhu+notes@college.harvard.edu and classifies
    them into the appropriate collection.

    [bold cyan]MODES[/bold cyan]:
      [dim]$[/dim] website pull              # Show candidates
      [dim]$[/dim] website pull --auto       # AI auto-classification
      [dim]$[/dim] website pull --interactive  # Manual classification
    """
    pull_cmd(auto=auto, interactive=interactive, dry_run=dry_run, debug=debug)


@app.command()
def migrate(
    slug: str = typer.Argument(..., help="Item slug to migrate"),
    source: str = typer.Option(..., "--from", "-f", help="Source collection"),
    target: str = typer.Option(..., "--to", "-t", help="Target collection"),
    force: bool = typer.Option(False, "--force", help="Skip confirmation"),
    debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info"),
):
    """Migrate an item between collections.

    [bold cyan]EXAMPLES[/bold cyan]:
      [dim]$[/dim] website migrate my-thought --from random --to sentences
      [dim]$[/dim] website migrate my-link --from links --to posts
    """
    migrate_cmd(slug=slug, source=source, target=target, force=force, debug=debug)


@app.command()
def collections():
    """List all available collections."""
    from rich.table import Table

    registry = get_registry()
    table = Table(title="Available Collections")
    table.add_column("Name", style="cyan")
    table.add_column("Label", style="white")
    table.add_column("Directory", style="dim")
    table.add_column("Email Suffix", style="dim")

    for name, config in registry.collections.items():
        table.add_row(name, config.label, config.dir_name, config.email_suffix)

    console.print(table)
    console.print("\n[dim]Edit _data/collections.yaml to add more collections.[/dim]")


def main() -> None:
    """Entry point for CLI."""
    app()


if __name__ == "__main__":
    main()
