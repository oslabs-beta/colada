chrome.devtools.panels.create(
  'Colada DevTools',
  '',
  'devtools-panel.html',
  panel => {
    console.log('panel callback')
  }
)