document.addEventListener('DOMContentLoaded', async () => {
  const THEMES = window.READARK.THEMES;
  const container = document.getElementById('themeContainer');

  // ── Render theme list ─────────────────────────────────────────
  const entries = Object.entries(THEMES).filter(([, t]) => t.group === 'dark');
  if (entries.length) {
    const heading = document.createElement('div');
    heading.className = 'group-label';
    heading.textContent = 'Dark Themes';
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
  }

  const highlightTheme = (key) => {
    document.querySelectorAll('.theme-item').forEach((el) => {
      el.classList.toggle('selected', el.dataset.theme === key);
    });
  };

  // ── Buttons ───────────────────────────────────────────────────
  const globalBtn = document.getElementById('globalBtn');
  const pageBtn   = document.getElementById('pageBtn');

  let _globalOn = false;

  const setGlobalBtn = (on) => {
    _globalOn = on;
    globalBtn.textContent = on ? 'ON' : 'OFF';
    globalBtn.className = 'toggle-btn global-btn ' + (on ? 'on' : 'off');
  };

  const setPageBtn = (pageOn) => {
    pageBtn.textContent = pageOn ? 'ON' : 'OFF';
    pageBtn.className = 'toggle-btn page-btn ' + ((pageOn && _globalOn) ? 'on' : 'off');
    pageBtn.disabled = !_globalOn;
  };

  // ── Get tab + host ────────────────────────────────────────────
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tab?.id;
  const host  = tab?.url?.startsWith('http') ? new URL(tab.url).hostname : null;

  if (!host) {
    pageBtn.disabled = true;
    pageBtn.textContent = 'N/A';
    pageBtn.className = 'toggle-btn page-btn off';
  }

  // ── Load saved state ──────────────────────────────────────────
  chrome.storage.sync.get(['theme', 'savedTheme'], (sd) => {
    setGlobalBtn(!!sd.theme);
    highlightTheme(sd.theme || sd.savedTheme || '');

    if (host) {
      chrome.storage.local.get('disabledHosts', (ld) => {
        const disabled = ld.disabledHosts || [];
        setPageBtn(!disabled.includes(host));
      });
    }
  });

  // ── Global ON/OFF (reloads page) ──────────────────────────────
  globalBtn.addEventListener('click', () => {
    chrome.storage.sync.get(['theme', 'savedTheme'], (d) => {
      const isOn = !!d.theme;
      if (isOn) {
        setGlobalBtn(false);
        chrome.storage.sync.set({ savedTheme: d.theme, theme: '' }, () => {
          chrome.tabs.reload(tabId);
        });
      } else {
        const restore = d.savedTheme || '';
        setGlobalBtn(!!restore);
        chrome.storage.sync.set({ theme: restore }, () => {
          chrome.tabs.reload(tabId);
        });
      }
    });
  });

  // ── Per-page ON/OFF (live, no reload) ─────────────────────────
  // onChanged in check.js handles the live CSS toggle when disabledHosts changes
  pageBtn.addEventListener('click', () => {
    if (!host || !_globalOn) return;
    chrome.storage.local.get('disabledHosts', (ld) => {
      const disabled = ld.disabledHosts || [];
      const isDisabled = disabled.includes(host);
      const updated = isDisabled
        ? disabled.filter(h => h !== host)
        : [...disabled, host];
      // new pageOn = old isDisabled: was-disabled→now-ON, was-enabled→now-OFF
      setPageBtn(isDisabled);
      chrome.storage.local.set({ disabledHosts: updated });
    });
  });

  // ── Theme selection (live, no reload) ─────────────────────────
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.theme-item');
    if (!item) return;
    const key = item.dataset.theme;
    highlightTheme(key);
    chrome.storage.sync.set({ theme: key, savedTheme: key });
    setGlobalBtn(true);
  });
});
