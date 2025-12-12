"""Collection configurations for website CLI."""

from dataclasses import dataclass, field
from pathlib import Path


@dataclass
class CollectionConfig:
    """Configuration for a Jekyll collection."""

    name: str  # "sentences" or "links"
    dir_name: str  # "_sentences" or "_links"
    site_url: str  # "https://www.warrenzhu.com/sentences"
    email_suffix: str  # "sentences" (for wzhu+sentences@...)
    tagline: str  # "Write the truest sentence..."

    # Field configuration
    extra_fields: list = field(default_factory=list)  # ["url_link", "type", "creator"] for links
    required_fields: list = field(default_factory=lambda: ["title"])

    # Display columns: list of (header, key) tuples
    columns: list = field(default_factory=list)

    # Prompts
    title_prompt: str = "Title"  # Can be customized per collection


# Default project path
DEFAULT_PROJECT = Path.home() / "Desktop/zPersonalProjects/WarrenZhu050413.github.io"


SENTENCES_CONFIG = CollectionConfig(
    name="sentences",
    dir_name="_sentences",
    site_url="https://www.warrenzhu.com/sentences",
    email_suffix="sentences",
    tagline="Write the truest sentence that you know.",
    extra_fields=[],
    required_fields=["title"],
    columns=[("Slug", "slug"), ("Title", "title"), ("Date", "date")],
    title_prompt="Write the truest sentence that you know",
)

LINKS_CONFIG = CollectionConfig(
    name="links",
    dir_name="_links",
    site_url="https://www.warrenzhu.com/links",
    email_suffix="links",
    tagline="Save links worth revisiting.",
    extra_fields=["url_link", "creator"],
    required_fields=["title", "url_link"],
    columns=[("Slug", "slug"), ("Title", "title"), ("Creator", "creator")],
    title_prompt="Title",
)

RANDOM_CONFIG = CollectionConfig(
    name="random",
    dir_name="_random",
    site_url="https://www.warrenzhu.com/random",
    email_suffix="random",
    tagline="Loose threads and unfinished thoughts.",
    extra_fields=[],
    required_fields=["title"],
    columns=[("Slug", "slug"), ("Title", "title"), ("Date", "date")],
    title_prompt="What's on your mind?",
)

POSTS_CONFIG = CollectionConfig(
    name="posts",
    dir_name="_posts",
    site_url="https://www.warrenzhu.com",
    email_suffix="writing",
    tagline="Long-form writing and essays.",
    extra_fields=["categories", "description"],
    required_fields=["title"],
    columns=[("Slug", "slug"), ("Title", "title"), ("Date", "date")],
    title_prompt="Post title",
)
