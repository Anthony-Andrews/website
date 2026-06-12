// Source reference — the compiled dist files are what Quartz actually loads.
// Edit dist/components/index.js to make live changes.

const terminalCursorCss = `
@keyframes blink-cursor {
  from { opacity: 1; }
  to   { opacity: 0; }
}

.page-title::before {
  content: ">";
  color: #f4a261;
  font-size: 0.9em;
  font-weight: normal;
  vertical-align: middle;
}

.terminal-cursor {
  color: #f4a261;
  font-size: 0.9em;
  font-weight: normal;
  vertical-align: middle;
}

.page-title:hover .terminal-cursor {
  animation: blink-cursor 0.5s steps(1, end) infinite alternate;
}

html[saved-theme="dark"] .page-title::before,
html[saved-theme="dark"] .terminal-cursor {
  color: #4caf50;
}
`;

const terminalCursorScript = `
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
  if (!addCursor()) {
    setTimeout(addCursor, 200);
  }
  document.addEventListener('nav', addCursor);
})();
`;

const TerminalCursor = () => {
  const Component = (_props: unknown) => null;
  (Component as any).css = terminalCursorCss;
  (Component as any).afterDOMLoaded = terminalCursorScript;
  return Component;
};

export default TerminalCursor;
