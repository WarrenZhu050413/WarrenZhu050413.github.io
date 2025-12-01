---
layout: page
title: One True Sentences
permalink: /sentences/
---

<p class="sentences-intro">
  Sentences worth remembering. Each one a small truth, a sharp observation, or a beautiful way of putting something.
</p>

<div class="sentences-feed">
  {% assign sorted_sentences = site.sentences | sort: 'date' | reverse %}
  {% for sentence in sorted_sentences %}
  <article class="sentence-entry">
    <a href="{{ sentence.url | relative_url }}" class="sentence-link">
      <h2 class="sentence-entry-title">{{ sentence.title | escape }}</h2>
    </a>
    {% assign content_stripped = sentence.content | strip_html | strip %}
    {% if content_stripped != "" %}
    <div class="sentence-entry-content">
      {{ sentence.content }}
    </div>
    {% endif %}
    <div class="sentence-entry-meta">
      <time class="sentence-entry-date" datetime="{{ sentence.date | date_to_xmlschema }}">
        {{ sentence.date | date: "%b %-d, %Y" }}
      </time>
      {% if sentence.source %}
      <span class="sentence-entry-source">&mdash; {{ sentence.source }}</span>
      {% endif %}
    </div>
  </article>
  {% endfor %}
</div>

{% if site.sentences.size == 0 %}
<p class="no-sentences">No sentences yet. The first one is always the hardest.</p>
{% endif %}
