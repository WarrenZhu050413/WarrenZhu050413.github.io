"""Claude Agent for extracting link metadata."""

import asyncio
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass

from claude_agent_sdk import (
    AssistantMessage,
    ClaudeAgentOptions,
    ClaudeSDKClient,
    TextBlock,
    ToolUseBlock,
)
from rich.console import Console


def is_youtube_url(url: str) -> bool:
    """Check if URL is a YouTube video URL.

    Args:
        url: URL to check

    Returns:
        True if URL is a YouTube video URL
    """
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or ""

    # Standard youtube.com URLs
    if hostname in ("youtube.com", "www.youtube.com", "m.youtube.com"):
        return "/watch" in parsed.path or parsed.path.startswith("/v/")

    # Short youtu.be URLs
    if hostname == "youtu.be":
        return bool(parsed.path and len(parsed.path) > 1)

    return False


def is_spotify_url(url: str) -> bool:
    """Check if URL is a Spotify URL.

    Args:
        url: URL to check

    Returns:
        True if URL is a Spotify track, album, artist, or playlist URL
    """
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or ""
    return "spotify.com" in hostname


def is_pinterest_url(url: str) -> bool:
    """Check if URL is a Pinterest URL.

    Args:
        url: URL to check

    Returns:
        True if URL is a Pinterest pin or short URL
    """
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or ""
    return hostname in ("pinterest.com", "www.pinterest.com", "pin.it")


def extract_spotify_metadata(url: str) -> "LinkMetadata | None":
    """Extract metadata from Spotify using oEmbed API.

    Args:
        url: Spotify URL (track, album, artist, playlist)

    Returns:
        LinkMetadata if successful, None otherwise
    """
    oembed_url = f"https://open.spotify.com/oembed?url={urllib.parse.quote(url, safe='')}"

    try:
        with urllib.request.urlopen(oembed_url, timeout=10) as response:
            if response.status != 200:
                return None

            data = json.loads(response.read().decode("utf-8"))
            title = data.get("title", "").strip()

            if not title:
                return None

            # Spotify oEmbed doesn't provide artist info; user must fill in creator manually
            return LinkMetadata(title=title, creator="", tags="music")
    except (urllib.error.URLError, ValueError, json.JSONDecodeError):
        return None


def resolve_pinterest_url(url: str) -> str | None:
    """Resolve a Pinterest short URL (pin.it) to canonical pinterest.com URL.

    Args:
        url: Pinterest URL (short or full)

    Returns:
        Canonical pinterest.com URL, or None if resolution fails
    """
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or ""

    # If already a pinterest.com URL, return as-is
    if hostname in ("pinterest.com", "www.pinterest.com"):
        return url

    # For short URLs (pin.it), follow all redirects to get final URL
    if hostname == "pin.it":
        try:
            # Use urlopen with redirects enabled - it will follow the chain
            request = urllib.request.Request(
                url, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD"
            )
            with urllib.request.urlopen(request, timeout=10) as response:
                final_url = response.url
                final_parsed = urllib.parse.urlparse(final_url)
                if final_parsed.hostname in ("pinterest.com", "www.pinterest.com"):
                    return final_url
        except urllib.error.URLError:
            pass

    return None


def extract_pinterest_metadata(url: str) -> "LinkMetadata | None":
    """Extract metadata from Pinterest using oEmbed API.

    Args:
        url: Pinterest URL (pin or short URL)

    Returns:
        LinkMetadata if successful, None otherwise
    """
    # Resolve short URLs first
    resolved_url = resolve_pinterest_url(url)
    if not resolved_url:
        resolved_url = url

    # Normalize pin URL - extract pin ID and build canonical URL
    # URLs like /pin/123/sent/ or /pin/123/something need to become /pin/123/
    parsed = urllib.parse.urlparse(resolved_url)
    pin_match = re.search(r"/pin/(\d+)", parsed.path)
    if pin_match:
        pin_id = pin_match.group(1)
        clean_url = f"https://www.pinterest.com/pin/{pin_id}/"
    else:
        clean_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"

    oembed_url = f"https://www.pinterest.com/oembed.json?url={urllib.parse.quote(clean_url, safe='')}"

    try:
        request = urllib.request.Request(
            oembed_url, headers={"User-Agent": "Mozilla/5.0"}
        )
        with urllib.request.urlopen(request, timeout=10) as response:
            if response.status != 200:
                return None

            data = json.loads(response.read().decode("utf-8"))
            title = data.get("title", "").strip()
            author = data.get("author_name", "").strip()

            # Pinterest pins often have empty titles
            if not title or title == " ":
                # Use author name as part of title
                title = f"Pin by {author}" if author else "Pinterest Pin"

            return LinkMetadata(title=title, creator=author, tags="pinterest")
    except (urllib.error.URLError, ValueError, json.JSONDecodeError):
        return None


def extract_youtube_metadata(url: str) -> "LinkMetadata | None":
    """Extract metadata from YouTube using oEmbed API.

    Args:
        url: YouTube video URL

    Returns:
        LinkMetadata if successful, None otherwise
    """
    oembed_url = (
        f"https://www.youtube.com/oembed?url={urllib.parse.quote(url, safe='')}&format=json"
    )

    try:
        with urllib.request.urlopen(oembed_url, timeout=10) as response:
            if response.status != 200:
                return None

            data = json.loads(response.read().decode("utf-8"))
            title = data.get("title", "").strip()
            creator = data.get("author_name", "").strip()

            if not title or not creator:
                return None

            return LinkMetadata(title=title, creator=creator, tags="video")
    except (urllib.error.URLError, ValueError, json.JSONDecodeError):
        return None


SYSTEM_PROMPT = """You are a link metadata extractor. Given a URL, you will fetch the page and extract key information.

WORKFLOW:
1. Use WebFetch to fetch the URL content
2. Extract the following information:
   - title: The article/page title (clean, no site name suffix)
   - creator: The author or creator name (person or organization)
   - tags: Optional comma-separated tags describing the content type and topic

GUIDELINES:
- For YouTube videos: extract video title and channel name as creator
- For blog posts: extract post title and author name
- For Wikipedia: extract article title, use "Wikipedia" as creator
- For academic papers: extract paper title and first author(s)
- For news articles: extract headline and publication name as creator
- Clean up titles by removing site name suffixes like "| Medium" or "- YouTube"
- If author is not clearly stated, use the publication/site name
- Tags should be 1-3 relevant keywords (e.g., "video, design" or "paper, AI")

OUTPUT FORMAT:
Return ONLY a structured block like this:

<metadata>
<title>The Clean Article Title</title>
<creator>Author Name</creator>
<tags>tag1, tag2</tags>
</metadata>

Do not include any other text before or after the XML block.
"""


@dataclass
class LinkMetadata:
    """Extracted metadata for a link."""

    title: str
    creator: str
    tags: str | None = None

    @classmethod
    def from_response(cls, response: str) -> "LinkMetadata | None":
        """Parse metadata from Claude's XML response.

        Args:
            response: Claude's response text containing <metadata> block

        Returns:
            LinkMetadata if parsing successful, None otherwise
        """
        # Extract metadata block
        metadata_match = re.search(r"<metadata>(.*?)</metadata>", response, re.DOTALL)
        if not metadata_match:
            return None

        metadata_content = metadata_match.group(1)

        # Extract individual fields
        title_match = re.search(r"<title>(.*?)</title>", metadata_content, re.DOTALL)
        creator_match = re.search(r"<creator>(.*?)</creator>", metadata_content, re.DOTALL)
        tags_match = re.search(r"<tags>(.*?)</tags>", metadata_content, re.DOTALL)

        if not title_match or not creator_match:
            return None

        title = title_match.group(1).strip()
        creator = creator_match.group(1).strip()
        tags = tags_match.group(1).strip() if tags_match else None

        # Clean up empty tags
        if tags and not tags.strip():
            tags = None

        return cls(title=title, creator=creator, tags=tags)


class LinkAgent:
    """Claude agent for extracting link metadata."""

    def __init__(self, console: Console | None = None, model: str = "haiku"):
        """Initialize the link agent.

        Args:
            console: Rich console for output
            model: Claude model to use (haiku, sonnet, opus)
        """
        self.console = console or Console()
        self.model = model

    async def extract_metadata(self, url: str) -> LinkMetadata | None:
        """Extract metadata from a URL using Claude.

        Args:
            url: The URL to extract metadata from

        Returns:
            LinkMetadata if extraction successful, None otherwise
        """
        options = ClaudeAgentOptions(
            model=self.model,
            system_prompt=SYSTEM_PROMPT,
            permission_mode="default",
            max_turns=5,
        )

        prompt = f"Extract metadata from this URL: {url}"

        response_text = []

        async with ClaudeSDKClient(options=options) as client:
            await client.query(prompt)

            async for msg in client.receive_response():
                if isinstance(msg, AssistantMessage):
                    for block in msg.content:
                        if isinstance(block, TextBlock):
                            response_text.append(block.text)
                        elif isinstance(block, ToolUseBlock):
                            self.console.print(f"[dim]Fetching: {url}[/dim]")

        full_response = "".join(response_text)
        return LinkMetadata.from_response(full_response)

    def run(self, url: str) -> LinkMetadata | None:
        """Synchronous wrapper for extract_metadata.

        Args:
            url: The URL to extract metadata from

        Returns:
            LinkMetadata if extraction successful, None otherwise
        """
        return asyncio.run(self.extract_metadata(url))


def extract_link_metadata(
    url: str,
    console: Console | None = None,
    model: str = "haiku",
) -> LinkMetadata | None:
    """Main entry point for extracting link metadata.

    Args:
        url: The URL to extract metadata from
        console: Rich console for output
        model: Claude model to use

    Returns:
        LinkMetadata if extraction successful, None otherwise
    """
    console = console or Console()

    # Use oEmbed for YouTube URLs (faster and more reliable)
    if is_youtube_url(url):
        console.print("[dim]Using YouTube oEmbed API...[/dim]")
        result = extract_youtube_metadata(url)
        if result:
            return result
        # Fall through to Claude agent if oEmbed fails

    # Use oEmbed for Spotify URLs
    if is_spotify_url(url):
        console.print("[dim]Using Spotify oEmbed API...[/dim]")
        result = extract_spotify_metadata(url)
        if result:
            return result
        # Fall through to Claude agent if oEmbed fails

    # Use oEmbed for Pinterest URLs
    if is_pinterest_url(url):
        console.print("[dim]Using Pinterest oEmbed API...[/dim]")
        result = extract_pinterest_metadata(url)
        if result:
            return result
        # Fall through to Claude agent if oEmbed fails

    agent = LinkAgent(console=console, model=model)

    with console.status("[bold green]Extracting metadata...", spinner="dots"):
        result = agent.run(url)

    return result
