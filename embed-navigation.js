(function () {
  function getBaseUrl() {
    var url = new window.URL(window.location.href);

    url.hash = '';
    url.search = '';
    url.pathname = url.pathname.replace(/[^/]*$/, '');

    return url.toString();
  }

  function isSpecialHref(href) {
    return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
  }

  function getStickyOffset() {
    var nav = document.querySelector('nav');
    return nav ? nav.offsetHeight + 20 : 20;
  }

  function resolveInternalHref(href) {
    if (!href || isSpecialHref(href)) {
      return href;
    }

    if (href.charAt(0) === '#') {
      return window.location.pathname + window.location.search + href;
    }

    return new window.URL(href, getBaseUrl()).toString();
  }

  function scrollToHash(hash, updateHash) {
    var id = String(hash || '').replace(/^#/, '');
    var target = id ? document.getElementById(id) : null;
    var top;

    if (!target) {
      return;
    }

    top = target.getBoundingClientRect().top + window.scrollY - getStickyOffset();
    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth'
    });

    if (updateHash !== false) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + id);
      } else {
        window.location.hash = id;
      }
    }
  }

  function upgradeInternalLinks() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = (link.getAttribute('href') || '').trim();

      if (!href || isSpecialHref(href)) {
        return;
      }

      if (href.charAt(0) === '#') {
        link.addEventListener('click', function (event) {
          event.preventDefault();
          scrollToHash(href);
        });
        return;
      }

      link.href = resolveInternalHref(href);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    upgradeInternalLinks();

    if (window.location.hash) {
      window.setTimeout(function () {
        scrollToHash(window.location.hash, false);
      }, 40);
    }
  });
})();
