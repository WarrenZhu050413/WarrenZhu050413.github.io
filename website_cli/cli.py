"""Website CLI - Manage warrenzhu.com content."""

import typer

from .collection import Collection
from .config import LINKS_CONFIG, RANDOM_CONFIG, SENTENCES_CONFIG

# Create collection instances
sentences = Collection(SENTENCES_CONFIG)
links = Collection(LINKS_CONFIG)
random = Collection(RANDOM_CONFIG)

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


def main():
    """Entry point for the CLI."""
    app()


if __name__ == "__main__":
    main()
