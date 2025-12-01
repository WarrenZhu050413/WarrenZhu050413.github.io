---
layout: default
title: Archive
permalink: /archive/
---

<div class="archive">
  <h1 class="page-heading">Archive</h1>

  <p class="archive-description">Posts I've moved on from, but keeping for reference.</p>

  {%- assign relegated_posts = site.posts | where: "relegated", true | sort: "date" | reverse -%}

  {%- if relegated_posts.size > 0 -%}
    <ul class="archive-list">
      {%- for post in relegated_posts -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="archive-date">{{ post.date | date: date_format }}</span>
        <span class="archive-separator">&middot;</span>
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </li>
      {%- endfor -%}
    </ul>
  {%- else -%}
    <p>No archived posts.</p>
  {%- endif -%}
</div>
