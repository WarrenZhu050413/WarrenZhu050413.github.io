---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories-page">
  {% assign sorted_categories = site.categories | sort %}
  {% for category in sorted_categories %}
    <h3 id="{{ category[0] | slugify }}">{{ category[0] }}</h3>
    <ul class="category-list">
      {% for post in category[1] %}
        <li>
          <div class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</div>
          <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </li>
      {% endfor %}
    </ul>
  {% endfor %}
</div>

<style>
  .categories-page h3 {
    margin-top: 1.5em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #eee;
  }
  
  .category-list {
    padding-left: 0;
    list-style: none;
  }
  
  .category-list li {
    margin-bottom: 0.8em;
  }
  
  .post-meta {
    color: #777;
    font-size: 0.9em;
  }
</style> 