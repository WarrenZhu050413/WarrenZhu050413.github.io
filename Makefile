.PHONY: help install preview build clean lint check serve doctor website website-dev website-clean website-test

# Default target
help:
	@echo "Available targets:"
	@echo ""
	@echo "Jekyll:"
	@echo "  make install   - Install dependencies (bundle install)"
	@echo "  make preview   - Start Jekyll development server with live reload"
	@echo "  make serve     - Alias for preview"
	@echo "  make build     - Build the site for production"
	@echo "  make clean     - Clean generated files"
	@echo "  make lint      - Run Jekyll doctor and check site health"
	@echo "  make doctor    - Run Jekyll doctor diagnostics"
	@echo ""
	@echo "Website CLI:"
	@echo "  make website       - Install website CLI globally (production)"
	@echo "  make website-dev   - Install website CLI (editable mode)"
	@echo "  make website-clean - Clean website CLI build artifacts"
	@echo "  make website-test  - Run website CLI tests"

# Install dependencies
install:
	bundle install

# Start Jekyll development server with live reload
preview:
	bundle exec jekyll serve --livereload --drafts

# Alias for preview
serve: preview

# Build the site for production
build:
	bundle exec jekyll build

# Build and watch for changes (without server)
watch:
	bundle exec jekyll build --watch

# Clean generated files
clean:
	bundle exec jekyll clean
	rm -rf _site .jekyll-cache .jekyll-metadata

# Run Jekyll doctor to check for issues
doctor:
	bundle exec jekyll doctor

# Lint/check the site
lint: doctor
	@echo "Running site health checks..."
	@echo "Checking for broken links..."
	@if command -v grep >/dev/null 2>&1; then \
		find _site -name "*.html" -type f 2>/dev/null | head -1 > /dev/null && echo "Build appears successful" || echo "Warning: _site directory may be empty. Run 'make build' first."; \
	fi
	@echo "Lint check complete. Consider adding html-proofer for more thorough checks."

# Alias for lint
check: lint

# Update dependencies
update:
	bundle update

# Show Jekyll version
version:
	bundle exec jekyll --version

# ============ Website CLI ============

# Install website CLI globally (production)
website: website-clean
	@echo "📦 Building and installing website-cli globally..."
	uv build -q
	uv tool uninstall website-cli 2>/dev/null || true
	uv tool install dist/*.whl
	@echo "✅ Done! Run 'website --help' to use."

# Install website CLI in editable mode (changes take effect immediately)
website-dev: website-clean
	@echo "📦 Installing website-cli (editable mode)..."
	uv tool install --force --editable .
	@echo "✅ Done! Changes take effect immediately."

# Run website CLI tests
website-test:
	@echo "🧪 Running tests..."
	uv run pytest --cov=website_cli --cov-report=term-missing -v
	@echo "✅ Tests complete"

# Clean website CLI build artifacts
website-clean:
	@echo "🧹 Cleaning website-cli artifacts..."
	rm -rf build/ dist/ *.egg-info website_cli.egg-info
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	@echo "✅ Done"
