// Carousel-style page transitions for the dc pages.
// Enter: new page slides in from the right + fades. Exit: current page slides
// out to the left + fades, then navigates. No router — works with the plain
// multi-file structure. Honors prefers-reduced-motion.
(function () {
  if (window.__dcTransitions) return;
  window.__dcTransitions = true;

  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (reduce) return;

  var css = document.createElement('style');
  css.textContent =
    '@keyframes dcEnter{from{opacity:0;transform:translateX(46px)}to{opacity:1;transform:translateX(0)}}' +
    '@keyframes dcExit{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-46px)}}' +
    '#dc-root{animation:dcEnter .40s cubic-bezier(.22,.61,.36,1) both}' +
    '#dc-root.dc-leaving{animation:dcExit .26s ease both}' +
    // Pop-out on hover for anything clickable so users can tell it's interactive.
    'a,button,[role="button"],label:has(select),select,summary{transition:transform .18s ease,box-shadow .18s ease}' +
    'a:hover,button:hover,[role="button"]:hover{transform:translateY(-2px) scale(1.03)}' +
    'a:active,button:active,[role="button"]:active{transform:translateY(0) scale(.99)}';
  document.head.appendChild(css);

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
    var root = document.getElementById('dc-root');
    if (!root) { location.href = href; return; }
    root.classList.add('dc-leaving');
    setTimeout(function () { location.href = href; }, 250);
  }, true);
})();
