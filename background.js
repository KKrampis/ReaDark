const getTabId = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0].id;
};

document.addEventListener('DOMContentLoaded', async () => {
  const tabId = await getTabId();
  const THEMES = window.READARK.THEMES;

  // Build theme list
  const listEl = document.getElementById('themeList');
  Object.entries(THEMES).forEach(([key, theme]) => {
    const item = document.createElement('div');
    item.className = 'theme-item';
    item.dataset.theme = key;

    const swatch = document.createElement('div');
    swatch.className = 'theme-swatch';
    if (theme.bg) {
      swatch.style.background =
        `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent || theme.link || theme.text || '#888'} 50%)`;
    } else {
      swatch.style.background = 'linear-gradient(135deg, #ffffff 50%, #cccccc 50%)';
      swatch.style.border = '1px solid #aaa';
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
    listEl.appendChild(item);
  });

  // Load saved state
  chrome.storage.sync.get(['theme', 'overlay'], (data) => {
    const activeTheme = data.theme || 'none';
    highlightTheme(activeTheme);

    if (data.overlay === 1) {
      document.getElementById('readingCheckBox').checked = true;
    }
  });

  const highlightTheme = (key) => {
    document.querySelectorAll('.theme-item').forEach((el) => {
      el.classList.toggle('selected', el.dataset.theme === key);
    });
  };

  // Theme selection
  listEl.addEventListener('click', (e) => {
    const item = e.target.closest('.theme-item');
    if (!item) return;
    const key = item.dataset.theme;
    chrome.storage.sync.set({ theme: key });
    highlightTheme(key);
  });

  // Reading mode toggle
  document.getElementById('readingCheckBox').addEventListener('change', (e) => {
    const on = e.target.checked;
    chrome.storage.sync.set({ overlay: on ? 1 : 0 });
    chrome.scripting.executeScript({
      target: { tabId, allFrames: true },
      func: (overlayId, active) => {
        const existing = document.getElementById(overlayId);
        if (active) {
          if (!existing) {
            const div = document.createElement('div');
            div.id = overlayId;
            div.style.cssText =
              'position:fixed;width:100%;height:100%;top:0;left:0;right:0;bottom:0;' +
              'background-color:rgba(255,215,0,0.3);z-index:999999999999;pointer-events:none;';
            document.body.appendChild(div);
          }
        } else {
          if (existing) existing.remove();
        }
      },
      args: ['overlay4530', on],
    });
  });
});
