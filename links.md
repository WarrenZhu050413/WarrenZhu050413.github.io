---
layout: page
title: Links
permalink: /links/
wide: true
title_bottom: true
---

{% include collection-nav.html active="links" %}

{% include collection-controls.html filter_placeholder="links" filter_target=".card-entry" filter_id="links" %}

<div class="card-feed" id="linksFeed" data-view="masonry">
  {% assign sorted_links = site.links | sort: 'date' | reverse %}
  {% for item in sorted_links %}
  <article class="card-entry"
           data-title="{{ item.title | escape }}"
           data-content="{{ item.content | strip_html | strip | escape }}"
           data-date="{{ item.date | date_to_xmlschema }}"
           data-url="{{ item.url_link }}"
           data-type="links">
    <div class="card-header">
      <div class="card-title-line">
        <a href="{{ item.url_link }}" class="card-link" target="_blank" rel="noopener">
          <h2 class="card-title">{{ item.title | escape }}</h2>
        </a>
        {%- if item.creator -%}
        <span class="card-author">{{ item.creator }}</span>
        {%- endif -%}
      </div>
      <time class="card-date" datetime="{{ item.date | date_to_xmlschema }}">
        {{ item.date | date: "%b %-d" }}
      </time>
    </div>
    {%- assign content_stripped = item.content | strip_html | strip -%}
    {%- if content_stripped != "" -%}
    <div class="card-content">
      {{ item.content }}
    </div>
    {%- endif -%}
  </article>
  {% endfor %}
</div>

{% if site.links.size == 0 %}
<p class="no-media">No links saved yet.</p>
{% endif %}

{% include collection-script.html feed_id="linksFeed" card_selector=".card-entry" controls_selector=".collection-controls" %}
