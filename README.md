# colada

```
git clone <this repo>
cd colada
```
Once you are in the Colada directory, you can navigate to the following directories:

# colada-extension

There are two ways to install the Colada Chrome extension:

## Install from the Chrome Web Store (Coming Soon!)
1. Navigate to [Colada on the Chrome Web Store](https://chrome.google.com/webstore/category/extensions), and click "Add to Chrome"

## Install from source

1.
```
cd colada-extension
npm install
npm run build
```
2. This will create a new `/dist` directory in `/colada-extension`
3. In Chrome, navigate to [chrome://extensions](chrome://extensions).
4. In the top right of the Extensions page, there is a toggle for "Developer Mode." Make sure this is toggled **ON**.
5. On the top left of the page, select "Load Unpacked", and select the `colada/colada-extension/dist` directory.

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
