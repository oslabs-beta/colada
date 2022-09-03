// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: popupScript,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function popupScript() {
  console.log("running popupScript...");
  const store = document.body.querySelectorAll('script');
  console.log("logging store data from popup:", store);
  window.addEventListener("message", (event) => {
    if (event.data.source === "colada") {
      console.log('event received from plugin: ', event.data)
    }
  });
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}