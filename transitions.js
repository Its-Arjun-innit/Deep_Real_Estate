// Shared motion for the dc pages: page enter/exit, hover pop, scroll reveal,
// count-up stats and the typed hero headline. Loaded by every *.dc.html.
//
// Progressive enhancement is deliberate: the final state of every effect is what
// sits in the HTML (full headline text, final stat numbers, visible sections).
// JS only animates *towards* that state, so if this script never runs — or the
// visitor prefers reduced motion — the page still reads correctly.
(function () {
  if (window.__dcTransitions) return;
  window.__dcTransitions = true;

  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (reduce) return;

  var root = document.documentElement;

  var css = document.createElement('style');
  css.textContent =
    'html{scroll-behavior:smooth}' +
    '@keyframes dcEnter{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:translateX(0)}}' +
    '@keyframes dcExit{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-46px)}}' +
    '#dc-root{animation:dcEnter .40s cubic-bezier(.22,.61,.36,1) both}' +
    '#dc-root.dc-leaving{animation:dcExit .26s ease both}' +
    // Pop-out on hover so users can tell what is clickable.
    'a,button,[role="button"],label:has(select),select,summary{transition:transform .18s ease,box-shadow .18s ease}' +
    'a:hover,button:hover,[role="button"]:hover{transform:translateY(-2px) scale(1.03)}' +
    'a:active,button:active,[role="button"]:active{transform:translateY(0) scale(.99)}' +
    // Scroll reveal. Scoped under .js-reveal so the hidden start state only ever
    // exists when this script is alive to undo it.
    '.js-reveal .dc-rv{opacity:0;transform:translateY(18px);will-change:opacity,transform}' +
    '.js-reveal .dc-rv.dc-in{opacity:1;transform:none;transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1)}' +
    // Typed headline caret.
    '.dc-caret{display:inline-block;width:.06em;height:.92em;margin-left:.06em;background:#c49a3c;vertical-align:-.08em;animation:dcBlink 1s step-end infinite}' +
    '@keyframes dcBlink{0%,100%{opacity:1}50%{opacity:0}}';
  document.head.appendChild(css);
  root.classList.add('js-reveal');

  /* ---------------- page exit transition ---------------- */
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#') return;                 // in-page anchor
    if (!/\.dc\.html(\?|#|$)/.test(href)) return;                // only dc pages
    if (a.origin && a.origin !== location.origin) return;        // external
    e.preventDefault();
    var r = document.getElementById('dc-root');
    if (!r) { location.href = href; return; }
    r.classList.add('dc-leaving');
    setTimeout(function () { location.href = href; }, 250);
  }, true);

  /* ---------------- helpers ---------------- */
  var io = null;
  if ('IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        show(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
  }

  function show(el) {
    el.__rvShown = true;
    el.classList.add('dc-rv', 'dc-in');
    if (el.hasAttribute('data-stagger')) {
      [].forEach.call(el.children, function (c, i) {
        c.style.transition = 'opacity .6s ease ' + (i * 70) + 'ms,transform .6s cubic-bezier(.22,.61,.36,1) ' + (i * 70) + 'ms';
        c.style.opacity = '0';
        c.style.transform = 'translateY(14px)';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { c.style.opacity = '1'; c.style.transform = 'none'; });
        });
      });
    }
    countIn(el);
  }

  /* ---------------- count-up ---------------- */
  function countIn(scope) {
    var nodes = scope.querySelectorAll ? scope.querySelectorAll('[data-count]') : [];
    [].forEach.call(nodes, function (el) {
      if (el.__counted) return;
      el.__counted = true;
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      // Lock the box so growing digits can't reflow the layout.
      el.style.display = 'inline-block';
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
      var dur = 1600, t0 = 0;
      function frame(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('en-IN');
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString('en-IN');
      }
      // Deliberately do NOT blank the number up front: if rAF never runs (hidden
      // or background tab) the real figure printed in the HTML must survive.
      requestAnimationFrame(frame);
    });
  }

  /* ---------------- typed headline ---------------- */
  function typeIn(h) {
    if (h.__typed) return;
    // Hidden/background tab throttles timers to ~1s, which would leave the
    // headline half-typed for ages. Leave the full text and type on first view.
    if (document.visibilityState !== 'visible') {
      if (!h.__typeQueued) {
        h.__typeQueued = true;
        document.addEventListener('visibilitychange', function once() {
          if (document.visibilityState === 'visible') {
            document.removeEventListener('visibilitychange', once);
            typeIn(h);
          }
        });
      }
      return;
    }
    h.__typed = true;
    // Reserve the final height first so nothing below shifts while typing.
    var box = h.getBoundingClientRect();
    if (box.height) h.style.minHeight = box.height + 'px';
    h.setAttribute('aria-label', (h.textContent || '').replace(/\s+/g, ' ').trim());

    var parts = [];   // one entry per <span> line, in order
    [].forEach.call(h.querySelectorAll('[data-type-line]'), function (s) {
      parts.push({ el: s, text: s.textContent });
      s.textContent = '';
    });
    if (!parts.length) return;

    var caret = document.createElement('span');
    caret.className = 'dc-caret';
    caret.setAttribute('aria-hidden', 'true');
    parts[0].el.parentNode.appendChild(caret);

    var pi = 0, ci = 0;
    (function step() {
      var p = parts[pi];
      if (!p) { caret.remove(); return; }
      p.el.textContent = p.text.slice(0, ++ci);
      if (ci >= p.text.length) { pi++; ci = 0; }
      setTimeout(step, 52);
    })();
  }

  /* ---------------- scan (content mounts async via the dc runtime) ---------------- */
  // The dc runtime re-renders through React, which resets className/style from
  // the template and so strips the classes we add. scan() is therefore
  // idempotent: it re-applies state on every pass instead of bailing on a flag.
  // (Worst case if a strip is ever missed, the element simply stays visible.)
  function scan() {
    var host = document.getElementById('dc-root') || document.body;

    [].forEach.call(host.querySelectorAll('section'), function (s) {
      if (s.__rvShown) {                       // already revealed — keep it shown
        s.classList.add('dc-rv', 'dc-in');
        return;
      }
      s.classList.add('dc-rv');
      if (s.__rvWatched) return;               // observed already, just re-classed
      s.__rvWatched = true;
      // No usable viewport (hidden/background tab) or no IO support: don't gamble
      // on an event that may never arrive — show it now.
      if (!io || !innerHeight) { show(s); return; }
      // Already on screen at load (hero, first band): show at once, no animation.
      if (s.getBoundingClientRect().top < innerHeight * 0.92) show(s);
      else io.observe(s);
    });

    var h = host.querySelector('[data-typed]');
    if (h) typeIn(h);
  }

  function boot() {
    scan();
    var mo = new MutationObserver(function () { scan(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { mo.disconnect(); }, 8000);

    // Failsafe: nothing on a marketing page should ever be stuck invisible
    // waiting on an event. If a section hasn't revealed within 4s, force it.
    setTimeout(function () {
      [].forEach.call(document.querySelectorAll('section.dc-rv'), function (s) {
        if (!s.__rvShown) { if (io) io.unobserve(s); show(s); }
      });
    }, 4000);
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
