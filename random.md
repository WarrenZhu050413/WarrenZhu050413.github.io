---
layout: page
title: Random Thoughts
permalink: /random/
wide: true
---

<p class="sentences-intro">

"Whereof one cannot speak, thereof one must be silent" — Wittgenstein

</p>

<p class="sentences-intro" style="font-size: var(--text-sm); opacity: 0.7; margin-top: calc(-1 * var(--space-4));">

Whimsical thoughts, amusing observations, and things that don't fit anywhere else. For deeper truths, see <a href="/sentences/">Sentences</a>.

</p>

<div class="sentences-controls">
  {% include inline-filter.html placeholder="random thoughts" target=".sentence-entry" id="random" %}
  <div class="view-toggle">
    <button class="view-btn active" data-view="masonry" data-tooltip="Masonry cards">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    </button>
    <button class="view-btn" data-view="scroll" data-tooltip="Single column scroll">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="3" width="12" height="18" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
    </button>
  </div>
  <button class="copy-btn" data-tooltip="Copy filtered items as JSON">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
  </button>
</div>

<div class="sentences-feed" id="randomFeed" data-view="masonry">
  {% assign sorted_random = site.random | sort: 'date' | reverse %}
  {% for item in sorted_random %}
  <article class="sentence-entry"
           data-title="{{ item.title | escape }}"
           data-content="{{ item.content | strip_html | strip | escape }}"
           data-date="{{ item.date | date_to_xmlschema }}"
           data-url="{{ item.url | relative_url }}">
    <div class="sentence-entry-header">
      <a href="{{ item.url | relative_url }}" class="sentence-link">
        <h2 class="sentence-entry-title">{{ item.title | escape }}</h2>
      </a>
      <time class="sentence-entry-date" datetime="{{ item.date | date_to_xmlschema }}">
        {{ item.date | date: "%b %-d" }}
      </time>
    </div>
    {% assign content_stripped = item.content | strip_html | strip %}
    {% if content_stripped != "" %}
    <div class="sentence-entry-content">
      {{ item.content }}
    </div>
    {% endif %}
  </article>
  {% endfor %}
</div>

{% if site.random.size == 0 %}

<p class="no-sentences">No random thoughts yet. The first one is always the hardest.</p>
{% endif %}

<script>
(function() {
  const feed = document.getElementById('randomFeed');
  const viewBtns = document.querySelectorAll('.sentences-controls .view-btn');
  const copyBtn = document.querySelector('.sentences-controls .copy-btn');

  // Randomize animation properties for each card at runtime
  document.querySelectorAll('.sentence-entry').forEach(card => {
    const amp = 0.24 + Math.random() * 0.28;
    const dir = Math.random() < 0.5 ? 1 : -1;
    const duration = 7.3 + Math.random() * 3.1;
    const delay = -Math.random() * duration;

    card.style.setProperty('--rot-amp', amp + 'deg');
    card.style.setProperty('--rot-dir', dir);
    card.style.animation = `float ${duration}s ease-in-out infinite`;
    card.style.animationDelay = delay + 's';
  });

  // View switching
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      feed.dataset.view = view;
    });
  });

  // Copy functionality
  copyBtn.addEventListener('click', () => {
    const items = Array.from(feed.querySelectorAll('.sentence-entry')).filter(item =>
      item.style.display !== 'none' && !item.classList.contains('hidden')
    );
    const data = items.map(item => ({
      title: item.dataset.title,
      content: item.dataset.content || null,
      date: item.dataset.date,
      url: item.dataset.url
    }));

    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      copyBtn.style.background = 'var(--kala-sea)';
      copyBtn.style.color = 'white';
      setTimeout(() => { copyBtn.style.background = ''; copyBtn.style.color = ''; }, 1500);
    });
  });
})();
</script>
