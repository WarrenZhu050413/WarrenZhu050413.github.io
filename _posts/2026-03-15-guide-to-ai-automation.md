---
layout: post
title: "Starter's Guide to Claude Code"
date: 2026-03-15 12:00:00 -0500
categories: [ai, tools]
---

Guide written for friends and family members. Last updated 2026-03-15.

## Step 1: Get Claude Code

Download [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) and purchase the [$200/mo Max plan](https://www.anthropic.com/pricing). Use the cost to commit. You can also email me at fuchengwarrenzhu at gmail dot com; I have dozens of free passes from the Claude Code accounts I have.

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Launch it
claude
```

## Step 2: Learn the Command Line by Watching Claude

Use Claude Code to do anything you'd normally do on a computer: send emails, do homework, submit work, book things. Then ask it:

- "How can I help you do this well?"
- "What would make this easier next time?"

Absorb the command line by osmosis. Pay attention to the commands that it runs. (`cd`, `ls`, `grep`, `git`, `curl`). Ask about them if you are curious.

```bash
# Some basics you'll pick up
ls                    # list files
cd ~/projects         # navigate directories
git status            # see what changed
git add . && git commit -m "message"  # save your work
```

Ask Claude to set up your zsh config to your liking.

## Step 3: Learn Full-Stack Programming

Learn TypeScript and basic computer systems. For programming, ask Claude to write code you actually want—a personal website on GitHub Pages is a good starter project (and also helps you learn Github):

```bash
git init my-site && cd my-site
npm init -y
claude "set up a personal website with Jekyll for GitHub Pages"
```

For computer systems, watch [CMU 15-213](https://www.cs.cmu.edu/~213/).

## Step 4: Apply AI to Your Actual Work

For anything you do at work, think about how Claude can help. Start with no guardrails and maximum carelessness (except for allowing it to send messages to the outside world). You'll very soon learn what it can do, and what extra intuition you'd need.

## Step 5: Learn tmux to Multi-Claude

[tmux](https://github.com/tmux/tmux) lets you run multiple terminal sessions side by side to let multiple Claude Code instances work in parallel.

```bash
brew install tmux         # macOS (sudo apt install tmux on Linux)
tmux new -s work          # start a session
# Ctrl+b %  → vertical split
# Ctrl+b "  → horizontal split
# Ctrl+b o  → switch panes
# Launch claude in each pane
```

Ask Claude to set up your `.tmux.conf` to your liking.

## Step 6: Explore Claude Code's Power Features

Explore CLAUDE.md, Commands, Hooks, MCP Servers, Skills, Cron/Loop, Claude Agents SDK, headless cli mode for automations, webhook integrations.

## Step 7: Stay Current and Contribute

Subscribe to [AI Explained](https://www.youtube.com/@AiExplained-official) on YouTube. Set up a daily scraper for the lab blogs:

- [anthropic.com/blog](https://www.anthropic.com/blog)
- [openai.com/blog](https://openai.com/blog)

Follow the leading benchmarks: [SWE-bench](https://www.swebench.com/), [Terminal-Bench](https://github.com/terminal-bench/terminal-bench), [METR](https://metr.org/).

Contribute to open source AI benchmarks is a great way to learn about AI's capabilities and limits.
