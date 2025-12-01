# sentences-cli

CLI for managing One True Sentences collection.

## Versioning

After every change to `sentences_cli/`, increment the package version in `pyproject.toml` following semantic versioning:

- **MAJOR** (X.0.0): Breaking changes to CLI interface or behavior
- **MINOR** (0.X.0): New features, commands, or options
- **PATCH** (0.0.X): Bug fixes, documentation, internal refactors

After updating version, reinstall with:
```bash
uv tool install --force /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
```

## Development

Source code: `sentences_cli/cli.py`
Package config: `pyproject.toml`

## Commands

- `sentences` - Interactive mode
- `sentences list` - List all sentences
- `sentences create` - Create a new sentence
- `sentences edit [slug]` - Edit a sentence
- `sentences delete [slug]` - Delete a sentence
- `sentences preview [slug]` - Preview in browser
- `sentences push [message]` - Commit and push via Claude
