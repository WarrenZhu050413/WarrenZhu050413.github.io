"""Tests for Collection class and agent."""

from unittest.mock import MagicMock, patch

import pytest
import typer

from website_cli.agent import extract_youtube_metadata, is_youtube_url
from website_cli.collection import Collection
from website_cli.config import LINKS_CONFIG


class TestYouTubeExtraction:
    """Tests for YouTube URL detection and oEmbed extraction."""

    def test_is_youtube_url_standard(self):
        """Detect standard YouTube watch URLs."""
        assert is_youtube_url("https://www.youtube.com/watch?v=abc123")
        assert is_youtube_url("http://youtube.com/watch?v=abc123")
        assert is_youtube_url("https://youtube.com/watch?v=abc123&t=10s")

    def test_is_youtube_url_short(self):
        """Detect short youtu.be URLs."""
        assert is_youtube_url("https://youtu.be/abc123")
        assert is_youtube_url("http://youtu.be/abc123?t=10")

    def test_is_youtube_url_negative(self):
        """Non-YouTube URLs should return False."""
        assert not is_youtube_url("https://vimeo.com/123456")
        assert not is_youtube_url("https://example.com/youtube")
        assert not is_youtube_url("https://notyoutube.com/watch?v=abc")

    def test_extract_youtube_metadata_success(self):
        """Extract metadata from YouTube oEmbed API."""
        import json

        mock_response = MagicMock()
        mock_response.status = 200
        mock_response.read.return_value = json.dumps(
            {
                "title": "Test Video Title",
                "author_name": "Test Channel",
            }
        ).encode("utf-8")
        mock_response.__enter__ = MagicMock(return_value=mock_response)
        mock_response.__exit__ = MagicMock(return_value=False)

        with patch("website_cli.agent.urllib.request.urlopen", return_value=mock_response):
            result = extract_youtube_metadata("https://www.youtube.com/watch?v=test123")

        assert result is not None
        assert result.title == "Test Video Title"
        assert result.creator == "Test Channel"
        assert result.tags == "video"

    def test_extract_youtube_metadata_failure(self):
        """Handle oEmbed API failure gracefully."""
        import urllib.error

        with patch(
            "website_cli.agent.urllib.request.urlopen",
            side_effect=urllib.error.URLError("Not found"),
        ):
            result = extract_youtube_metadata("https://www.youtube.com/watch?v=invalid")

        assert result is None


class TestCreateCmdAutoMode:
    """Tests for create_cmd with --auto flag."""

    @pytest.fixture
    def links_collection(self, tmp_path):
        """Create a links collection with a temp directory."""
        config = LINKS_CONFIG
        collection = Collection(config)
        # Override the directory to use temp path
        collection._dir = tmp_path / "_links"
        collection._dir.mkdir()
        return collection

    def test_auto_mode_prompts_skip_on_extraction_failure(self, links_collection):
        """When metadata extraction fails, user should be prompted to skip or continue manually."""
        url = "https://www.youtube.com/watch?v=test123"

        with (
            patch("website_cli.agent.extract_link_metadata") as mock_extract,
            patch.object(typer, "prompt"),
            patch.object(typer, "confirm") as mock_confirm,
        ):
            # Simulate extraction failure
            mock_extract.return_value = None

            # User chooses to skip
            mock_confirm.return_value = False  # No, don't continue to manual

            # Should exit gracefully when user skips
            with pytest.raises(typer.Exit) as exc_info:
                links_collection.create_cmd(title=url, auto=True)

            # Verify the exit was clean (code 0)
            assert exc_info.value.exit_code == 0

            # Verify the confirm prompt was called asking if user wants to continue
            mock_confirm.assert_called()

    def test_auto_mode_continues_manual_on_user_choice(self, links_collection):
        """When extraction fails and user chooses to continue, manual mode should work."""
        url = "https://www.youtube.com/watch?v=test123"

        with (
            patch("website_cli.agent.extract_link_metadata") as mock_extract,
            patch.object(typer, "prompt") as mock_prompt,
            patch.object(typer, "confirm") as mock_confirm,
        ):
            # Simulate extraction failure
            mock_extract.return_value = None

            # User chooses to continue manually
            mock_confirm.return_value = True

            # Set up prompts for manual entry
            mock_prompt.side_effect = [
                "Test Title",  # title prompt
                url,  # url_link prompt
                "Test Creator",  # creator prompt
                "q",  # skip content
                "test-slug",  # filename prompt
            ]

            links_collection.create_cmd(title=url, auto=True)

            # Verify file was created
            created_files = list(links_collection.get_dir().glob("*.md"))
            assert len(created_files) == 1
