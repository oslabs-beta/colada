"use strict"

async function onShownListener() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: devPanelScript,
  });
};

// function messageListener(event) {
//   if (event.data.source === "colada") {
//     console.log('message received from plugin...');
//     const date = Date.now().toString();
//     chrome.storage.local.set({ [date] : event.data.payload}, () => {
//       console.log('event data saved at key ', date)
//     });

//   }
// }

chrome.devtools.panels.create(
  'Colada DevTools',
  '',
  'devtools-panel.html',
  () => {
    console.log("panel created at", new Date());
    onShownListener();
  }
);

function devPanelScript() {
  console.log("running injected devPanelScript...");

  function ping() {
    chrome.runtime.sendMessage('ping', response => {
      if (chrome.runtime.lastError) {
        console.log('trying to connect to chrome runtime again')
        setTimeout(ping, 1000);
      } else {
        console.log('no more runtime last error')
        chrome.runtime.onDisconnect.addListener(handleDisconnect) 
      }
    });
  }
  
  ping();

  function messageListener(event) {
    if (event.data.source === "colada") {
      console.log('message received from plugin...');
      const date = Date.now().toString();
      chrome.storage.local.set({ [date] : event.data.payload}, () => {
        console.log('event data saved at key ', date);
        console.log('event.data.payload: ', event.data.payload)
      });
      // chrome.storage.local.set(event.data.payload, () => {
      //   console.log('event data saved at key ', date);
      //   console.log('event.data.payload: ', event.data.payload)
      // });
    }
  };

  function handleDisconnect() {
    console.log('handle disconnect')
    window.removeEventListener("message", messageListener);
  }

  window.addEventListener("message", messageListener);
  
  }

  