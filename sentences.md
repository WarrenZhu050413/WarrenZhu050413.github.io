---
layout: page
title: One True Sentences
permalink: /sentences/
wide: true
---

<p class="sentences-intro">

"I would stand and look out over the roofs of Paris and think, 'Do not worry. You have always written before and you will write now. All you have to do is write one true sentence. Write the truest sentence that you know.' So finally I would write one true sentence, and then go on from there. It was easy then because there was always one true sentence that I knew or had seen or had heard someone say."

</p>

{% include inline-filter.html placeholder="sentences" target=".sentence-entry" id="sentences" %}

<div class="sentences-feed">
  {% assign sorted_sentences = site.sentences | sort: 'date' | reverse %}
  {% for sentence in sorted_sentences %}
  <article class="sentence-entry">
    <div class="sentence-entry-header">
      <a href="{{ sentence.url | relative_url }}" class="sentence-link">
        <h2 class="sentence-entry-title">{{ sentence.title | escape }}</h2>
      </a>
      <time class="sentence-entry-date" datetime="{{ sentence.date | date_to_xmlschema }}">
        {{ sentence.date | date: "%b %-d" }}
      </time>
    </div>
    {% assign content_stripped = sentence.content | strip_html | strip %}
    {% if content_stripped != "" %}
    <div class="sentence-entry-content">
      {{ sentence.content }}
    </div>
    {% endif %}
  </article>
  {% endfor %}
</div>

{% if site.sentences.size == 0 %}

<p class="no-sentences">No sentences yet. The first one is always the hardest.</p>
{% endif %}
