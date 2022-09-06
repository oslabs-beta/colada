chrome.devtools.panels.create(
  'Colada DevTools',
  '',
  'devtools-panel.html',
  panel => {
    console.log('panel callback');
    panel.onShown.addListener(async () => {
      console.log("panelOnShown");
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: popupScript,
  });


// The body of this function will be executed as a content script inside the
// current page

    })
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

function popupScript() {
  console.log("running popupScript...");
  const store = document.body.querySelectorAll('script');
  console.log("logging store data from popup:", store);
  window.addEventListener("message", (event) => {
    if (event.data.source === "colada") {
      console.log('event received from plugin: ', event.data);
      chrome.storage.local.set({data: event.data.payload}, function() {
        console.log('Value is set to ' + event.data.payload);
      });

    }
  });
  // chrome.storage.sync.get("color", ({ color }) => {
  //   document.body.style.backgroundColor = color;
  };