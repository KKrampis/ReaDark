const READARK_STYLE_ID = 'readark-theme-4530';
const READARK_OVERLAY_ID = 'overlay4530';

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

const applyOverlay = (active) => {
  const existing = document.getElementById(READARK_OVERLAY_ID);
  if (active) {
    if (!existing && document.body) {
      const div = document.createElement('div');
      div.id = READARK_OVERLAY_ID;
      div.style.cssText =
        'position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;' +
        'background-color:rgba(255,215,0,0.3);z-index:999999999999;pointer-events:none;';
      document.body.appendChild(div);
    }
  } else {
    if (existing) existing.remove();
  }
};

chrome.storage.sync.get(['theme', 'overlay'], (data) => {
  applyTheme(data.theme);
  applyOverlay(data.overlay === 1);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return;
  if (changes.theme !== undefined) applyTheme(changes.theme.newValue);
  if (changes.overlay !== undefined) applyOverlay(changes.overlay.newValue === 1);
});
