const READARK_STYLE_ID = 'readark-theme-4530';

const removeTheme = () => {
  const el = document.getElementById(READARK_STYLE_ID);
  if (el) el.remove();
};

const applyTheme = (themeKey) => {
  removeTheme();
  if (!themeKey) return;
  const themes = window.READARK && window.READARK.THEMES;
  const buildCSS = window.READARK && window.READARK.buildThemeCSS;
  if (!themes || !buildCSS) return;
  const t = themes[themeKey];
  if (!t || !t.bg) return;
  const style = document.createElement('style');
  style.id = READARK_STYLE_ID;
  style.textContent = buildCSS(t);
  document.documentElement.appendChild(style);
};

const refreshTheme = () => {
  chrome.storage.sync.get(['theme', 'globalEnabled'], (d) => {
    if (d.globalEnabled === false) { removeTheme(); return; }
    applyTheme(d.theme || '');
  });
};

refreshTheme();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && (changes.theme || changes.globalEnabled)) {
    refreshTheme();
  }
});
