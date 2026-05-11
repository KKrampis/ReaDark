window.READARK = window.READARK || {};

window.READARK.THEMES = {
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
  solarized: {
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
  gruvbox: {
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
  rosepine: {
    name: 'Rosé Pine',
    group: 'dark',
    bg: '#191724', bg2: '#1f1d2e', bg3: '#26233a',
    text: '#e0def4', text2: '#6e6a86',
    accent: '#ebbcba', link: '#9ccfd8',
    border: '#403d52', input: '#1f1d2e', selection: '#403d52'
  },
  everforest: {
    name: 'Everforest Dark',
    group: 'dark',
    bg: '#2d353b', bg2: '#343f44', bg3: '#272e33',
    text: '#d3c6aa', text2: '#859289',
    accent: '#a7c080', link: '#7fbbb3',
    border: '#475258', input: '#343f44', selection: '#475258'
  },
  nightowl: {
    name: 'Night Owl',
    group: 'dark',
    bg: '#011627', bg2: '#0d2a3e', bg3: '#010e1a',
    text: '#d6deeb', text2: '#637777',
    accent: '#82aaff', link: '#7fdbca',
    border: '#1d3b53', input: '#0d2a3e', selection: '#1d3b53'
  },
  ayu: {
    name: 'Ayu Dark',
    group: 'dark',
    bg: '#0d1017', bg2: '#131721', bg3: '#080c11',
    text: '#bfbdb6', text2: '#3d424d',
    accent: '#e6b450', link: '#39bae6',
    border: '#1a1f29', input: '#131721', selection: '#273747'
  },
  palenight: {
    name: 'Palenight',
    group: 'dark',
    bg: '#292d3e', bg2: '#32374d', bg3: '#1c2030',
    text: '#a6accd', text2: '#676e95',
    accent: '#c792ea', link: '#89ddff',
    border: '#4a5068', input: '#32374d', selection: '#4a5068'
  },
  synthwave: {
    name: "Synthwave '84",
    group: 'dark',
    bg: '#262335', bg2: '#2a2139', bg3: '#1a1626',
    text: '#ffffff', text2: '#848bbd',
    accent: '#f97e72', link: '#36f9f6',
    border: '#495495', input: '#2a2139', selection: '#495495'
  },
};

window.READARK.buildThemeCSS = function(t) {
  const host = window.location.hostname;
  const skipDiv = host === 'docs.google.com' || host === 'sheets.google.com' ||
                  host === 'slides.google.com' || host === 'drive.google.com';

  // :not(#readark-x) boosts specificity to (1,0,1+), beating app class selectors with !important
  const X = ':not(#readark-x)';
  const bgTags = [
    'section','article','aside','main','header','footer','nav','form',
    'table','thead','tbody','tfoot','tr','th','td',
    'ul','ol','li','dl','dt','dd',
    'details','summary','figure','figcaption','dialog','menu'
  ];
  if (!skipDiv) bgTags.unshift('div');
  const bgSel = bgTags.map(tag => `${X} ${tag}`).join(',');

  const textTags = [
    'h1','h2','h3','h4','h5','h6','p','span','label','legend','caption',
    'blockquote','cite','q','strong','em','small','mark','del','ins',
    'sub','sup','time','address'
  ];
  const textSel = textTags.map(tag => `${X} ${tag}`).join(',');

  return `
html, body {
  background-color: ${t.bg} !important;
  color: ${t.text} !important;
}
${bgSel} {
  background-color: ${t.bg} !important;
  color: ${t.text} !important;
}
${textSel} {
  color: ${t.text} !important;
  background-color: transparent !important;
}
${X} a, ${X} a:link, ${X} a:visited { color: ${t.link} !important; }
${X} a:hover { opacity: 0.85 !important; }
${X} input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=color]),
${X} textarea, ${X} select {
  background-color: ${t.input} !important;
  color: ${t.text} !important;
  -webkit-text-fill-color: ${t.text} !important;
  border-color: ${t.border} !important;
}
${X} input:-webkit-autofill,
${X} input:-webkit-autofill:hover,
${X} input:-webkit-autofill:focus,
${X} textarea:-webkit-autofill,
${X} select:-webkit-autofill {
  -webkit-text-fill-color: ${t.text} !important;
  -webkit-box-shadow: 0 0 0px 1000px ${t.input} inset !important;
  caret-color: ${t.text} !important;
}
::placeholder { color: ${t.text2} !important; opacity: 0.8 !important; }
${X} button, ${X} [role=button],
${X} input[type=submit], ${X} input[type=button], ${X} input[type=reset] {
  background-color: ${t.bg2} !important;
  color: ${t.text} !important;
  -webkit-text-fill-color: ${t.text} !important;
  border-color: ${t.border} !important;
}
${X} code, ${X} pre, ${X} kbd, ${X} samp {
  background-color: ${t.bg2} !important;
  color: ${t.accent} !important;
  border-color: ${t.border} !important;
}
img, video, iframe, canvas, picture, svg { filter: none !important; }
${X} div:has(video), ${X} div:has(video) div { background-color: transparent !important; }
::selection { background-color: ${t.selection} !important; color: ${t.text} !important; }
::-webkit-scrollbar { background-color: ${t.bg2} !important; }
::-webkit-scrollbar-thumb { background-color: ${t.border} !important; border-radius: 4px !important; }
::-webkit-scrollbar-track { background-color: ${t.bg3} !important; }
hr { border-color: ${t.border} !important; background-color: ${t.border} !important; }
  `.trim();
};
