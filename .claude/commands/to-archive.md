# Archive Post Command

Move a blog post to the archive by adding `relegated: true` to its front matter.

## Context

- Posts location: `_posts/` directory
- Archive page: `/archive/`
- Posts with `relegated: true` are hidden from homepage but visible at `/archive/`

## Parse User Input

Determine the action from the user's input after `/to-archive`:

- No argument → **List active posts and prompt for selection**
- Post title or partial match → **Archive that specific post**
- `list` → **Show current archived posts**
- `undo <title>` → **Remove from archive (set relegated: false)**

---

## Action: Archive a Post (default)

### Step 1: Find the post

If user provided a title/keyword, search for matching posts:

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
grep -l "title:.*KEYWORD" _posts/*.md 2>/dev/null
```

If no argument provided, list all **active** (non-relegated) posts:

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
for f in _posts/*.md; do
  if ! grep -q "relegated: true" "$f"; then
    title=$(grep "^title:" "$f" | sed 's/title: *"\?\([^"]*\)"\?/\1/')
    date=$(grep "^date:" "$f" | awk '{print $2}')
    echo "$date | $title | $f"
  fi
done | sort -r
```

Then ask: "Which post would you like to archive?"

### Step 2: Confirm and archive

Show the post title and ask for confirmation:
> Archive "[Post Title]"? (y/n)

### Step 3: Add relegated flag

Edit the post's front matter to add `relegated: true` after the categories line.

The front matter should look like:
```yaml
---
layout: post
title: "Post Title"
description: "..."
date: YYYY-MM-DD
categories: [category]
relegated: true
---
```

### Step 4: Confirm

Display:
```
Archived: "Post Title"
View at: /archive/
```

---

## Action: List Archived Posts

```bash
cd /Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io
for f in _posts/*.md; do
  if grep -q "relegated: true" "$f"; then
    title=$(grep "^title:" "$f" | sed 's/title: *"\?\([^"]*\)"\?/\1/')
    date=$(grep "^date:" "$f" | awk '{print $2}')
    echo "$date | $title"
  fi
done | sort -r
```

Display as:
```
Archived Posts (N total)

Sep 5, 2025 | Formatting Your Syllabus in Another Way
Apr 17, 2025 | TorchFT Design Overview
...
```

---

## Action: Undo Archive

Remove `relegated: true` from the post's front matter to restore it to the main feed.

---

## Working Directory

`/Users/wz/Desktop/zPersonalProjects/WarrenZhu050413.github.io`
