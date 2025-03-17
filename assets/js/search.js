// Initialize lunr with the fields we want to search
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  var searchInput = document.getElementById('search-input');
  var categoryFilter = document.getElementById('category-filter');
  var resultsContainer = document.getElementById('results-container');
  
  // Initialize lunr
  var idx;
  var documents = [];
  
  // Fetch the search index
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      documents = data;
      
      // Build the Lunr index
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
      
      // Set up event listeners
      searchInput.addEventListener('keyup', performSearch);
      categoryFilter.addEventListener('change', performSearch);
    })
    .catch(error => console.error('Error loading search index:', error));
  
  function performSearch() {
    var query = searchInput.value;
    var selectedCategory = categoryFilter.value.toLowerCase();
    
    // Clear results
    resultsContainer.innerHTML = '';
    
    if (query.trim() === '' && selectedCategory === '') {
      return;
    }
    
    var results = [];
    
    // If we have a search term, perform Lunr search
    if (query.trim() !== '') {
      try {
        var lunrResults = idx.search(query);
        
        // Map the Lunr results to our documents
        results = lunrResults.map(function(result) {
          return documents.find(function(doc) {
            return doc.url === result.ref;
          });
        });
      } catch (e) {
        console.error('Search error:', e);
        // On error, fall back to simple filtering
        results = documents.filter(function(item) {
          return item.title.toLowerCase().includes(query.toLowerCase()) ||
                 item.content.toLowerCase().includes(query.toLowerCase());
        });
      }
    } else {
      // If no search term but category selected, show all posts
      results = documents;
    }
    
    // Filter by category if selected
    if (selectedCategory !== '') {
      results = results.filter(function(item) {
        return item.category.toLowerCase().split(', ').includes(selectedCategory);
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
      item.category.split(', ').forEach(function(category) {
        if (category.trim() !== '') {
          var categorySpan = document.createElement('span');
          categorySpan.className = 'result-category';
          categorySpan.textContent = category;
          categoriesDiv.appendChild(categorySpan);
        }
      });
      
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