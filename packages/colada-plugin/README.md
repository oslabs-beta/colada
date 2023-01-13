## How to add Colada to your Vue app...
```
//main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Colada, { PiniaColadaPlugin } from 'colada-plugin';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(PiniaColadaPlugin);
app.use(Colada);

app.mount('#app');
