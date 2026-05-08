document.addEventListener('DOMContentLoaded', async () => {
  const THEMES = window.READARK.THEMES;
  const container = document.getElementById('themeContainer');
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab.id;
  const hostname = new URL(tab.url).hostname;

  // ── Per-page toggle ──────────────────────────────────────────
  document.getElementById('pageHost').textContent = hostname;

  const getDisabled = (cb) =>
    chrome.storage.local.get('disabledHosts', (d) => cb(d.disabledHosts || []));

  const setDisabled = (list, cb) =>
    chrome.storage.local.set({ disabledHosts: list }, cb);

  getDisabled((list) => {
    document.getElementById('pageToggle').checked = !list.includes(hostname);
  });

  document.getElementById('pageToggle').addEventListener('change', (e) => {
    getDisabled((list) => {
      const updated = e.target.checked
        ? list.filter((h) => h !== hostname)
        : [...new Set([...list, hostname])];
      setDisabled(updated, () => chrome.tabs.reload(tabId));
    });
  });

  // ── Theme list ───────────────────────────────────────────────
  const groups = [
    { key: 'dark', label: 'Dark Themes' },
    { key: 'eink', label: 'E-Ink Screens' }
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
      if (theme.bg) {
        swatch.style.background =
          `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent || theme.link || '#888'} 50%)`;
      } else {
        swatch.style.background = 'linear-gradient(135deg, #3b3b3b 50%, #555 50%)';
      }

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

  chrome.storage.sync.get('theme', (data) => {
    highlightTheme(data.theme || 'none');
  });

  container.addEventListener('click', (e) => {
    const item = e.target.closest('.theme-item');
    if (!item) return;
    const key = item.dataset.theme;
    chrome.storage.sync.set({ theme: key }, () => chrome.tabs.reload(tabId));
    highlightTheme(key);
  });
});
