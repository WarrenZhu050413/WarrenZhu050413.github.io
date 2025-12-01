# One True Sentences Manager

Manage Warren's "One True Sentences" collection - a feed of memorable sentences and reflections.

## Context

- Collection location: `_sentences/` directory
- Feed page: `/sentences/`
- Individual pages: `/sentences/{filename}/`
- **Important**: The filename becomes the URL. Choose memorable, shareable filenames!

## Parse User Input

Determine the action from the user's input after `/sentence`:

- No argument OR starts with a quote/letter → **Create new sentence**
- `list` → **List existing sentences**
- `push` → **Commit and push to GitHub**

---

## Action: Create New Sentence

### Step 1: Get the sentence (title)

If the user provided text after `/sentence`, use that as the title.
Otherwise, ask:

> What's your one true sentence today?

### Step 2: Ask for optional content

Ask:
> Any reflection or elaboration? (Press Enter to skip)

### Step 3: Choose a memorable filename

**Critical**: The filename becomes the URL slug. It should be:
- Short and memorable (3-6 words ideal)
- Easy to share verbally
- Descriptive of the sentence's essence

Generate a suggestion from the title, then ask:
> Choose a memorable filename (this becomes the URL):
> Suggestion: `{suggested-slug}`
>
> Enter filename (or press Enter for suggestion):

Filename rules:
- Lowercase letters, numbers, hyphens only
- No spaces or special characters
- Max 50 characters
- No leading/trailing hyphens

### Step 4: Check for duplicate filenames

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
existing=$(ls _sentences/*.md 2>/dev/null | xargs -I{} basename {} .md)
```

If the filename already exists, warn the user and ask for an alternative.

### Step 5: Create the file

Create `_sentences/{filename}.md` with this format:

```markdown
---
title: "The sentence here"
date: YYYY-MM-DD HH:MM:SS -0500
---

Optional content/reflection here.
```

Use `date '+%Y-%m-%d %H:%M:%S %z'` for the current timestamp.

### Step 6: Show confirmation

Display:
```
Created: _sentences/{filename}.md
URL: warrenzhu.com/sentences/{filename}/

Push to GitHub? (y/n)
```

If yes, run the push action.

---

## Action: List Sentences

List all sentences in reverse chronological order:

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
for f in _sentences/*.md; do
  title=$(grep "^title:" "$f" | sed 's/title: *"\?\([^"]*\)"\?/\1/')
  date=$(grep "^date:" "$f" | awk '{print $2}')
  slug=$(basename "$f" .md)
  echo "$date | $slug | $title"
done | sort -r
```

Display as:
```
One True Sentences (N total)

Nov 30, 2025 | best-code-no-code | "The best code is no code..."
Nov 29, 2025 | truth-from-friction | "Truth emerges from friction..."
```

---

## Action: Push to GitHub

### Step 1: Check for changes

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
git status --porcelain _sentences/
```

### Step 2: Stage and commit

```bash
git add _sentences/
```

Generate commit message:
- Single file: `Add sentence: "First few words..."`
- Multiple files: `Add N new sentences`

### Step 3: Push

```bash
git push
```

### Step 4: Confirm

Show the commit and provide link:
```
Pushed to GitHub
View at: https://www.warrenzhu.com/sentences/
```

---

## Important Notes

- Working directory: `/Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io`
- Always use proper timezone in dates (-0500 for EST)
- Filenames must be unique (they are the URL slugs)
- Title should be quoted in YAML if it contains colons or special characters
- **Filename = URL**: Choose wisely for shareability!
