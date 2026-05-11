let _sheet = null;

const removeTheme = () => {
  if (_sheet) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter(s => s !== _sheet);
    _sheet = null;
  }
};

const applyTheme = (themeKey) => {
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

const refresh = (themeKey, disabledHosts) => {
  const host = window.location.hostname;
  if (themeKey && !(disabledHosts || []).includes(host)) {
    applyTheme(themeKey);
  } else {
    removeTheme();
  }
};

chrome.storage.sync.get('theme', (sd) => {
  chrome.storage.local.get('disabledHosts', (ld) => {
    refresh(sd.theme || '', ld.disabledHosts);
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.theme !== undefined) {
    chrome.storage.local.get('disabledHosts', (ld) => {
      refresh(changes.theme.newValue || '', ld.disabledHosts);
    });
  }
  if (area === 'local' && changes.disabledHosts !== undefined) {
    chrome.storage.sync.get('theme', (sd) => {
      refresh(sd.theme || '', changes.disabledHosts.newValue);
    });
  }
});
