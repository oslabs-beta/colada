function getMessage() {
let msgDisplay = document.getElementById("message");
let message = document.createElement("div");

chrome.storage.local.get(null, function(result) {

  message.innerText = JSON.stringify(result);
  msgDisplay.appendChild(message);
})
}


getMessage();