// node_modules/preact/dist/preact.mjs
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/TerminalCursor.tsx
var terminalCursorScript = `
(function() {
  function addCursor() {
    var titleEl = document.querySelector('h2.page-title');
    if (!titleEl) return false;
    var link = titleEl.querySelector('a');
    if (!link) return false;
    if (link.querySelector('.terminal-cursor')) return true;
    var cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    cursor.textContent = '_';
    link.insertBefore(cursor, link.firstChild);
    return true;
  }
  function markActiveFolders() {
    var slug = (window.location.pathname || '').replace(/^\\//, '').replace(/\\/$/, '');
    document.querySelectorAll('.folder-container').forEach(function(fc) {
      var fp = (fc.dataset.folderpath || '').replace(/^\\//, '').replace(/\\/index$/, '').replace(/\\/$/, '');
      var btn = fc.querySelector('a.folder-button, button.folder-button');
      if (!btn) return;
      if (fp && slug === fp) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
  function watchExplorerThenMark() {
    var ul = document.querySelector('.explorer-ul');
    if (!ul) { setTimeout(function() { markActiveFolders(); }, 500); return; }
    var timer;
    var obs = new MutationObserver(function() {
      clearTimeout(timer);
      timer = setTimeout(function() { obs.disconnect(); markActiveFolders(); }, 50);
    });
    obs.observe(ul, { childList: true });
    setTimeout(function() { obs.disconnect(); markActiveFolders(); }, 2000);
  }
  function fixReaderModeSidebars() {
    var isReader = document.documentElement.getAttribute('reader-mode') === 'on';
    var isDark = document.documentElement.getAttribute('saved-theme') === 'dark';
    var vw = window.innerWidth;
    document.querySelectorAll('#quartz-body .sidebar').forEach(function(sidebar) {
      if (isReader && isDark) {
        var x = sidebar.getBoundingClientRect().left;
        sidebar.style.setProperty('background-image', 'linear-gradient(to right,#0f0f0f,#000000)', 'important');
        sidebar.style.setProperty('background-attachment', 'scroll', 'important');
        sidebar.style.setProperty('background-size', vw + 'px 100%', 'important');
        sidebar.style.setProperty('background-position', (-x) + 'px 0px', 'important');
        sidebar.style.setProperty('background-color', 'transparent', 'important');
        sidebar.querySelectorAll('*').forEach(function(el) {
          try {
            var cl = el.classList;
            if (cl && (cl.contains('darkmode') || cl.contains('readermode') || cl.contains('global-graph-icon'))) return;
            if (el.closest && el.closest('.search')) return;
            el.style.setProperty('background', 'transparent', 'important');
          } catch(e) {}
        });
      } else {
        sidebar.style.removeProperty('background-image');
        sidebar.style.removeProperty('background-attachment');
        sidebar.style.removeProperty('background-size');
        sidebar.style.removeProperty('background-position');
        sidebar.style.removeProperty('background-color');
        sidebar.querySelectorAll('*').forEach(function(el) {
          try { el.style.removeProperty('background'); } catch(e) {}
        });
      }
    });
  }
  var _rmo = new MutationObserver(function() { requestAnimationFrame(fixReaderModeSidebars); });
  _rmo.observe(document.documentElement, { attributes: true, attributeFilter: ['reader-mode', 'saved-theme'] });
  window.addEventListener('resize', fixReaderModeSidebars);
  fixReaderModeSidebars();
  function styleGraphIcon() {
    if (document.querySelector('#graph-icon-style')) return;
    var style = document.createElement('style');
    style.id = 'graph-icon-style';
    style.textContent =
      '.graph>.graph-outer>button.global-graph-icon{' +
      'opacity:0;transition:opacity .2s;mask-image:none;-webkit-mask-image:none;' +
      'border:1px solid var(--gray,#a3a3a3);border-radius:5px;background-color:var(--light)}' +
      '.graph>.graph-outer>button.global-graph-icon>svg{display:block;fill:var(--light);filter:contrast(0.3)}' +
      '.graph>.graph-outer:hover>button.global-graph-icon{opacity:1}' +
      '.graph>.graph-outer>button.global-graph-icon:hover{border-color:var(--secondary)}';
    document.head.appendChild(style);
  }
  // One-time migration: clear stale folder/icon localStorage caches
  if (!localStorage.getItem('quartz-state-v1')) {
    localStorage.removeItem('fileTree');
    localStorage.removeItem('quartz-file-icon-v2');
    localStorage.setItem('quartz-state-v1', '1');
  }
  if (!addCursor()) {
    setTimeout(addCursor, 200);
  }
  watchExplorerThenMark();
  styleGraphIcon();
  document.addEventListener('nav', function() {
    addCursor();
    watchExplorerThenMark();
    styleGraphIcon();
    fixReaderModeSidebars();
  });
})();
`;

var TerminalCursor = () => {
  const Component = (_props) => /* @__PURE__ */ u2("span", { "aria-hidden": "true", style: "display:none" });
  Component.afterDOMLoaded = terminalCursorScript;
  return Component;
};
TerminalCursor.afterDOMLoaded = terminalCursorScript;
var TerminalCursor_default = TerminalCursor;

export { TerminalCursor_default as TerminalCursor };
//# sourceMappingURL=index.js.map
