---
layout: post
title: "Learnings from AI"
date: 2025-12-12 18:00:00 -0500
categories: [ai, tools]
---

Gathering of all the tools that has helped me (a few friends have been asking):

0. It is strange how much one is in the flow when one has gotten a good terminal setup with a multiplexer, and a terminal based file editor. I personally use neovim (telescope and nvim tree is the most important plugin here) + iterm2 (with 6 predefined hotkey windows) + tmux.

1. Prompt manager (crucial. I wrote my own cli to manage prompts, and use Claude Code hooks to insert them in through regex matching. I also use Alfred on Mac and script different Alfred plugins to easily access certain prompts).

2. For what I want to do well. Prompt is not enough. Have 5-10 reference codebase in the area that I know very well as a way to communicate intent.

3. Use HTML and the browser to receive output can be helpful. Especially when you are comparing many different ideas (since it enables columns much better than terminal).

4. Profusely and aggressively prototype using parallel subagents.

5. Speech to Text (Handy or WhisprFlow. WhisprFlow is paid but better UX). -- this is most useful when looking at some web page, or actively critiquing some media and you don't want the flow to be interrupted by having to change tabs and write).

6. Encode key workflows into clis. Could be Claude enabled CLI (as a way to package common workflows that is enabled by llms with more deterministic workflows).

7. Screenshot manager. Paste screenshots.

8. Gather as much information as possible and keep it in your head rather than just rely on the agent. That is the way for you to communicate most effectively.

9. Learn to do everything that the agent does automatically manually through shell scripting. You'll find sometimes this is a faster way to express your intent than English.

10. CLAUDE.md. Though I use it less often than others. I normally write very specific repo guidelines that would not be generally shared at all. Eg "note that this is a course on theoretical computer science and I want your style to be ...). Else it may be better as a prompt you add in--that way you have much more understanding of the context and also it is more compostable.

11. Experiment with connectors. People use MCP. I don't like it much anymore. I like more having a prompt that teaches Claude directly how to use a cli/api. This is because A) you probably need that anyway even if you have a MCP, and B) MCP servers can really eat up tokens. Especially badly written ones. I still use MCP for very, very generic capabilities.

12. One such generic capability is the quibbler MCP from Fulcrum. I've found it helpful as a double sanity check on many things Claude writes.

13. Claude Code chrome extension is insanely helpful (I find it much better than Atlas). Good for accomplishing routine tasks that require browser navigation like changing default credit card or finding the page to get an API key. All that Jazz.

## General mindset

Excelling at using agents comes from being able to a) formulate your intent clearly and b) communicate it precisely and quickly.

A is possible only if you know A LOT ABOUT THE SYSTEM and have understood the problem. It can be facilitated through prototyping.

B is possible by writing cli tools/prompt files/skill files (skill may be an overkill at the beginning, but could be experimented later). I also use Alfred for this (I customize it to my needs). B is made the best if you know how to do things yourself. As a way to better guide the agents. But also because many times the best way to express your intent to the computer is not through an agent. But through you yourself. This will continually be valuable.
