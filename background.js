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

  chrome.storage.sync.get(['theme', 'globalEnabled'], (d) => {
    setGlobalBtn(d.globalEnabled !== false);
    highlightTheme(d.theme || '');
  });

  // ── Get tab id (only needed for reload/scripting) ────────────
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab?.id;

  // ── Global ON/OFF (reloads page) ─────────────────────────────
  globalBtn.addEventListener('click', () => {
    chrome.storage.sync.get('globalEnabled', (d) => {
      const turningOff = d.globalEnabled !== false;
      const next = !turningOff;
      setGlobalBtn(next);
      chrome.storage.sync.set({ globalEnabled: next }, () => {
        chrome.scripting.executeScript({
          target: { tabId, allFrames: true },
          func: () => { document.getElementById('readark-theme-4530')?.remove(); }
        }).catch(() => {}).then(() => chrome.tabs.reload(tabId));
      });
    });
  });

  // ── Theme selection (live, no reload) ────────────────────────
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.theme-item');
    if (!item) return;
    const key = item.dataset.theme;
    highlightTheme(key);
    chrome.storage.sync.set({ theme: key, globalEnabled: true });
  });
});
