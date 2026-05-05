const READARK_STYLE_ID = 'readark-theme-4530';

const applyTheme = (themeKey) => {
  const existing = document.getElementById(READARK_STYLE_ID);
  if (existing) existing.remove();

  if (!themeKey || themeKey === 'none') return;

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

chrome.storage.sync.get('theme', (data) => {
  applyTheme(data.theme);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.theme !== undefined) {
    applyTheme(changes.theme.newValue);
  }
});
