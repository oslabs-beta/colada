

function contentScript() {
  console.log("running injected content script...");

  
  function saveMessage(event) {
    const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : ''
    console.log('PARSED:', parsed);
    if (parsed && parsed.source === "colada") {
      console.log('message received from plugin...test');
      const date = parsed.payload.timestamp;
      chrome.storage.local.set({ [date] : parsed.payload}, () => {
        console.log('event data saved at key ', date)
      });
    }
  };

  window.addEventListener("message", saveMessage);
}

contentScript()

