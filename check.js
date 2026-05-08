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

const hostname = location.hostname;

const isDisabled = (list) => list.includes(hostname);

chrome.storage.local.get('disabledHosts', (local) => {
  if (isDisabled(local.disabledHosts || [])) return;
  chrome.storage.sync.get('theme', (sync) => applyTheme(sync.theme));
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.theme !== undefined) {
    chrome.storage.local.get('disabledHosts', (local) => {
      if (!isDisabled(local.disabledHosts || [])) {
        applyTheme(changes.theme.newValue);
      }
    });
  }
  if (area === 'local' && changes.disabledHosts !== undefined) {
    const disabled = isDisabled(changes.disabledHosts.newValue || []);
    if (disabled) {
      const existing = document.getElementById(READARK_STYLE_ID);
      if (existing) existing.remove();
    } else {
      chrome.storage.sync.get('theme', (sync) => applyTheme(sync.theme));
    }
  }
});
