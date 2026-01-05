---
layout: page
title: Random Thoughts
permalink: /random/
wide: true
title_bottom: true
---

{% include collection-nav.html active="random" %}

<p class="sentences-intro">

"Whereof one cannot speak, thereof one must be silent"

</p>

{% include collection-controls.html filter_placeholder="random thoughts" filter_target=".card-entry" filter_id="random" %}

<div class="card-feed" id="randomFeed" data-view="masonry">
  {% assign sorted_random = site.random | sort: 'date' | reverse %}
  {% for item in sorted_random %}
    {% include sentence-card.html item=item %}
  {% endfor %}
</div>

{% if site.random.size == 0 %}

<p class="no-sentences">No random thoughts yet. The first one is always the hardest.</p>
{% endif %}

{% include collection-script.html feed_id="randomFeed" card_selector=".card-entry" controls_selector=".collection-controls" %}
