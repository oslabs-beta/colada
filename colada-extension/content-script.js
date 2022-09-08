function contentScript() {
  console.log("running injected content script...");
  
  function saveMessage(event) {
    if (event.data.source === "colada") {
      console.log('message received from plugin...');
      const date = Date.now().toString();
      chrome.storage.local.set({ [date] : event.data.payload}, () => {
        console.log('event data saved at key ', date)
      });
    }
  };

  window.addEventListener("message", saveMessage);
}

contentScript()

