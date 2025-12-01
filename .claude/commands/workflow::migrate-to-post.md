# Migrate doc.md to Jekyll Blog Post

<task>
You are a Jekyll blog migration assistant that transforms doc.md content into properly formatted Jekyll blog posts with intelligent metadata generation.
</task>

<context>
This command migrates the current doc.md file to a Jekyll blog post in the _posts/ directory with:
- Auto-generated title from content
- Current datetime with proper timezone
- Appropriate categories from available options
- Proper Jekyll front matter formatting
- NO duplicate title in markdown content (title only in front matter)
</context>

<process>
## Migration Workflow

### Step 1: Analyze doc.md content
1. Read the current doc.md file
2. Extract the first meaningful heading or line for title generation
3. Analyze content to determine appropriate categories

### Step 2: Generate metadata
1. **Title Generation**:
   - If doc.md starts with # heading, use that
   - Otherwise, use first non-empty line (max 60 chars)
   - Clean special characters for Jekyll compatibility

2. **Date Generation**:
   - Get current date and time with timezone
   - Format: YYYY-MM-DD HH:MM:SS -ZZZZ

3. **Category Selection**:
   - Read available categories from _posts/categories.txt
   - Analyze content to select most appropriate category
   - Default to 'mlsystems' if content is technical

4. **Description Generation**:
   - Extract first paragraph or first two sentences from content
   - Skip any disclaimer paragraphs starting with "Note:"
   - Clean markdown formatting for plain text
   - Limit to ~160 characters for optimal SEO

### Step 3: Present migration plan
Show the user:
- Preview of doc.md content (first 10-15 lines)
- Generated title
- Generated description
- Current datetime
- Selected category
- Target filename format: _posts/YYYY-MM-DD-slug-from-title.md

### Step 4: Create the post file
1. Generate slug from title (lowercase, hyphens for spaces)
2. Create file: _posts/YYYY-MM-DD-slug.md
3. Write Jekyll front matter:
   ```markdown
   ---
   layout: post
   title: "Generated Title"
   description: "Generated description from first paragraph or sentences"
   date: YYYY-MM-DD HH:MM:SS -ZZZZ
   categories: [selected-category]
   ---
   ```
4. **CRITICAL**: Append doc.md content below front matter BUT:
   - **Remove the first H1 heading** if it matches the title (to avoid duplication)
   - Start content with the paragraph text, not the title

### Step 5: Serve and preview
1. **Check if Jekyll server is already running**:
   - If port 4000 is in use, skip server start
   - If not running, start with: `bundle exec jekyll serve` using `run_in_background: true`
2. Wait for server to initialize (5 seconds) if newly started
3. Open browser to: http://localhost:4000/category/YYYY/MM/DD/slug.html
   (Jekyll URL format: category comes first, then date, then slug with .html extension)
4. Note: Server runs in background, can be stopped with `lsof -ti:4000 | xargs kill` if needed
</process>

<implementation_instructions>
When implementing this command:

1. **Read doc.md first** to understand content
2. **Extract title intelligently**:
   - Look for markdown headers (# Title)
   - Use first substantial line if no headers
   - Remove markdown formatting from title
3. **Use proper datetime**:
   - Use Bash to get: `date '+%Y-%m-%d %H:%M:%S %z'`
4. **Description extraction logic**:
   - Skip lines starting with "Note: I am not thinking about..."
   - Take first meaningful paragraph after any disclaimers
   - If paragraph is too long, use first two sentences
   - Remove markdown formatting (links, bold, italics)
   - Ensure quotes are properly escaped for YAML
5. **Category selection logic**:
   - If content mentions AI/ML/systems → mlsystems
   - If content mentions tricks/tips/hacks → ai-tricks
   - Otherwise, ask user to choose
6. **Filename generation**:
   - Convert title to slug: lowercase, replace spaces with hyphens
   - Remove special characters except hyphens
7. **Always present plan before executing**
8. **CRITICAL - Remove duplicate title**:
   - After writing front matter, do NOT include the H1 title from doc.md
   - Use Edit tool to remove: `# Title\n\n` and replace with just `\n`
   - This prevents title duplication on the rendered page
9. **Handle Jekyll server properly**:
   - Check if already running before starting new server
   - Use Bash tool with `run_in_background: true` parameter
   - Handle "Address already in use" gracefully
</implementation_instructions>

<example_usage>
User: `/workflow::migrate-to-post`