(function () {
  var btn = document.getElementById('searchBtn');
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');

  if (!btn || !overlay) return;

  var fuse = null;
  var indexLoaded = false;

  function openSearch() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    input.focus();
    if (!indexLoaded) loadIndex();
  }

  function closeSearch() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    input.value = '';
    results.innerHTML = '';
  }

  function loadIndex() {
    indexLoaded = true;
    fetch('/index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        fuse = new Fuse(data, {
          keys: [
            { name: 'title', weight: 2 },
            { name: 'tags', weight: 1.5 },
            { name: 'summary', weight: 1 }
          ],
          threshold: 0.4,
          includeScore: true
        });
        if (input.value.trim()) doSearch(input.value.trim());
      });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function doSearch(query) {
    if (!fuse) return;
    var res = fuse.search(query, { limit: 8 });
    if (!res.length) {
      results.innerHTML = '<p class="search-empty">No results found.</p>';
      return;
    }
    results.innerHTML = res.map(function (r) {
      var p = r.item;
      var tags = (p.tags || []).map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + '</span>';
      }).join('');
      return '<a href="' + escapeHtml(p.url) + '" class="search-result-item">' +
        '<span class="search-result-title">' + escapeHtml(p.title) + '</span>' +
        (tags ? '<span class="search-result-tags">' + tags + '</span>' : '') +
        '</a>';
    }).join('');
  }

  btn.addEventListener('click', openSearch);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSearch();
  });

  input.addEventListener('input', function () {
    var q = this.value.trim();
    if (!q) { results.innerHTML = ''; return; }
    doSearch(q);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });
})();
