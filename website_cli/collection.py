"""Generic Collection class for managing Jekyll collections."""

import json
import os
import re
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path
from typing import Optional

import typer
import yaml
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

from .config import CollectionConfig, DEFAULT_PROJECT

console = Console()


def slugify(text: str, max_length: int = 50) -> str:
    """Convert text to URL-safe slug."""
    slug = text.lower()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug[:max_length]


def yaml_escape_title(title: str) -> str:
    """Escape a title for YAML front matter using PyYAML."""
    result = yaml.dump(title, default_flow_style=True, allow_unicode=True)
    return result.replace('\n...', '').strip()


class Collection:
    """Generic collection manager for Jekyll sites."""

    def __init__(self, config: CollectionConfig):
        self.config = config
        self._dir: Path | None = None
        self.app = typer.Typer(
            name=config.name,
            help=config.tagline,
            no_args_is_help=False,
            add_completion=False,
        )
        self._register_commands()

    def _register_commands(self):
        """Register all CLI commands."""
        # Use closures to bind self
        @self.app.command()
        def list(debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info")):
            self.list_cmd(debug)

        @self.app.command()
        def create(
            title: Optional[str] = typer.Argument(None, help="Item title"),
            push: bool = typer.Option(False, "--push", "-p", help="Commit and push after creating"),
        ):
            self.create_cmd(title, push)

        @self.app.command()
        def edit(slug: Optional[str] = typer.Argument(None, help="Item slug to edit")):
            self.edit_cmd(slug)

        @self.app.command()
        def delete(
            slug: Optional[str] = typer.Argument(None, help="Item slug to delete"),
            force: bool = typer.Option(False, "--force", "-f", help="Skip confirmation"),
        ):
            self.delete_cmd(slug, force)

        @self.app.command()
        def preview(
            slug: Optional[str] = typer.Argument(None, help="Specific item to preview"),
            port: int = typer.Option(4000, "--port", "-p", help="Server port"),
        ):
            self.preview_cmd(slug, port)

        @self.app.command()
        def push(
            message: Optional[str] = typer.Argument(None, help="Commit message"),
            verbose: bool = typer.Option(False, "--verbose", "-v", help="Show detailed output"),
        ):
            self.push_cmd(message, verbose)

        @self.app.command()
        def pull(
            interactive: bool = typer.Option(False, "--interactive", "-i", help="Review each item"),
            auto_push: bool = typer.Option(False, "--push", "-p", help="Auto-push after creating"),
            debug: bool = typer.Option(False, "--debug", "-d", help="Show debug info"),
        ):
            self.pull_cmd(interactive, auto_push, debug)

        @self.app.callback(invoke_without_command=True)
        def callback(ctx: typer.Context):
            if ctx.invoked_subcommand is None:
                self.interactive_mode()

    # ============ DIRECTORY HELPERS ============

    def get_dir(self) -> Path:
        """Find collection directory."""
        if self._dir is not None:
            return self._dir

        env_var = f"{self.config.name.upper()}_DIR"
        if env_dir := os.environ.get(env_var):
            self._dir = Path(env_dir)
        elif (Path.cwd() / self.config.dir_name).exists():
            self._dir = Path.cwd() / self.config.dir_name
        else:
            self._dir = DEFAULT_PROJECT / self.config.dir_name

        return self._dir

    def get_project_dir(self) -> Path:
        """Get the project root directory."""
        return self.get_dir().parent

    # ============ ITEM HELPERS ============

    def get_items(self) -> list[dict]:
        """Get all items from the collection directory."""
        items = []
        collection_dir = self.get_dir()
        if not collection_dir.exists():
            return items

        for f in sorted(collection_dir.glob("*.md"), reverse=True):
            content = f.read_text()
            item = {"slug": f.stem, "path": str(f)}

            # Parse front matter
            if content.startswith("---"):
                parts = content.split("---", 2)
                if len(parts) >= 3:
                    try:
                        fm = yaml.safe_load(parts[1])
                        if fm:
                            item.update(fm)
                    except yaml.YAMLError:
                        # Fallback to simple parsing
                        for line in parts[1].strip().split("\n"):
                            if ":" in line:
                                key, val = line.split(":", 1)
                                item[key.strip()] = val.strip().strip('"\'')

            # Ensure common fields exist
            item.setdefault("title", "")
            item.setdefault("date", "")

            items.append(item)

        return items

    def display_items(self, items: list[dict], show_numbers: bool = True):
        """Display items in a table."""
        if not items:
            console.print(f"[yellow]No {self.config.name} yet.[/yellow]")
            return

        table = Table(title=f"{self.config.name.title()} ({len(items)})")

        if show_numbers:
            table.add_column("#", style="dim", justify="right", width=3)

        for header, key in self.config.columns:
            style = "cyan" if key == "slug" else "white" if key == "title" else "dim"
            table.add_column(header, style=style, no_wrap=(key == "slug"))

        for i, item in enumerate(items, 1):
            row = []
            if show_numbers:
                row.append(str(i))
            for _, key in self.config.columns:
                val = str(item.get(key, ""))
                if len(val) > 50:
                    val = val[:47] + "..."
                row.append(val)
            table.add_row(*row)

        console.print(table)

    # ============ COMMANDS ============

    def list_cmd(self, debug: bool = False):
        """List all items."""
        if debug:
            console.print(f"[dim]{self.config.name.title()} dir: {self.get_dir()}[/dim]")
            console.print(f"[dim]Exists: {self.get_dir().exists()}[/dim]")
        items = self.get_items()
        self.display_items(items, show_numbers=False)

    def create_cmd(self, title: Optional[str] = None, push: bool = False):
        """Create a new item."""
        collection_dir = self.get_dir()
        collection_dir.mkdir(exist_ok=True)

        # Get title
        if not title:
            title = typer.prompt(self.config.title_prompt)

        if not title.strip():
            console.print("[red]Title cannot be empty.[/red]")
            raise typer.Exit(1)

        # Get extra fields for this collection
        extra_values = {}
        for field_name in self.config.extra_fields:
            is_required = field_name in self.config.required_fields
            prompt_name = field_name.replace("_", " ").title()

            if is_required:
                val = typer.prompt(prompt_name)
                if not val.strip():
                    console.print(f"[red]{prompt_name} is required.[/red]")
                    raise typer.Exit(1)
            else:
                val = typer.prompt(f"{prompt_name} (optional)", default="", show_default=False)

            if val.strip():
                extra_values[field_name] = val.strip()

        # Get content (optional) - launch editor or skip
        content = ""
        console.print("\n[dim]Add a reflection/description? [Enter to write, q to skip][/dim]")
        choice = typer.prompt("", default="", show_default=False)

        if choice.lower() != 'q':
            editor = os.environ.get("EDITOR", "vim")
            with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
                f.write(f"# Notes on: {title}\n\n")
                f.write("# Write below. Lines starting with # will be removed.\n\n\n")
                temp_path = f.name

            if "vim" in editor:
                subprocess.run([editor, "+6", temp_path])
            else:
                subprocess.run([editor, temp_path])

            with open(temp_path, 'r') as f:
                lines = [line for line in f.readlines() if not line.startswith('#')]
                content = ''.join(lines).strip()

            os.unlink(temp_path)

            if content:
                console.print("[green]Content added.[/green]")
            else:
                console.print("[dim]No content added.[/dim]")

        # Generate slug
        suggested = slugify(title)
        console.print(f"\n[cyan]Suggested filename:[/cyan] {suggested}")
        slug = typer.prompt("Filename (this becomes the URL)", default=suggested)
        slug = slugify(slug)

        # Check for duplicates
        target = collection_dir / f"{slug}.md"
        if target.exists():
            console.print(f"[red]Error: {slug}.md already exists![/red]")
            raise typer.Exit(1)

        # Create file
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")
        escaped_title = yaml_escape_title(title)

        # Build frontmatter
        fm_lines = [f"title: {escaped_title}", f"date: {now}"]
        for key, val in extra_values.items():
            escaped_val = yaml_escape_title(val)
            fm_lines.append(f"{key}: {escaped_val}")

        file_content = f'''---
{chr(10).join(fm_lines)}
---

{content}
'''.strip() + "\n"

        target.write_text(file_content)

        console.print(Panel(
            f"[green]Created:[/green] {self.config.dir_name}/{slug}.md\n"
            f"[cyan]URL:[/cyan] {self.config.site_url}/{slug}/",
            title="Success",
            border_style="green"
        ))

        # Push if requested
        if push:
            project_dir = self.get_project_dir()
            file_path = f"{self.config.dir_name}/{slug}.md"
            commit_title = title[:47] + "..." if len(title) > 50 else title
            commit_message = f"New {self.config.name}: {commit_title}"

            try:
                subprocess.run(["git", "add", file_path], cwd=project_dir, check=True, capture_output=True)
                subprocess.run(["git", "commit", "-m", commit_message], cwd=project_dir, check=True, capture_output=True)
                subprocess.run(["git", "push"], cwd=project_dir, check=True, capture_output=True)
                console.print(f"[green]Pushed: {commit_message}[/green]")
            except subprocess.CalledProcessError as e:
                console.print(f"[red]Failed to push: {e}[/red]")

    def edit_cmd(self, slug: Optional[str] = None):
        """Edit an item."""
        items = self.get_items()

        if not items:
            console.print(f"[yellow]No {self.config.name} to edit.[/yellow]")
            raise typer.Exit(0)

        if not slug:
            self.display_items(items)
            console.print()
            choice = typer.prompt("Select item to edit (number or 'q' to quit)", default="1")

            if choice.lower() == 'q':
                raise typer.Exit(0)

            try:
                index = int(choice) - 1
                if 0 <= index < len(items):
                    slug = items[index]["slug"]
                else:
                    console.print("[red]Invalid selection.[/red]")
                    raise typer.Exit(1)
            except ValueError:
                console.print("[red]Invalid selection.[/red]")
                raise typer.Exit(1)

        target = self.get_dir() / f"{slug}.md"
        if not target.exists():
            console.print(f"[red]Not found: {slug}.md[/red]")
            raise typer.Exit(1)

        editor = os.environ.get("EDITOR", "vim")
        console.print(f"[cyan]Opening {slug}.md in {editor}...[/cyan]")
        subprocess.run([editor, str(target)])
        console.print("[green]Done.[/green]")

    def delete_cmd(self, slug: Optional[str] = None, force: bool = False):
        """Delete an item."""
        items = self.get_items()

        if not items:
            console.print(f"[yellow]No {self.config.name} to delete.[/yellow]")
            raise typer.Exit(0)

        if not slug:
            self.display_items(items)
            console.print()
            choice = typer.prompt("Select item to delete (number or 'q' to quit)", default="q")

            if choice.lower() == 'q':
                raise typer.Exit(0)

            try:
                index = int(choice) - 1
                if 0 <= index < len(items):
                    slug = items[index]["slug"]
                else:
                    console.print("[red]Invalid selection.[/red]")
                    raise typer.Exit(1)
            except ValueError:
                console.print("[red]Invalid selection.[/red]")
                raise typer.Exit(1)

        target = self.get_dir() / f"{slug}.md"
        if not target.exists():
            console.print(f"[red]Not found: {slug}.md[/red]")
            raise typer.Exit(1)

        if not force:
            confirm = typer.confirm(f"Delete {slug}.md?", default=False)
            if not confirm:
                console.print("[yellow]Cancelled.[/yellow]")
                raise typer.Exit(0)

        target.unlink()
        console.print(f"[green]Deleted: {slug}.md[/green]")

    def preview_cmd(self, slug: Optional[str] = None, port: int = 4000):
        """Preview in browser."""
        import time
        import webbrowser

        project_dir = self.get_project_dir()

        if slug:
            target = self.get_dir() / f"{slug}.md"
            if not target.exists():
                console.print(f"[red]Not found: {slug}.md[/red]")
                raise typer.Exit(1)
            url = f"http://localhost:{port}/{self.config.name}/{slug}/"
        else:
            url = f"http://localhost:{port}/{self.config.name}/"

        console.print(f"[cyan]Starting Jekyll server on port {port}...[/cyan]")
        console.print(f"[dim]Will open: {url}[/dim]")

        try:
            proc = subprocess.Popen(
                ["bundle", "exec", "jekyll", "serve", "--port", str(port)],
                cwd=project_dir,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
            )

            console.print("[dim]Waiting for server...[/dim]")
            time.sleep(3)

            webbrowser.open(url)
            console.print(f"[green]Opened {url}[/green]")
            console.print("[dim]Press Ctrl+C to stop server[/dim]")

            proc.wait()
        except KeyboardInterrupt:
            console.print("\n[yellow]Stopping server...[/yellow]")
            proc.terminate()
            proc.wait()
            console.print("[green]Done.[/green]")

    def push_cmd(self, message: Optional[str] = None, verbose: bool = False):
        """Commit and push changes using Claude."""
        project_dir = self.get_project_dir()

        result = subprocess.run(
            ["git", "status", "--porcelain", self.config.dir_name + "/"],
            cwd=project_dir,
            capture_output=True,
            text=True,
        )

        if not result.stdout.strip():
            console.print(f"[yellow]No changes in {self.config.dir_name}/ to push.[/yellow]")
            raise typer.Exit(0)

        console.print("[cyan]Changes detected:[/cyan]")
        console.print(result.stdout)

        if message:
            prompt = f'Commit and push the changes in {self.config.dir_name}/ with message: "{message}"'
        else:
            prompt = f"Commit and push the changes in {self.config.dir_name}/. Generate an appropriate commit message based on the changes."

        console.print("\n[cyan]Asking Claude to push...[/cyan]")

        try:
            cmd = ["claude", "-p", prompt, "--output-format", "stream-json", "--verbose"]

            proc = subprocess.Popen(
                cmd,
                cwd=project_dir,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
            )

            session_id = None
            for line in proc.stdout:
                line = line.strip()
                if not line:
                    continue

                try:
                    data = json.loads(line)
                    if "session_id" in data:
                        session_id = data["session_id"]
                    if data.get("type") == "assistant" and "message" in data:
                        msg = data["message"]
                        if isinstance(msg, dict) and "content" in msg:
                            for block in msg.get("content", []):
                                if block.get("type") == "text":
                                    text = block.get("text", "")
                                    console.print(f"[dim]{text[:200]}...[/dim]" if len(text) > 200 else f"[dim]{text}[/dim]")
                    elif data.get("type") == "result":
                        if "result" in data:
                            console.print(f"\n[green]{data['result']}[/green]")
                except json.JSONDecodeError:
                    if verbose:
                        console.print(f"[dim]{line}[/dim]")

            proc.wait()

            if session_id:
                console.print(f"\n[bold cyan]Session ID:[/bold cyan] {session_id}")
                console.print(f"[dim]To continue: claude -c {session_id}[/dim]")

        except FileNotFoundError:
            console.print("[red]Error: 'claude' CLI not found.[/red]")
            raise typer.Exit(1)

    def pull_cmd(self, interactive: bool = False, auto_push: bool = False, debug: bool = False):
        """Pull items from email."""
        email_address = f"wzhu+{self.config.email_suffix}@college.harvard.edu"

        console.print(f"[cyan]Searching for emails to {email_address}...[/cyan]")

        try:
            result = subprocess.run(
                ["gmail", "search", f"to:{email_address}", "--folder", "INBOX", "--max", "50", "--output-format", "json"],
                capture_output=True,
                text=True,
                check=True,
            )
            data = json.loads(result.stdout)
            all_emails = data.get("emails", [])
            emails = [e for e in all_emails if "DRAFT" not in e.get("labels", [])]
        except subprocess.CalledProcessError as e:
            console.print(f"[red]Failed to search emails: {e.stderr}[/red]")
            raise typer.Exit(1)
        except json.JSONDecodeError:
            console.print("[red]Failed to parse email search results[/red]")
            raise typer.Exit(1)

        if not emails:
            console.print(f"[yellow]No new {self.config.name} in inbox[/yellow]")
            raise typer.Exit(0)

        console.print(f"[green]Found {len(emails)} email(s) in inbox[/green]\n")

        existing_items = self.get_items()
        existing_slugs = {item["slug"] for item in existing_items}

        candidates = []
        for email in emails:
            subject = email.get("subject", "").strip()
            date_str = email.get("date", "")
            message_id = email.get("message_id", "")

            if not subject:
                continue

            # Read full email body
            try:
                cmd = ["gmail", "read", message_id, "--full", "--output-format", "json"]
                body_result = subprocess.run(cmd, capture_output=True, text=True, check=True)
                body_data = json.loads(body_result.stdout)
                body = body_data.get("body_plain", body_data.get("body", "")).strip()
            except (subprocess.CalledProcessError, json.JSONDecodeError):
                body = ""

            slug = slugify(subject)
            is_duplicate = slug in existing_slugs

            candidates.append({
                "message_id": message_id,
                "title": subject,
                "body": body,
                "date": date_str,
                "slug": slug,
                "is_duplicate": is_duplicate,
            })

        if not candidates:
            console.print("[yellow]No valid candidates found[/yellow]")
            raise typer.Exit(0)

        # Display candidates
        console.print("[bold]Candidates:[/bold]\n")
        for i, c in enumerate(candidates, 1):
            status = "[yellow](duplicate)[/yellow]" if c["is_duplicate"] else "[green](new)[/green]"
            console.print(Panel(
                f"[bold]{c['title']}[/bold]\n\n"
                f"{c['body'][:300]}{'...' if len(c['body']) > 300 else ''}\n\n"
                f"[dim]Date: {c['date']}[/dim]\n"
                f"[dim]Slug: {c['slug']}[/dim]",
                title=f"#{i} {status}",
                border_style="cyan" if not c["is_duplicate"] else "yellow",
            ))
            console.print()

        new_candidates = [c for c in candidates if not c["is_duplicate"]]

        if not new_candidates:
            console.print("[yellow]All emails are duplicates[/yellow]")
            raise typer.Exit(0)

        console.print(f"[cyan]{len(new_candidates)} new item(s) to process[/cyan]\n")

        if not interactive and not auto_push:
            console.print("[dim]Use -i for interactive mode or -p to auto-push[/dim]")
            raise typer.Exit(0)

        collection_dir = self.get_dir()
        collection_dir.mkdir(exist_ok=True)
        project_dir = self.get_project_dir()

        created_count = 0
        skipped_count = 0

        for i, candidate in enumerate(new_candidates, 1):
            console.print(f"\n[bold cyan]Processing {i}/{len(new_candidates)}: {candidate['title']}[/bold cyan]")

            if interactive:
                console.print(Panel(
                    f"[bold]{candidate['title']}[/bold]\n\n"
                    f"{candidate['body']}\n\n"
                    f"[dim]Slug: {candidate['slug']}[/dim]",
                    border_style="cyan",
                ))

                console.print("\n[dim]Options: \\[a]pprove, \\[s]kip, \\[e]dit[/dim]")
                choice = typer.prompt("Action", default="a").lower()

                if choice in ('s', 'skip'):
                    console.print("[yellow]Skipped[/yellow]")
                    skipped_count += 1
                    continue

                if choice in ('e', 'edit'):
                    editor = os.environ.get("EDITOR", "vim")
                    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
                        f.write(f"# Title (first line becomes the title)\n")
                        f.write(f"{candidate['title']}\n\n")
                        f.write(f"# Body (everything below becomes content)\n")
                        f.write(f"{candidate['body']}\n")
                        temp_path = f.name

                    subprocess.run([editor, temp_path])

                    with open(temp_path, 'r') as f:
                        content = f.read()
                    os.unlink(temp_path)

                    lines = content.split('\n')
                    new_title = None
                    body_lines = []
                    in_body = False

                    for line in lines:
                        if line.startswith('#'):
                            if 'body' in line.lower():
                                in_body = True
                            continue
                        if not in_body:
                            if line.strip() and not new_title:
                                new_title = line.strip()
                        else:
                            body_lines.append(line)

                    if new_title:
                        candidate['title'] = new_title
                        candidate['slug'] = slugify(new_title)
                    candidate['body'] = '\n'.join(body_lines).strip()

            # Create the file
            target = collection_dir / f"{candidate['slug']}.md"

            if target.exists():
                suffix = 1
                while target.exists():
                    new_slug = f"{candidate['slug']}-{suffix}"
                    target = collection_dir / f"{new_slug}.md"
                    suffix += 1
                candidate['slug'] = target.stem

            # Format date
            try:
                parsed_date = datetime.fromisoformat(candidate['date'])
                offset = parsed_date.strftime("%z")
                formatted_date = parsed_date.strftime(f"%Y-%m-%d %H:%M:%S {offset}")
            except (ValueError, AttributeError):
                formatted_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S -0500")

            escaped_title = yaml_escape_title(candidate['title'])
            file_content = f'''---
title: {escaped_title}
date: {formatted_date}
---

{candidate['body']}
'''.strip() + "\n"

            target.write_text(file_content)
            console.print(f"[green]Created: {self.config.dir_name}/{candidate['slug']}.md[/green]")

            # Commit and push
            file_path = f"{self.config.dir_name}/{candidate['slug']}.md"
            commit_title = candidate['title'][:47] + "..." if len(candidate['title']) > 50 else candidate['title']
            commit_message = f"New {self.config.name}: {commit_title}"

            try:
                subprocess.run(["git", "add", file_path], cwd=project_dir, check=True, capture_output=True)
                subprocess.run(["git", "commit", "-m", commit_message], cwd=project_dir, check=True, capture_output=True)
                subprocess.run(["git", "push"], cwd=project_dir, check=True, capture_output=True)
                console.print(f"[green]Pushed: {commit_message}[/green]")
                created_count += 1

                # Archive email
                self._archive_email(candidate['message_id'], debug)

            except subprocess.CalledProcessError as e:
                console.print(f"[red]Failed to push: {e}[/red]")

        console.print(f"\n[bold green]Done! Created {created_count}, skipped {skipped_count}[/bold green]")

    def _archive_email(self, message_id: str, debug: bool = False) -> bool:
        """Archive an email by removing it from INBOX."""
        GMAILLM_PYTHON = Path.home() / ".local/share/uv/tools/gmaillm/bin/python3"

        script = f'''
from gmaillm.gmail_client import GmailClient
client = GmailClient()
client.service.users().messages().modify(
    userId='me',
    id='{message_id}',
    body={{'removeLabelIds': ['INBOX']}}
).execute()
print('OK')
'''
        try:
            python_cmd = str(GMAILLM_PYTHON) if GMAILLM_PYTHON.exists() else "python3"
            result = subprocess.run([python_cmd, "-c", script], capture_output=True, text=True, timeout=30)
            if result.returncode == 0 and 'OK' in result.stdout:
                return True
            if debug:
                console.print(f"[yellow]Archive stderr: {result.stderr}[/yellow]")
            return False
        except Exception as e:
            if debug:
                console.print(f"[yellow]Archive failed: {e}[/yellow]")
            return False

    def interactive_mode(self):
        """Interactive menu mode."""
        while True:
            console.print(f"\n[bold cyan]{self.config.name.title()}[/bold cyan]")
            console.print(f"[dim]{self.config.tagline}[/dim]\n")
            items = self.get_items()
            self.display_items(items)

            console.print("\n[dim]Commands: [c]reate, [e]dit, [d]elete, p[u]ll, [p]review, pu[s]h, [q]uit[/dim]")
            action = typer.prompt("Action", default="q")

            if action.lower() in ('q', 'quit'):
                break
            elif action.lower() in ('c', 'create'):
                self.create_cmd(None)
            elif action.lower() in ('e', 'edit'):
                self.edit_cmd(None)
            elif action.lower() in ('d', 'delete'):
                self.delete_cmd(None, force=False)
            elif action.lower() in ('u', 'pull'):
                self.pull_cmd(interactive=True)
            elif action.lower() in ('p', 'preview'):
                self.preview_cmd(None)
            elif action.lower() in ('s', 'push'):
                self.push_cmd(None)
            elif action.isdigit():
                idx = int(action) - 1
                if 0 <= idx < len(items):
                    self.edit_cmd(items[idx]["slug"])
                else:
                    console.print("[red]Invalid selection.[/red]")
            else:
                console.print("[yellow]Unknown command.[/yellow]")
