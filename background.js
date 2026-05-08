document.addEventListener('DOMContentLoaded', async () => {
  const THEMES = window.READARK.THEMES;
  const container = document.getElementById('themeContainer');

  // ── Render theme list (before any async calls) ───────────────
  const groups = [
    { key: 'dark',  label: 'Dark Themes' },
    { key: 'light', label: 'Light Themes' }
  ];

  groups.forEach(({ key, label }) => {
    const entries = Object.entries(THEMES).filter(([, t]) => t.group === key);
    if (!entries.length) return;

    const heading = document.createElement('div');
    heading.className = 'group-label';
    heading.textContent = label;
    container.appendChild(heading);

    entries.forEach(([themeKey, theme]) => {
      const item = document.createElement('div');
      item.className = 'theme-item';
      item.dataset.theme = themeKey;

      const swatch = document.createElement('div');
      swatch.className = 'theme-swatch';
      swatch.style.background =
        `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent || theme.link || '#888'} 50%)`;

      const name = document.createElement('span');
      name.className = 'theme-name';
      name.textContent = theme.name;

      const dot = document.createElement('span');
      dot.className = 'theme-dot';
      dot.textContent = '●';

      item.appendChild(swatch);
      item.appendChild(name);
      item.appendChild(dot);
      container.appendChild(item);
    });
  });

  const highlightTheme = (key) => {
    document.querySelectorAll('.theme-item').forEach((el) => {
      el.classList.toggle('selected', el.dataset.theme === key);
    });
  };

  // ── Load saved state ─────────────────────────────────────────
  const globalBtn = document.getElementById('globalBtn');

  const setGlobalBtn = (on) => {
    globalBtn.textContent = on ? 'ON' : 'OFF';
    globalBtn.className = 'global-btn ' + (on ? 'on' : 'off');
  };

  chrome.storage.sync.get(['theme', 'savedTheme'], (d) => {
    setGlobalBtn(!!d.theme);
    highlightTheme(d.theme || d.savedTheme || '');
  });

  // ── Get tab id (only needed for reload/scripting) ────────────
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab?.id;

  // ── Global ON/OFF (reloads page) ─────────────────────────────
  globalBtn.addEventListener('click', () => {
    chrome.storage.sync.get(['theme', 'savedTheme'], (d) => {
      const isOn = !!d.theme;
      if (isOn) {
        // Turning OFF: save theme, clear it
        setGlobalBtn(false);
        chrome.storage.sync.set({ savedTheme: d.theme, theme: '' }, () => {
          chrome.tabs.reload(tabId);
        });
      } else {
        // Turning ON: restore saved theme
        const restore = d.savedTheme || '';
        setGlobalBtn(!!restore);
        chrome.storage.sync.set({ theme: restore }, () => {
          chrome.tabs.reload(tabId);
        });
      }
    });
  });

  // ── Theme selection (live, no reload) ────────────────────────
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.theme-item');
    if (!item) return;
    const key = item.dataset.theme;
    highlightTheme(key);
    chrome.storage.sync.set({ theme: key, savedTheme: key });
  });
});
