// Sidebar toggle (mobile), copy buttons, scroll-spy.
(function () {
  'use strict';

  document.getElementById('nav-toggle').addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });

  document.querySelectorAll('#sidebar a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
    });
  });

  // Copy buttons on code blocks.
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var text = pre.querySelector('code').textContent;
      var done = function (ok) {
        btn.textContent = ok ? 'Copied' : 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { done(document.execCommand('copy')); }
        catch (e) { done(false); }
        ta.remove();
      }
    });
    pre.appendChild(btn);
  });

  // Scroll-spy.
  var links = Array.prototype.slice.call(document.querySelectorAll('#sidebar a[href^="#"]'));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);
  function onScroll() {
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= 120) current = sections[i];
    }
    links.forEach(function (l) {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
