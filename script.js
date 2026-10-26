/* ============================================================
   Node Bridge — site behaviour (language-neutral)
   Theme toggle + persistence, OS-theme following, nav highlight,
   reveal-on-scroll, footer year. No dependencies, no network.
   ============================================================ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme ---------- */
  var STORAGE_KEY = 'nodebridge-theme';
  var toggle = document.getElementById('themeToggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* private mode */ }
    }
    if (toggle) {
      var label = theme === 'dark'
        ? toggle.getAttribute('data-label-light')
        : toggle.getAttribute('data-label-dark');
      if (label) toggle.setAttribute('aria-label', label);
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  applyTheme(currentTheme(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  // Follow the OS theme only while the user has made no explicit choice.
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (mq) {
    var onSystemChange = function (e) {
      var stored = null;
      try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }
      if (stored !== 'light' && stored !== 'dark') {
        applyTheme(e.matches ? 'dark' : 'light', false);
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------- Footer year ---------- */
  var years = document.querySelectorAll('[data-year]');
  var year = String(new Date().getFullYear());
  for (var i = 0; i < years.length; i++) years[i].textContent = year;

  /* ---------- Nav active state ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', match);
      if (match) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduceMq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var prefersReduced = !!(reduceMq && reduceMq.matches);
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || prefersReduced) {
    for (var j = 0; j < reveals.length; j++) reveals[j].classList.add('is-visible');
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (var k = 0; k < reveals.length; k++) revealObserver.observe(reveals[k]);
  }

  // Release the head-script failsafe.
  window.__nodebridgeReady = true;
})();
