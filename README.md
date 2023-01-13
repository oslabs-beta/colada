
<p align="center">
  <a href="https://colada.dev/" target="_blank">
  <!--TODO: update img src and href's below once our app is live and make sure that the links open in a new tab-->
    <img width="300" src="https://colada.dev/assets/Colada.b6cd244a.png" alt="Colada logo">
  </a>
</p>
<br/>
<p align="center">
  <!--TODO: update img src and href's below once our app is live and make sure that the links open in a new tab-->
  <a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://badgen.net/badge/license/MIT/green" alt="license MIT"></a>
  <a href="https://npmjs.com/package/colada-plugin" target="_blank"><img src="https://badgen.net/npm/v/colada-plugin" alt="npm package"></a>
  <a href="https://chrome.google.com/webstore/detail/colada-devtools/icdbaobbeemmhlmjolbkedcneadkfpdl" target="_blank"><img src="https://badgen.net/chrome-web-store/v/icdbaobbeemmhlmjolbkedcneadkfpdl" alt="chrome web store"></a>
  <a href="https://www.typescriptlang.org/docs/" target="_blank"><img src="https://badgen.net/badge/icon/typescript?icon=typescript&label" alt="typescript"></a>

</p>
<br/>

# What is [Colada](https://colada.dev/)?

## *Time-travel debugging for [Pinia🍍](https://pinia.vuejs.org/ "Pinia homepage and documentation"), Vue's official state management library*
<br/>

## Colada offers a suite of tools for Vue developers working with the [Pinia state management library](https://pinia.vuejs.org/):
1. [Chrome DevTool Extension](https://chrome.google.com/webstore/detail/colada-devtools/icdbaobbeemmhlmjolbkedcneadkfpdl)
2. [NPM package](https://www.npmjs.com/package/colada-plugin) that serves as a [plugin](https://devtools.vuejs.org/plugin/plugins-guide.html) for the [Vue.js DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) Chrome Extension
3. [Pinia🍍](https://pinia.vuejs.org/) plugin to directly access and mutate your app's store

<br/>

## Core Features

- ✅  Minimal installation and automatic detection of Vue app in [Vue.js DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- 🔄  Direct integration into [Vue.js DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en), so developers can use Colada without leaving their existing devtool configuration
  - 🕰️  Time travel debugging
  - 🔎  Inspector panel for viewing Pinia state within your Vue app
- 💻  A [Chrome DevTool Extension](https://chrome.google.com/webstore/detail/colada-devtools/icdbaobbeemmhlmjolbkedcneadkfpdl) providing enhanced features, including: 
  - 🕰️  Time travel debugging
  - 🔎  Inspector panel for viewing Pinia state within your Vue app

<br/>


<img width="600px" src="https://camo.githubusercontent.com/c3ebc90c193b526add0ea2d7999906ebd1e4e5a8e07765dd3f29bbaddd1042da/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f763055564d336c4643305464514d375a476b2f67697068792e676966" alt="demo screenshot" />

<br/>
<br/>

# Getting Started

## Installation: **Vue DevTools Plugin**
0. Ensure the [Vue.js DevTools Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) is installed
1. Install the [Colada npm package](https://www.npmjs.com/package/colada-plugin) in your app's root directory
```bash
npm install colada-plugin --save-dev
```

2. Add Colada to your Vue app
```js
// main.js

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import Colada Plugin
import Colada, { PiniaColadaPlugin } from 'colada-plugin';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(PiniaColadaPlugin);
app.use(Colada);

app.mount('#app');
```
<br/>

## Installation: **Chrome DevTools Extension**

### *NOTE: Ensure the [Vue.js DevTools Chrome Extension](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en) is installed before installing the Colada DevTool Chrome Extension*
<br/>

### There are two ways to install the Colada Chrome Extension:


### 1. **Install from the Chrome Web Store (Recommended)**
1. Navigate to [Colada on the Chrome Web Store](https://chrome.google.com/webstore/detail/colada-devtools/icdbaobbeemmhlmjolbkedcneadkfpdl), and click "Add to Chrome"

<a href="https://chrome.google.com/webstore/detail/colada-devtools/icdbaobbeemmhlmjolbkedcneadkfpdl" target="_blank"><img width="200px" src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/mPGKYBIR2uCP0ApchDXE.png" alt="demo screenshot" /></a>

### 2. **Install from source**

1. Clone this repository
2. Run the following commands from the repository root
```
npm install
npm run build:chrome-ext
```
3. This will create a new `/dist` directory in `/colada-extension`
4. In Chrome, navigate to [chrome://extensions](chrome://extensions).
5. In the top right of the Extensions page, there is a toggle for "Developer Mode." Make sure this is toggled **ON**.
6. On the top left of the page, select "Load Unpacked", and select the `colada/colada-extension/dist` directory.

<br/>
<br/>

# How to Use Colada

## Using the Colada **Vue DevTools Plugin**
- Navigate to the Vue.js DevTools
<br/>

### **Time Travel Debugging**
- Select the "Colada" timeline in the timeline view 
- Turn off screenshots <br/>
<img width=600px src="https://user-images.githubusercontent.com/40417991/191641371-1987ad2a-ca47-4fea-8ed9-8513e4158224.png">
- Changes in your app's store and state will automatically be tracked on the timeline
- Click on timeline events to travel through time and update your app's state
<br/><br/>

### **Inspector Panel** - View Your App's Stores and State in Real Time
- Select "Colada" in the component menu drop down
- Click on your Pinia store to view state, actions, and getters updated in real time
<br/>
<img width=800px src="https://user-images.githubusercontent.com/40417991/191645124-67f347a7-e89e-479f-b123-fb56e68d0c7f.png">


<br/>
<hr/>
<br/>

## Using the Colada **Chrome DevTool Extension**
- Navigate to Colada DevTools in Chrome 
<br/>
<img width=400px src="https://github.com/oslabs-beta/colada/blob/dev/colada-extension/public/assets/chrome-dev-tools.png?raw=true">

- Changes in your app's store and state will automatically be tracked on the timeline
- Click on a timestamp or use the arrows to travel through time and update your app's state
- View your app's state as you time travel in the inspector panel on the right
<br>
<img width=1000px src="https://user-images.githubusercontent.com/34523493/191632172-9a2615f9-ac85-4c26-9bcc-14435014c8e1.png">

<br/>
<br/>

# How to Give Colada a Test Run With Our Demo App

1. Clone this repository
2. Run the following commands from the repository root:

```bash
npm install
npm run dev
```

This will trigger the following: 
* Build Chrome Extension (in watch mode, so any changes to the source will trigger a rebuild)
* Build Pinia/Vue Devtools plugin (in watch mode, so any changes to the source will trigger a rebuild)
* Launch dev instance of a test Vue/Pinia application, with Pinia/Vue Devtools plugin installed (any plugin re-builds will be hot-reloaded)
* Launch test instance of Chrome with Colada Extension and Vue Devtools installed (see section below on Vue Devtools extension) and loads local Vue/Pinia application
  * Note: Re-building the Chrome extension generally requires reloading DevTools (by closing and re-opening the panel) in order to reflect any changes. However, some changes (such as edits to content scripts or manifest.json) require fully reloading the extension from [chrome://extensions](chrome://extensions).

3. Interact with the app to watch the app's state update in real-time!

<br/>
<br/>

### Using Vue Devtools in the Chrome test instance
(Note that the following is optional, and probably unnecessary unless you are developing the plugin!) In order to use the Vue Devtools extension in your local Chrome testing instance, we need to provide the unpacked source of the Vue DevTools extension. See [here](https://gist.github.com/paulirish/78d6c1406c901be02c2d) for several options for getting the extension source. Create a `.env` file in the repository root with the value `'VUE_DEVTOOLS_PATH=[full path to unpacked extension]'`.


# Contributing and Issues
Interested in conributing to Colada? Reach out to our [core team](https://colada.dev/#contributors) <br/>
Feature requests or issues/bugs to report? [Let us know!](https://github.com/oslabs-beta/colada/issues)

<br/>

# Release Notes
## Contributors
- Parker Steinberg • [LinkedIn](https://www.linkedin.com/in/parker-steinberg/) • [Github](https://github.com/parkersteinberg)
- Jonathan Chen • [LinkedIn](https://www.linkedin.com/in/jonathan-hp-chen/) • [Github](https://github.com/JonHPC)
- Vaughn Sulit • [LinkedIn](https://www.linkedin.com/in/bvaughnsulit/) • [Github](https://github.com/bvaughnsulit)
- Dan Steinbrook • [LinkedIn](https://www.linkedin.com/in/daniel-steinbrook/) • [Github](https://github.com/dsteinbrook)

<br/>
0.1.1 | Initial release of Colada, more to come!


<br/>

# License
[MIT](http://opensource.org/licenses/MIT)
