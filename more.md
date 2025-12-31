---
layout: page
title: More
permalink: /more/
wide: true
title_bottom: true
---

{% include collection-nav.html active="more" %}

<p class="sentences-intro">
Everything else: sentences, random thoughts, and links in one place.
</p>

{% include collection-controls.html filter_placeholder="filter" filter_target=".sentence-entry" filter_id="more" %}

<div class="sentences-feed" id="moreFeed" data-view="masonry">
  {%- comment -%} Collect all items {%- endcomment -%}
  {%- assign all_items = "" | split: "" -%}
  {%- for item in site.sentences -%}
    {%- assign all_items = all_items | push: item -%}
  {%- endfor -%}
  {%- for item in site.random -%}
    {%- assign all_items = all_items | push: item -%}
  {%- endfor -%}
  {%- for item in site.links -%}
    {%- assign all_items = all_items | push: item -%}
  {%- endfor -%}

  {%- assign sorted_items = all_items | sort: 'date' | reverse -%}

  {%- for item in sorted_items -%}
    {%- if item.collection == 'links' -%}
      {% include link-card-minimal.html item=item %}
    {%- else -%}
      {% include sentence-card.html item=item %}
    {%- endif -%}
  {%- endfor -%}
</div>

{%- assign total_count = site.sentences.size | plus: site.random.size | plus: site.links.size -%}
{%- if total_count == 0 -%}
<p class="no-sentences">Nothing here yet.</p>
{%- endif -%}

{% include collection-script.html feed_id="moreFeed" card_selector=".sentence-entry" controls_selector=".collection-controls" %}
