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

  // Reuse existing element so the old CSS is never absent between swaps
  let style = document.getElementById(READARK_STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = READARK_STYLE_ID;
    document.documentElement.appendChild(style);
  }
  style.textContent = buildCSS(t);
};

const refreshTheme = () => {
  chrome.storage.sync.get(['theme', 'globalEnabled'], (d) => {
    if (d.globalEnabled === false) { removeTheme(); return; }
    applyTheme(d.theme || '');
  });
};

refreshTheme();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'sync') return;
  // globalEnabled changed (ON/OFF button) — page reloads anyway, but
  // handle it for other open tabs via a full re-read.
  if (changes.globalEnabled !== undefined) { refreshTheme(); return; }
  // Theme changed — use newValue directly, no async round-trip.
  if (changes.theme !== undefined) applyTheme(changes.theme.newValue || '');
});
