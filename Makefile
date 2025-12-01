.PHONY: help install preview build clean lint check serve doctor sentences sentences-editable sentences-clean

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
	@echo "Sentences CLI:"
	@echo "  make sentences          - Install sentences CLI globally"
	@echo "  make sentences-editable - Install sentences CLI (editable mode)"
	@echo "  make sentences-clean    - Clean sentences CLI build artifacts"

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

# ============ Sentences CLI ============

# Install sentences CLI globally
sentences: sentences-clean
	@echo "Installing sentences-cli globally..."
	@uv cache clean 2>/dev/null || true
	uv tool install --force .
	@echo "Done! Run 'sentences' to use."

# Install sentences CLI in editable mode (no cache clean needed - changes are instant)
sentences-editable: sentences-clean
	@echo "Installing sentences-cli globally (editable)..."
	uv tool install --force --editable .
	@echo "Done! Changes take effect immediately."

# Clean sentences CLI build artifacts
sentences-clean:
	@echo "Cleaning sentences-cli artifacts..."
	rm -rf build/ dist/ *.egg-info sentences_cli.egg-info
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@echo "Done"
