(() => {
  function saveMessage(event) {
    const parsed = typeof event.data === 'string' ? JSON.parse(event.data) : '';
    if (parsed && parsed.source === 'colada') {
      const date = Object.keys(parsed.payload)[0];
      chrome.storage.local.set({ [date]: parsed.payload }, () => { });
    }
  }
  window.addEventListener('message', saveMessage);
  window.addEventListener('load', () => { chrome.storage.local.clear(); });
  chrome.runtime.onMessage.addListener((message) => {
    if (message.source === 'colada-extension') {
      window.postMessage(JSON.stringify(message), window.location.href);
    }
  });
})();