let _sheet = null;

const removeTheme = () => {
  if (_sheet) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== _sheet);
    _sheet = null;
  }
};

const applyTheme = (themeKey) => {
  if (!themeKey) { removeTheme(); return; }
  const themes = window.READARK && window.READARK.THEMES;
  const buildCSS = window.READARK && window.READARK.buildThemeCSS;
  if (!themes || !buildCSS) { removeTheme(); return; }
  const t = themes[themeKey];
  if (!t || !t.bg) { removeTheme(); return; }

  if (!_sheet) {
    _sheet = new CSSStyleSheet();
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, _sheet];
  }
  _sheet.replaceSync(buildCSS(t));
};

chrome.storage.sync.get('theme', (d) => applyTheme(d.theme || ''));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.theme !== undefined) {
    applyTheme(changes.theme.newValue || '');
  }
});
