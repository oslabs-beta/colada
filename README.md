# colada

```
git clone <this repo>
cd colada
```
Once you are in the Colada directory, you can navigate to the following directories:

# colada-extension

A Chrome Devtool extension
```
cd colada-extension
npm install
```

# colada-plugin
```
cd colada-plugin
npm install
npm run dev
```
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
```

# demo-project
```
cd demo-project
npm install
npm install ../colada-plugin
npm run dev
```
