const READARK_STYLE_ID = 'readark-theme-4530';

const removeTheme = () => {
  const el = document.getElementById(READARK_STYLE_ID);
  if (el) el.remove();
};

const applyTheme = (themeKey) => {
  if (!themeKey) { removeTheme(); return; }
  const themes = window.READARK && window.READARK.THEMES;
  const buildCSS = window.READARK && window.READARK.buildThemeCSS;
  if (!themes || !buildCSS) { removeTheme(); return; }
  const t = themes[themeKey];
  if (!t || !t.bg) { removeTheme(); return; }

  let style = document.getElementById(READARK_STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = READARK_STYLE_ID;
    document.documentElement.appendChild(style);
  }
  style.textContent = buildCSS(t);
};

chrome.storage.sync.get('theme', (d) => applyTheme(d.theme || ''));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.theme !== undefined) {
    applyTheme(changes.theme.newValue || '');
  }
});
