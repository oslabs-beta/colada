

// import {initDevTools} from './app-frontend/src/main.js'

// initDevTools()
//The above two lines of code are an attempt to import a Vue app to use as out front end in the Chrome dev tool





function getMessage() {
let msgDisplay = document.getElementById("message");
let message = document.createElement("div");
const paragraph = document.createElement('p')

chrome.storage.local.get(null, function(result) {

  // let text = "";

  // for (let key of Object.keys(result)) {

  //   text += result[key]["key"] + '\n';

  // }

  // paragraph.textContent = text
  // msgDisplay.appendChild(paragraph);
  message.innerText = JSON.stringify(result);
  msgDisplay.appendChild(message);
})
}


getMessage();





const stepBackBtn = document.getElementById('step-back')
const stepForwardBtn = document.getElementById('step-forward')

stepBackBtn.addEventListener('click', () => {
  console.log('step back btn pressed')
})

stepForwardBtn.addEventListener('click', () => {
  console.log('step forward btn pressed')
})