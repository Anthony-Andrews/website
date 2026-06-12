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

// src/components/FileIcon.tsx
var _CACHE_KEY = 'quartz-file-icon-v2';
var _SVG_URL = "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path d=%22M0 0h24v24H0V0z%22 fill=%22none%22/><path d=%22M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z%22/></svg>')";

var beforeDOMLoadedScript = `
(function() {
  try {
    var paths = JSON.parse(localStorage.getItem('${_CACHE_KEY}') || 'null');
    if (!paths || !paths.length) return;
    var url = "${_SVG_URL}";
    var css = paths.map(function(p) {
      var s = '.folder-container[data-folderpath="' + p + '"]';
      return s + '::before,li:has(>.folder-outer:not(.open))>' + s + '::before,li:has(>.folder-outer.open)>' + s + '::before{mask-image:' + url + '!important;-webkit-mask-image:' + url + '!important}' +
        'html[saved-theme="light"] ' + s + ' .folder-button.active,' +
        'html[saved-theme="light"] ' + s + ' .folder-button.active .folder-title{color:#f4a261!important;opacity:1!important;font-weight:600!important}' +
        'html[saved-theme="dark"] ' + s + ' .folder-button.active,' +
        'html[saved-theme="dark"] ' + s + ' .folder-button.active .folder-title{color:#4caf50!important;opacity:1!important;font-weight:600!important}';
    }).join('');
    var el = document.createElement('style');
    el.id = 'file-icon-style';
    el.textContent = css;
    document.head.appendChild(el);
  } catch(e) {}
})();
`;

var afterDOMLoadedScript = `
(function() {
  var _fileIconPaths = null;
  var FILE_ICON_URL = "${_SVG_URL}";
  var FILE_ICON_CACHE = '${_CACHE_KEY}';
  function buildFileIconCSS(paths) {
    return paths.map(function(p) {
      var s = '.folder-container[data-folderpath="' + p + '"]';
      return s + '::before,li:has(>.folder-outer:not(.open))>' + s + '::before,li:has(>.folder-outer.open)>' + s + '::before{mask-image:' + FILE_ICON_URL + '!important;-webkit-mask-image:' + FILE_ICON_URL + '!important}' +
        'html[saved-theme="light"] ' + s + ' .folder-button.active,' +
        'html[saved-theme="light"] ' + s + ' .folder-button.active .folder-title{color:#f4a261!important;opacity:1!important;font-weight:600!important}' +
        'html[saved-theme="dark"] ' + s + ' .folder-button.active,' +
        'html[saved-theme="dark"] ' + s + ' .folder-button.active .folder-title{color:#4caf50!important;opacity:1!important;font-weight:600!important}';
    }).join('');
  }
  function injectFileIconStyle(paths) {
    var css = paths && paths.length ? buildFileIconCSS(paths) : '';
    var existing = document.getElementById('file-icon-style');
    if (existing && existing.textContent === css) return;
    if (existing) existing.remove();
    if (!css) return;
    var el = document.createElement('style');
    el.id = 'file-icon-style';
    el.textContent = css;
    document.head.appendChild(el);
  }
  function applyFileIconStyle() {
    if (document.getElementById('file-icon-style')) return;
    if (_fileIconPaths !== null) injectFileIconStyle(_fileIconPaths);
  }
  (function() {
    try {
      var cached = JSON.parse(localStorage.getItem(FILE_ICON_CACHE) || 'null');
      if (cached) _fileIconPaths = cached;
    } catch(e) {}
    fetch('/static/contentIndex.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var paths = Object.keys(data).filter(function(slug) {
          return data[slug] && data[slug].tags && data[slug].tags.indexOf('file-icon') !== -1;
        });
        _fileIconPaths = paths;
        try { localStorage.setItem(FILE_ICON_CACHE, JSON.stringify(paths)); } catch(e) {}
        injectFileIconStyle(paths);
      })
      .catch(function() {});
  })();
  document.addEventListener('nav', function() { applyFileIconStyle(); });
})();
`;

var FileIcon = () => {
  const Component = (_props) => /* @__PURE__ */ u2("span", { "aria-hidden": "true", style: "display:none" });
  Component.afterDOMLoaded = afterDOMLoadedScript;
  Component.beforeDOMLoaded = beforeDOMLoadedScript;
  return Component;
};
FileIcon.afterDOMLoaded = afterDOMLoadedScript;
FileIcon.beforeDOMLoaded = beforeDOMLoadedScript;
var FileIcon_default = FileIcon;

export { FileIcon_default as FileIcon };
//# sourceMappingURL=index.js.map
