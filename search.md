---
layout: page
title: Search 
permalink: /search/
---

<!-- Search -->
<div id="search-container">
  <input type="text" id="search-input" placeholder="Search blog posts...">
  <div class="filter-container">
    <span>Filter by category: </span>
    <select id="category-filter">
      <option value="">All categories</option>
      {% assign categories = site.categories | sort %}
      {% for category in categories %}
        <option value="{{ category[0] | slugify }}">{{ category[0] }}</option>
      {% endfor %}
    </select>
  </div>
  <div id="search-info" style="margin: 10px 0; padding: 10px; background: #f8f8f8; border: 1px solid #ddd; display: block;">
    <div>Search Result:</div>
    <div id="search-message">Ready to search...</div>
  </div>
  <ul id="results-container"></ul>
</div>

<!-- Include Lunr.js first -->
<script src="{{ site.baseurl }}/assets/js/lunr.min.js"></script>

<script>
// Display info
function showMessage(message) {
  document.getElementById('search-info').style.display = 'block';
  document.getElementById('search-message').textContent = message;
}

// Initialize search function
document.addEventListener('DOMContentLoaded', function() {
  // Check if lunr is loaded
  if (typeof lunr === 'undefined') {
    showMessage('ERROR: Lunr.js is not loaded. Search will not work.');
    return;
  } else {
    showMessage('Lunr.js loaded successfully. Starting search initialization...');
  }

  // Initialize variables
  var searchInput = document.getElementById('search-input');
  var categoryFilter = document.getElementById('category-filter');
  var resultsContainer = document.getElementById('results-container');
  
  var idx;
  var documents = [];
  
  // Fetch the search index
  fetch('{{ site.baseurl }}/search.json')
    .then(function(response) {
      showMessage('Search index response received with status: ' + response.status);
      return response.json();
    })
    .then(function(data) {
      showMessage('Search index loaded with ' + data.length + ' entries');
      documents = data;
      
      // Build the Lunr index with simplified configuration
      try {
        idx = lunr(function() {
          this.ref('url');
          this.field('title', { boost: 10 });
          this.field('category', { boost: 5 });
          this.field('content');
          
          documents.forEach(function(doc) {
            this.add({
              'url': doc.url,
              'title': doc.title,
              'category': doc.category,
              'content': doc.content
            });
          }, this);
        });
        showMessage('Search index built successfully. Ready to search!');
      } catch (e) {
        showMessage('Error building search index: ' + e.message);
      }
      
      // Set up event listeners
      searchInput.addEventListener('keyup', performSearch);
      categoryFilter.addEventListener('change', performSearch);
    })
    .catch(function(error) {
      showMessage('Error loading search index: ' + error.message);
    });
  
  function performSearch() {
    var query = searchInput.value;
    var selectedCategory = categoryFilter.value.toLowerCase();
    
    // Clear results
    resultsContainer.innerHTML = '';
    
    if (query.trim() === '' && selectedCategory === '') {
      return;
    }
    
    showMessage('Searching for: "' + query + '" in category: "' + selectedCategory + '"');
    
    var results = [];
    
    // If we have a search term, perform search
    if (query.trim() !== '') {
      try {
        // For Lunr search, use the original query
        var lunrResults = idx.search(query);
        showMessage('Found ' + lunrResults.length + ' results for "' + query + '"');
        
        // Map the Lunr results to our documents
        results = lunrResults.map(function(result) {
          return documents.find(function(doc) {
            return doc.url === result.ref;
          });
        });
        
        // Always do character-level search alongside Lunr search
        var charResults = documents.filter(function(item) {
          return item.title.toLowerCase().includes(query.toLowerCase()) ||
                 item.content.toLowerCase().includes(query.toLowerCase()) ||
                 (item.category && item.category.toLowerCase().includes(query.toLowerCase()));
        });
        
        // Combine results, removing duplicates
        charResults.forEach(function(item) {
          if (!results.some(function(result) { return result.url === item.url; })) {
            results.push(item);
          }
        });
        
        showMessage('Found ' + results.length + ' total results');
      } catch (e) {
        showMessage('Search error: ' + e.message + '. Using basic search only.');
        // On error, fall back to simple filtering
        results = documents.filter(function(item) {
          return item.title.toLowerCase().includes(query.toLowerCase()) ||
                 item.content.toLowerCase().includes(query.toLowerCase()) ||
                 (item.category && item.category.toLowerCase().includes(query.toLowerCase()));
        });
      }
    } else {
      // If no search term but category selected, show all posts
      results = documents;
    }
    
    // Filter by category if selected
    if (selectedCategory !== '') {
      results = results.filter(function(item) {
        return item.category && item.category.toLowerCase().split(', ').includes(selectedCategory);
      });
    }
    
    // Display results
    displayResults(results);
  }
  
  function displayResults(results) {
    if (results.length === 0) {
      resultsContainer.innerHTML = '<li>No results found</li>';
      return;
    }
    
    results.forEach(function(item) {
      var li = document.createElement('li');
      
      var titleDiv = document.createElement('div');
      titleDiv.className = 'result-title';
      
      var titleLink = document.createElement('a');
      titleLink.href = item.url;
      titleLink.textContent = item.title;
      titleDiv.appendChild(titleLink);
      
      var dateDiv = document.createElement('div');
      dateDiv.className = 'result-date';
      dateDiv.textContent = item.date;
      
      var categoriesDiv = document.createElement('div');
      if (item.category) {
        item.category.split(', ').forEach(function(category) {
          if (category.trim() !== '') {
            var categorySpan = document.createElement('span');
            categorySpan.className = 'result-category';
            categorySpan.textContent = category;
            categoriesDiv.appendChild(categorySpan);
          }
        });
      }
      
      var snippetDiv = document.createElement('div');
      snippetDiv.className = 'result-snippet';
      snippetDiv.textContent = item.content;
      
      li.appendChild(titleDiv);
      li.appendChild(dateDiv);
      li.appendChild(categoriesDiv);
      li.appendChild(snippetDiv);
      
      resultsContainer.appendChild(li);
    });
  }
});
</script>

<style>
  #search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .filter-container {
    margin-bottom: 20px;
  }
  
  #category-filter {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  #results-container {
    list-style-type: none;
    padding: 0;
  }
  
  #results-container li {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f1f1f1;
  }
  
  .result-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .result-date {
    color: #777;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .result-category {
    display: inline-block;
    background: #f1f1f1;
    padding: 3px 8px;
    border-radius: 3px;
    font-size: 12px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  
  .result-snippet {
    margin-top: 10px;
  }
</style> 



<!-- Categories -->
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