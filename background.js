document.addEventListener('DOMContentLoaded', () => {
  const THEMES = window.READARK.THEMES;
  const container = document.getElementById('themeContainer');

  const groups = [
    { key: 'dark', label: 'Dark Themes' },
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
    chrome.storage.sync.set({ theme: key });
    highlightTheme(key);
  });
});
