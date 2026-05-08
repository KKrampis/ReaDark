window.READARK = window.READARK || {};

window.READARK.THEMES = {
  none: {
    name: 'None (Disabled)',
    bg: null,
    group: 'dark'
  },

  // ── Dark themes ──────────────────────────────────────────────
  monokai: {
    name: 'Monokai',
    group: 'dark',
    bg: '#272822', bg2: '#3e3d32', bg3: '#1e1f1c',
    text: '#f8f8f2', text2: '#75715e',
    accent: '#a6e22e', link: '#66d9e8',
    border: '#555544', input: '#3e3d32', selection: '#49483e'
  },
  dracula: {
    name: 'Dracula',
    group: 'dark',
    bg: '#282a36', bg2: '#44475a', bg3: '#1e1f29',
    text: '#f8f8f2', text2: '#6272a4',
    accent: '#bd93f9', link: '#8be9fd',
    border: '#44475a', input: '#44475a', selection: '#44475a'
  },
  onedark: {
    name: 'One Dark',
    group: 'dark',
    bg: '#282c34', bg2: '#21252b', bg3: '#1b1f23',
    text: '#abb2bf', text2: '#5c6370',
    accent: '#61afef', link: '#56b6c2',
    border: '#3e4451', input: '#2c313a', selection: '#3e4451'
  },
  solarizeddark: {
    name: 'Solarized Dark',
    group: 'dark',
    bg: '#002b36', bg2: '#073642', bg3: '#001e26',
    text: '#839496', text2: '#586e75',
    accent: '#268bd2', link: '#2aa198',
    border: '#073642', input: '#073642', selection: '#0d3b47'
  },
  nord: {
    name: 'Nord',
    group: 'dark',
    bg: '#2e3440', bg2: '#3b4252', bg3: '#242933',
    text: '#d8dee9', text2: '#4c566a',
    accent: '#88c0d0', link: '#81a1c1',
    border: '#4c566a', input: '#3b4252', selection: '#434c5e'
  },
  gruvboxdark: {
    name: 'Gruvbox Dark',
    group: 'dark',
    bg: '#282828', bg2: '#3c3836', bg3: '#1d2021',
    text: '#ebdbb2', text2: '#928374',
    accent: '#b8bb26', link: '#83a598',
    border: '#504945', input: '#3c3836', selection: '#504945'
  },
  material: {
    name: 'Material Dark',
    group: 'dark',
    bg: '#212121', bg2: '#303030', bg3: '#191919',
    text: '#eeffff', text2: '#546e7a',
    accent: '#80cbc4', link: '#82aaff',
    border: '#37474f', input: '#2d2d2d', selection: '#455a64'
  },
  tokyonight: {
    name: 'Tokyo Night',
    group: 'dark',
    bg: '#1a1b26', bg2: '#24283b', bg3: '#16161e',
    text: '#a9b1d6', text2: '#565f89',
    accent: '#7aa2f7', link: '#73daca',
    border: '#364a82', input: '#24283b', selection: '#364a82'
  },
  catppuccin: {
    name: 'Catppuccin Mocha',
    group: 'dark',
    bg: '#1e1e2e', bg2: '#313244', bg3: '#181825',
    text: '#cdd6f4', text2: '#585b70',
    accent: '#cba6f7', link: '#89dceb',
    border: '#45475a', input: '#313244', selection: '#45475a'
  },
  githubdark: {
    name: 'GitHub Dark',
    group: 'dark',
    bg: '#0d1117', bg2: '#161b22', bg3: '#010409',
    text: '#c9d1d9', text2: '#8b949e',
    accent: '#58a6ff', link: '#58a6ff',
    border: '#30363d', input: '#0d1117', selection: '#1f6feb'
  },

  // ── E-Ink themes ──────────────────────────────────────────────
  eink: {
    name: 'E-Ink',
    group: 'eink',
    bg: '#f0f0f0', bg2: '#e0e0e0', bg3: '#d0d0d0',
    text: '#111111', text2: '#444444',
    accent: '#333333', link: '#1a1a8c',
    border: '#bbbbbb', input: '#e8e8e8', selection: '#c0c0c0'
  },
  einkwarm: {
    name: 'E-Ink Warm',
    group: 'eink',
    bg: '#f5edd8', bg2: '#ede0c4', bg3: '#e2d4b8',
    text: '#2c1f14', text2: '#6b5a48',
    accent: '#6b3a1f', link: '#1a3a7a',
    border: '#c8b89a', input: '#ede0c4', selection: '#d4c4a8'
  }
};

window.READARK.buildThemeCSS = function(t) {
  return `
html, body,
div, section, article, aside, main, header, footer, nav, form,
table, thead, tbody, tfoot, tr, th, td,
ul, ol, li, dl, dt, dd,
details, summary, figure, figcaption, dialog, menu {
  background-color: ${t.bg} !important;
  color: ${t.text} !important;
}
h1, h2, h3, h4, h5, h6, p, span, label, legend, caption,
blockquote, cite, q, strong, em, small, mark, del, ins, sub, sup, time, address {
  color: ${t.text} !important;
  background-color: transparent !important;
}
a, a:link, a:visited { color: ${t.link} !important; }
a:hover { opacity: 0.85 !important; }
input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]),
textarea, select {
  background-color: ${t.input} !important;
  color: ${t.text} !important;
  -webkit-text-fill-color: ${t.text} !important;
  border-color: ${t.border} !important;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: ${t.text} !important;
  -webkit-box-shadow: 0 0 0px 1000px ${t.input} inset !important;
  caret-color: ${t.text} !important;
}
::placeholder { color: ${t.text2} !important; opacity: 0.8 !important; }
button, [role=button], input[type=submit], input[type=button], input[type=reset] {
  background-color: ${t.bg2} !important;
  color: ${t.text} !important;
  -webkit-text-fill-color: ${t.text} !important;
  border-color: ${t.border} !important;
}
code, pre, kbd, samp {
  background-color: ${t.bg2} !important;
  color: ${t.accent} !important;
  border-color: ${t.border} !important;
}
img, video, iframe, canvas, picture { filter: none !important; }
::selection { background-color: ${t.selection} !important; color: ${t.text} !important; }
::-webkit-scrollbar { background-color: ${t.bg2} !important; }
::-webkit-scrollbar-thumb { background-color: ${t.border} !important; border-radius: 4px !important; }
::-webkit-scrollbar-track { background-color: ${t.bg3} !important; }
hr { border-color: ${t.border} !important; background-color: ${t.border} !important; }
  `.trim();
};
