"""Collection Registry - Reads from _data/collections.yaml."""

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml


@dataclass
class FieldConfig:
    """Configuration for an extra field."""

    name: str
    required: bool = False
    prompt: str = ""


@dataclass
class CollectionConfig:
    """Configuration for a Jekyll collection."""

    # Identity
    name: str
    label: str
    tagline: str

    # Jekyll
    dir_name: str
    layout: str
    permalink: str

    # CLI
    email_suffix: str
    title_prompt: str

    # Fields with defaults must come after non-default fields
    date_prefix: bool = False
    fields: list[FieldConfig] = field(default_factory=list)

    # Navigation
    nav_label: str | None = None
    nav_url: str | None = None
    nav_match: str = "contains"

    # AI Classification
    classification_hint: str = ""

    # Computed properties
    @property
    def site_url(self) -> str:
        """Get the full site URL for this collection."""
        return f"https://www.warrenzhu.com{self.nav_url or '/' + self.name + '/'}"

    @property
    def extra_fields(self) -> list[str]:
        """Get list of extra field names (for backwards compat)."""
        return [f.name for f in self.fields]

    @property
    def required_fields(self) -> list[str]:
        """Get list of required field names."""
        return ["title"] + [f.name for f in self.fields if f.required]

    @property
    def columns(self) -> list[tuple[str, str]]:
        """Get display columns for table output."""
        cols = [("Slug", "slug"), ("Title", "title")]
        for f in self.fields[:2]:  # Max 2 extra columns
            cols.append((f.prompt or f.name.title(), f.name))
        if not self.fields:
            cols.append(("Date", "date"))
        return cols


@dataclass
class NavItem:
    """Navigation item."""

    label: str
    url: str
    match: str = "contains"


@dataclass
class NavDropdown:
    """Navigation dropdown menu."""

    label: str
    items: list[str]  # Collection names


@dataclass
class Navigation:
    """Navigation configuration."""

    main: list[NavItem] = field(default_factory=list)
    dropdown: NavDropdown | None = None


class Registry:
    """Central registry for all collections."""

    _instance: "Registry | None" = None
    _collections: dict[str, CollectionConfig]
    _navigation: Navigation
    _raw_data: dict[str, Any]

    def __init__(self, registry_path: Path | None = None):
        """Load registry from YAML file."""
        if registry_path is None:
            # Try to find the registry file
            candidates = [
                Path(__file__).parent.parent / "_data" / "collections.yaml",
                Path.home()
                / "Desktop/zPersonalProjects/WarrenZhu050413.github.io/_data/collections.yaml",
            ]
            for candidate in candidates:
                if candidate.exists():
                    registry_path = candidate
                    break

        if registry_path is None or not registry_path.exists():
            raise FileNotFoundError(
                f"Registry file not found. Tried: {[str(c) for c in candidates]}"
            )

        self._path = registry_path
        self._load()

    def _load(self) -> None:
        """Load and parse the registry file."""
        with open(self._path) as f:
            self._raw_data = yaml.safe_load(f)

        # Parse collections
        self._collections = {}
        for name, data in self._raw_data.get("collections", {}).items():
            fields = []
            for f in data.get("fields", []):
                fields.append(
                    FieldConfig(
                        name=f["name"],
                        required=f.get("required", False),
                        prompt=f.get("prompt", f["name"].title()),
                    )
                )

            self._collections[name] = CollectionConfig(
                name=name,
                label=data.get("label", name.title()),
                tagline=data.get("tagline", ""),
                dir_name=data.get("dir", f"_{name}"),
                layout=data.get("layout", name),
                permalink=data.get("permalink", f"/{name}/:slug/"),
                date_prefix=data.get("date_prefix", False),
                email_suffix=data.get("email_suffix", name),
                title_prompt=data.get("title_prompt", "Title"),
                fields=fields,
                nav_label=data.get("nav_label"),
                nav_url=data.get("nav_url"),
                nav_match=data.get("nav_match", "contains"),
                classification_hint=data.get("classification_hint", ""),
            )

        # Parse navigation
        nav_data = self._raw_data.get("navigation", {})
        main_items = []
        for item in nav_data.get("main", []):
            main_items.append(
                NavItem(
                    label=item["label"],
                    url=item["url"],
                    match=item.get("match", "contains"),
                )
            )

        dropdown = None
        if "dropdown" in nav_data:
            dropdown = NavDropdown(
                label=nav_data["dropdown"]["label"],
                items=nav_data["dropdown"]["items"],
            )

        self._navigation = Navigation(main=main_items, dropdown=dropdown)

    @classmethod
    def get(cls) -> "Registry":
        """Get singleton instance."""
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    @classmethod
    def reset(cls) -> None:
        """Reset singleton (for testing)."""
        cls._instance = None

    @property
    def collections(self) -> dict[str, CollectionConfig]:
        """Get all collection configs."""
        return self._collections

    @property
    def navigation(self) -> Navigation:
        """Get navigation config."""
        return self._navigation

    def get_collection(self, name: str) -> CollectionConfig | None:
        """Get a specific collection config."""
        return self._collections.get(name)

    def get_collection_names(self) -> list[str]:
        """Get list of all collection names."""
        return list(self._collections.keys())

    def get_classification_prompt(self) -> str:
        """Generate AI classification prompt from all collections."""
        lines = [
            "Classify this content into ONE of these categories:\n",
        ]
        for i, (name, config) in enumerate(self._collections.items(), 1):
            hint = config.classification_hint.strip() if config.classification_hint else ""
            lines.append(f"{i}. {name.upper()} - {hint}")
            lines.append("")

        lines.append("Respond with ONLY the category name in uppercase.")
        return "\n".join(lines)


# Convenience function for backwards compatibility
def get_registry() -> Registry:
    """Get the registry singleton."""
    return Registry.get()


def get_all_configs() -> dict[str, CollectionConfig]:
    """Get all collection configs."""
    return get_registry().collections
