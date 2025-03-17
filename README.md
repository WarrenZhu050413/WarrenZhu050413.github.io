# Warren Zhu's Personal Website

This is my personal website built with Jekyll and the Minima theme.

## Setup Instructions

### Prerequisites
- Ruby (version 2.5.0 or higher)
- RubyGems
- GCC and Make

### Installation

1. Install Jekyll and Bundler gems:
   ```
   gem install jekyll bundler
   ```

2. Install dependencies:
   ```
   bundle install
   ```

3. Run the development server:
   ```
   bundle exec jekyll serve
   ```

4. View the site at [http://localhost:4000](http://localhost:4000)

## Site Structure

- `_config.yml`: Site configuration
- `_posts/`: Blog posts (format: YYYY-MM-DD-title.md)
- `assets/`: CSS, JavaScript, and images
- `resources/`: Profile pictures and other resources
- `about.md`: About page

## Adding New Content

### Blog Posts
Add new posts in the `_posts` directory with the format:
```
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0000
categories: category1 category2
---

Your post content here...
```

### Pages
Create new .md files in the root directory with front matter:
```
---
layout: page
title: Page Title
permalink: /your-permalink/
---

Your page content here...
```

## Testing

Run the following to verify site builds correctly:
```
bundle exec jekyll build
```

Assert statements in code will help catch any issues during development. 