"""Website CLI - Manage warrenzhu.com content."""

import typer

from .collection import Collection
from .config import LINKS_CONFIG, POSTS_CONFIG, RANDOM_CONFIG, SENTENCES_CONFIG
from .pull import pull_cmd

# Create collection instances
sentences = Collection(SENTENCES_CONFIG)
links = Collection(LINKS_CONFIG)
random = Collection(RANDOM_CONFIG)
posts = Collection(POSTS_CONFIG)

# Main app
app = typer.Typer(
    name="website",
    help="Manage warrenzhu.com content.",
    no_args_is_help=True,
    add_completion=False,
)

# Add sub-apps
app.add_typer(sentences.app, name="sentences", help="Manage One True Sentences")
app.add_typer(links.app, name="links", help="Manage saved links")
app.add_typer(random.app, name="random", help="Manage random thoughts")
app.add_typer(posts.app, name="posts", help="Manage blog posts")


@app.command()
def pull(
    auto: bool = typer.Option(False, "--auto", "-a", help="Auto-classify with AI"),
    interactive: bool = typer.Option(
        False, "--interactive", "-i", help="Interactive classification"
    ),
    dry_run: bool = typer.Option(False, "--dry-run", "-n", help="Show candidates only"),
    debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info"),
):
    """Pull and classify notes from email."""
    pull_cmd(auto=auto, interactive=interactive, dry_run=dry_run, debug=debug)


def main():
    """Entry point for the CLI."""
    app()


if __name__ == "__main__":
    main()
