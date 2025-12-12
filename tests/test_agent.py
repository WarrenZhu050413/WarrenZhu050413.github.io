"""Tests for website_cli.agent metadata extraction."""

import json
from unittest.mock import MagicMock, patch

import pytest

from website_cli.agent import (
    LinkMetadata,
    extract_spotify_metadata,
    is_spotify_url,
    is_youtube_url,
)


class TestIsSpotifyUrl:
    """Tests for is_spotify_url function."""

    def test_spotify_track_url(self):
        """Should detect Spotify track URLs."""
        url = "https://open.spotify.com/track/6ztstiyZL6FXzh4aG46ZPD"
        assert is_spotify_url(url) is True

    def test_spotify_track_url_with_locale(self):
        """Should detect Spotify track URLs with locale prefix."""
        url = "https://open.spotify.com/intl-es/track/6ztstiyZL6FXzh4aG46ZPD?si=4aeb0ac10227452f"
        assert is_spotify_url(url) is True

    def test_spotify_album_url(self):
        """Should detect Spotify album URLs."""
        url = "https://open.spotify.com/album/1234567890"
        assert is_spotify_url(url) is True

    def test_spotify_playlist_url(self):
        """Should detect Spotify playlist URLs."""
        url = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
        assert is_spotify_url(url) is True

    def test_spotify_artist_url(self):
        """Should detect Spotify artist URLs."""
        url = "https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV"
        assert is_spotify_url(url) is True

    def test_non_spotify_url(self):
        """Should return False for non-Spotify URLs."""
        assert is_spotify_url("https://youtube.com/watch?v=abc") is False
        assert is_spotify_url("https://google.com") is False
        assert is_spotify_url("https://example.com/spotify") is False


class TestIsYoutubeUrl:
    """Tests for is_youtube_url function."""

    def test_youtube_watch_url(self):
        """Should detect YouTube watch URLs."""
        url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        assert is_youtube_url(url) is True

    def test_youtube_short_url(self):
        """Should detect youtu.be short URLs."""
        url = "https://youtu.be/dQw4w9WgXcQ"
        assert is_youtube_url(url) is True

    def test_youtube_mobile_url(self):
        """Should detect mobile YouTube URLs."""
        url = "https://m.youtube.com/watch?v=dQw4w9WgXcQ"
        assert is_youtube_url(url) is True

    def test_non_youtube_url(self):
        """Should return False for non-YouTube URLs."""
        assert is_youtube_url("https://spotify.com/track/123") is False
        assert is_youtube_url("https://vimeo.com/123456") is False


class TestExtractSpotifyMetadata:
    """Tests for extract_spotify_metadata function."""

    @patch("website_cli.agent.urllib.request.urlopen")
    def test_extracts_title_from_spotify_track(self, mock_urlopen):
        """Should extract title from Spotify oEmbed response."""
        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.read.return_value = json.dumps(
            {
                "title": "Boogie Wonderland (with The Emotions)",
                "provider_name": "Spotify",
                "type": "rich",
            }
        ).encode("utf-8")
        mock_response.__enter__ = MagicMock(return_value=mock_response)
        mock_response.__exit__ = MagicMock(return_value=False)
        mock_urlopen.return_value = mock_response

        url = "https://open.spotify.com/intl-es/track/6ztstiyZL6FXzh4aG46ZPD"
        result = extract_spotify_metadata(url)

        assert result is not None
        assert result.title == "Boogie Wonderland (with The Emotions)"
        assert result.creator == ""  # Spotify oEmbed doesn't provide artist
        assert result.tags == "music"

    @patch("website_cli.agent.urllib.request.urlopen")
    def test_returns_none_on_http_error(self, mock_urlopen):
        """Should return None when oEmbed request fails."""
        mock_response = MagicMock()
        mock_response.status = 404
        mock_response.__enter__ = MagicMock(return_value=mock_response)
        mock_response.__exit__ = MagicMock(return_value=False)
        mock_urlopen.return_value = mock_response

        result = extract_spotify_metadata("https://open.spotify.com/track/invalid")
        assert result is None

    @patch("website_cli.agent.urllib.request.urlopen")
    def test_returns_none_on_empty_title(self, mock_urlopen):
        """Should return None when title is empty."""
        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.read.return_value = json.dumps(
            {
                "title": "",
                "provider_name": "Spotify",
            }
        ).encode("utf-8")
        mock_response.__enter__ = MagicMock(return_value=mock_response)
        mock_response.__exit__ = MagicMock(return_value=False)
        mock_urlopen.return_value = mock_response

        result = extract_spotify_metadata("https://open.spotify.com/track/123")
        assert result is None


class TestExtractSpotifyMetadataIntegration:
    """Integration tests for Spotify metadata extraction (hits real API)."""

    @pytest.mark.integration
    def test_boogie_wonderland_track(self):
        """Should extract metadata from Boogie Wonderland Spotify track."""
        url = "https://open.spotify.com/intl-es/track/6ztstiyZL6FXzh4aG46ZPD?si=4aeb0ac10227452f"
        result = extract_spotify_metadata(url)

        assert result is not None
        assert "Boogie Wonderland" in result.title
        assert result.tags == "music"


class TestLinkMetadataFromResponse:
    """Tests for LinkMetadata.from_response parsing."""

    def test_parses_valid_metadata_block(self):
        """Should parse valid XML metadata block."""
        response = """
        <metadata>
        <title>Test Title</title>
        <creator>Test Author</creator>
        <tags>article, tech</tags>
        </metadata>
        """
        result = LinkMetadata.from_response(response)

        assert result is not None
        assert result.title == "Test Title"
        assert result.creator == "Test Author"
        assert result.tags == "article, tech"

    def test_returns_none_for_missing_metadata_block(self):
        """Should return None when metadata block is missing."""
        response = "Just some plain text without XML"
        result = LinkMetadata.from_response(response)
        assert result is None

    def test_returns_none_for_missing_required_fields(self):
        """Should return None when title or creator is missing."""
        response = """
        <metadata>
        <title>Only Title</title>
        </metadata>
        """
        result = LinkMetadata.from_response(response)
        assert result is None

    def test_handles_optional_tags(self):
        """Should handle missing tags field."""
        response = """
        <metadata>
        <title>Test Title</title>
        <creator>Test Author</creator>
        </metadata>
        """
        result = LinkMetadata.from_response(response)

        assert result is not None
        assert result.tags is None
