chrome.devtools.panels.create(
  'Colada DevTools',
  '',
  'devtools-panel.html',
  panel => {
    console.log('panel callback')
  }
);

chrome.runtime.sendMessage(

  {
    message: "startListeners"
  },

  () => {
    console.log("sentMessage")
  }

);