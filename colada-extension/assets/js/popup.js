// not in use, just saved as an example
//
// window.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     func: () => {},
// });
// });
console.log('test1');
import {createApp} from 'vue';
console.log('test2');
import App from '../../app-frontend/src/App.vue';
import router from '../../app-frontend/src/router';

console.log('test3');

// const app = new Vue({
//   el: '#app',
//   render: creatElement => createElement(Popup)
// })

const app = createApp(App);
app.use(router);
app.mount('#app');