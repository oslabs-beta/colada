// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


// chrome.runtime.onMessage.addListener( () => {

//   console.log("reachedOnMessage");

//   const store = document.body.querySelectorAll('script');
//   chrome.storage.local.set({store: store});
//   console.log("store",store);

// });

// console.log("background.js", document.body);

chrome.runtime.onMessage.addListener( async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: getStore,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function getStore() {
  console.log("enteredScript");
  const store = document.body.querySelectorAll('script');
  console.log("foundStore22", store);
 
  }

