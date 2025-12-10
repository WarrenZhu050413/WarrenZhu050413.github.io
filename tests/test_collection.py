"""Tests for Collection class."""

from unittest.mock import patch

import pytest
import typer

from website_cli.collection import Collection
from website_cli.config import LINKS_CONFIG


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
