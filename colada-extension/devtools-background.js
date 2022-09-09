// loaded by devtools-background.html, which is the the "background" page for the devtools-panel
// this is declared in manifest.json. note that this does not actually represent the UI, that is the devtools "panel") 

chrome.devtools.panels.create('Colada DevTools', '', 'devtools-panel.html');
