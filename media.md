---
layout: page
title: Links
permalink: /media/
wide: true
---

<p class="media-intro">
Videos, papers, and things worth revisiting.
</p>

<div class="media-controls">
  {% include inline-filter.html placeholder="links" target=".media-item" id="media" %}
  <div class="view-toggle">
    <button class="view-btn active" data-view="grid" title="Grid view">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    </button>
    <button class="view-btn" data-view="preview" title="Preview with embeds">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
    </button>
  </div>
  <button class="json-export-btn" onclick="exportFilteredJSON()" title="Copy filtered items as JSON">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
  </button>
</div>

<div class="media-feed" id="mediaFeed" data-view="grid">
  {% assign sorted_media = site.media | sort: 'date' | reverse %}
  {% for item in sorted_media %}
    {% comment %} Extract embed URLs {% endcomment %}
    {% if item.url_link contains 'youtube.com/watch' %}
      {% assign video_id = item.url_link | split: 'v=' | last | split: '&' | first %}
      {% assign embed_url = 'https://www.youtube.com/embed/' | append: video_id %}
      {% assign thumb_url = 'https://img.youtube.com/vi/' | append: video_id | append: '/mqdefault.jpg' %}
      {% assign is_video = true %}
      {% assign is_pdf = false %}
    {% elsif item.url_link contains 'youtu.be/' %}
      {% assign video_id = item.url_link | split: 'youtu.be/' | last | split: '?' | first %}
      {% assign embed_url = 'https://www.youtube.com/embed/' | append: video_id %}
      {% assign thumb_url = 'https://img.youtube.com/vi/' | append: video_id | append: '/mqdefault.jpg' %}
      {% assign is_video = true %}
      {% assign is_pdf = false %}
    {% elsif item.url_link contains 'vimeo.com/' %}
      {% assign vimeo_id = item.url_link | split: 'vimeo.com/' | last | split: '?' | first %}
      {% assign embed_url = 'https://player.vimeo.com/video/' | append: vimeo_id %}
      {% assign thumb_url = '' %}
      {% assign is_video = true %}
      {% assign is_pdf = false %}
    {% elsif item.url_link contains '.pdf' %}
      {% assign embed_url = 'https://docs.google.com/viewer?url=' | append: item.url_link | append: '&embedded=true' %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = true %}
    {% elsif item.url_link contains 'open.spotify.com/track/' %}
      {% assign spotify_id = item.url_link | split: 'track/' | last | split: '?' | first %}
      {% assign embed_url = 'https://open.spotify.com/embed/track/' | append: spotify_id %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
    {% elsif item.url_link contains 'open.spotify.com/album/' %}
      {% assign spotify_id = item.url_link | split: 'album/' | last | split: '?' | first %}
      {% assign embed_url = 'https://open.spotify.com/embed/album/' | append: spotify_id %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
    {% elsif item.url_link contains 'codepen.io' and item.url_link contains '/pen/' %}
      {% assign embed_url = item.url_link | replace: '/pen/', '/embed/' | append: '?default-tab=result' %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
      {% assign is_image = false %}
    {% elsif item.url_link contains '.jpg' or item.url_link contains '.jpeg' or item.url_link contains '.png' or item.url_link contains '.gif' or item.url_link contains '.webp' %}
      {% assign embed_url = '' %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
      {% assign is_image = true %}
      {% assign image_url = item.url_link %}
    {% elsif item.image %}
      {% assign embed_url = '' %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
      {% assign is_image = true %}
      {% assign image_url = item.image %}
    {% else %}
      {% assign embed_url = '' %}
      {% assign thumb_url = '' %}
      {% assign is_video = false %}
      {% assign is_pdf = false %}
      {% assign is_image = false %}
    {% endif %}

  <article class="media-item"
           data-title="{{ item.title | escape }}"
           data-creator="{{ item.creator | escape }}"
           data-url="{{ item.url_link }}"
           data-embed="{{ embed_url }}"
           data-note="{{ item.content | strip_html | strip | escape }}">

    <!-- Grid View Content -->
    <div class="grid-content">
      {% if embed_url != '' %}
      <div class="grid-embed" data-src="{{ embed_url }}">
        <div class="embed-placeholder">Loading...</div>
      </div>
      {% elsif is_image %}
      <div class="grid-image">
        <a href="{{ item.url_link }}" target="_blank" rel="noopener">
          <img src="{{ image_url }}" alt="{{ item.title | escape }}" loading="lazy">
        </a>
      </div>
      {% else %}
      <div class="grid-link-only">
        <a href="{{ item.url_link }}" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>
      {% endif %}
      <div class="grid-info">
        <a href="{{ item.url_link }}" class="grid-title" target="_blank" rel="noopener">{{ item.title | escape }}</a>
        {% if item.creator %}<span class="grid-creator">{{ item.creator }}</span>{% endif %}
        {% assign note = item.content | strip_html | strip %}
        {% if note != '' %}
          <p class="grid-note">{{ note }}</p>
        {% endif %}
      </div>
    </div>

    <!-- Preview View Content -->
    <div class="preview-content">
      <div class="preview-header">
        <a href="{{ item.url_link }}" class="preview-title" target="_blank" rel="noopener">{{ item.title | escape }}</a>
        {% if item.creator %}<span class="preview-creator">{{ item.creator }}</span>{% endif %}
      </div>
      {% if embed_url != '' %}
      <div class="preview-embed" data-src="{{ embed_url }}" data-type="{% if is_pdf %}pdf{% elsif is_video %}video{% else %}link{% endif %}">
        <div class="embed-placeholder">Click to load embed</div>
      </div>
      {% else %}
      <div class="preview-link-only">
        <a href="{{ item.url_link }}" target="_blank" rel="noopener">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Open link
        </a>
      </div>
      {% endif %}
      {% assign note = item.content | strip_html | strip %}
      {% if note != '' %}
        <p class="preview-note">{{ note }}</p>
      {% endif %}
    </div>
  </article>
  {% endfor %}
</div>

{% if site.media.size == 0 %}
<p class="no-media">No links saved yet.</p>
{% endif %}

<script>
(function() {
  const feed = document.getElementById('mediaFeed');
  const viewBtns = document.querySelectorAll('.view-btn');

  // Load all embeds on page load
  function loadAllEmbeds() {
    const embeds = feed.querySelectorAll('[data-src]');
    embeds.forEach(embed => {
      if (!embed.querySelector('iframe')) {
        const src = embed.dataset.src;
        embed.innerHTML = `<iframe src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      }
    });
  }

  // Load embeds on page load
  loadAllEmbeds();

  // View switching
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      feed.dataset.view = view;
    });
  });

  // JSON export
  window.exportFilteredJSON = function() {
    const items = Array.from(feed.querySelectorAll('.media-item')).filter(item =>
      item.style.display !== 'none' && !item.classList.contains('filtered-out')
    );
    const data = items.map(item => ({
      title: item.dataset.title,
      creator: item.dataset.creator || null,
      url: item.dataset.url,
      note: item.dataset.note || null
    }));

    navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
      const btn = document.querySelector('.json-export-btn');
      btn.style.background = 'var(--kala-sea)';
      btn.style.color = 'white';
      setTimeout(() => { btn.style.background = ''; btn.style.color = ''; }, 1500);
    });
  };
})();
</script>
