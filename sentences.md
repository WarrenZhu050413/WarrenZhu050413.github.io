---
layout: page
title: One True Sentences
permalink: /sentences/
wide: true
title_bottom: true
---

{% include collection-nav.html active="sentences" %}

<p class="sentences-intro">
"I would stand and look out over the roofs of Paris and think, 'Do not worry. You have always written before and you will write now. All you have to do is write one true sentence. Write the truest sentence that you know.' So finally I would write one true sentence, and then go on from there. It was easy then because there was always one true sentence that I knew or had seen or had heard someone say."
</p>

{% include collection-controls.html filter_placeholder="sentences" filter_target=".sentence-entry" filter_id="sentences" %}

<div class="sentences-feed" id="sentencesFeed" data-view="masonry">
  {% assign sorted_sentences = site.sentences | sort: 'date' | reverse %}
  {% for sentence in sorted_sentences %}
    {% include sentence-card.html item=sentence %}
  {% endfor %}
</div>

{% if site.sentences.size == 0 %}

<p class="no-sentences">No sentences yet...</p>
{% endif %}

{% include collection-script.html feed_id="sentencesFeed" card_selector=".sentence-entry" controls_selector=".collection-controls" %}
