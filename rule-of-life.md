---
layout: rule-of-life
title: A Rule of Life
subtitle: HSEMR-LE 76 · Spring 2026
permalink: /rule-of-life/
---

<div class="rol-chat" id="rol-chat">
  <div class="rol-transcript" id="rol-transcript"></div>

  <form class="rol-form" id="rol-form">
    <textarea id="rol-input" placeholder="ask something…" rows="2"></textarea>
    <button type="submit" id="rol-send" aria-label="send">→</button>
  </form>

  <p class="rol-footnote">
    <span id="rol-key-status">no API key set</span> ·
    <label for="rol-model" class="rol-footnote-label">model:</label>
    <select id="rol-model" aria-label="model">
      <option value="sonnet">sonnet</option>
      <option value="opus">opus</option>
      <option value="haiku">haiku</option>
      <option value="custom">custom…</option>
    </select>
    <input type="password" id="rol-custom-model" aria-label="custom model id" placeholder="model id" hidden /> ·
    <a href="#" id="rol-set-key">set Anthropic key</a> ·
    <a href="/assets/rule-of-life-system.txt">read the source prompt</a>
  </p>
</div>

<dialog id="rol-key-dialog" aria-labelledby="rol-key-title">
  <form method="dialog" id="rol-key-form">
    <h3 id="rol-key-title">Bring your own Anthropic API key</h3>
    <p>This page talks to Claude directly from your browser using your own key. The key is stored in your browser's <code>localStorage</code> only — it never touches any server other than Anthropic's.</p>
    <p>Don't trust me — <a href="https://github.com/WarrenZhu050413/WarrenZhu050413.github.io/blob/main/assets/js/rule-of-life-chat.js" target="_blank" rel="noopener">audit the source code</a>. It's about 200 lines of plain JS. You can read exactly where your key goes (nowhere but <code>api.anthropic.com</code>) and what gets sent in every request.</p>
    <p>Get a key at <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>.</p>
    <input type="password" id="rol-key-input" placeholder="sk-ant-..." autocomplete="off" spellcheck="false" aria-label="Anthropic API key">
    <div class="rol-key-actions">
      <button type="button" id="rol-key-cancel">cancel</button>
      <button type="submit" id="rol-key-save">save</button>
    </div>
  </form>
</dialog>

<script src="/assets/js/rule-of-life-chat.js" defer></script>
