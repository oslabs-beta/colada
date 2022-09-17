// loaded by devtools-background.html, which is the the "background" page for the devtools-panel
// this is declared in manifest.json. note that this does not actually represent the UI, that is the devtools "panel") 

console.log("entered devtools-background.js")

chrome.devtools.panels.create('Colada DevTools', '', '../devtools-panel.html');

chrome.devtools.inspectedWindow.eval("sendMessage()",{useContentScriptContext: true}, () => {console.log("sent message to content script")});
