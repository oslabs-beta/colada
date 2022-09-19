import {createApp} from 'vue';
import App from '../../app-frontend/src/App.vue';
import router from '../../app-frontend/src/router';

const app = createApp(App);
app.use(router);
app.mount('#app');

// chrome.devtools.inspectedWindow.eval("sendMessage()",{useContentScriptContext: true}, () => {console.log("sent message to content script")});

// chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, {source: "devtoolsPanel", payload: "test"})


