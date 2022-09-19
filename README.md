
<p align="center">
  <a href="" target="_blank">
    <img width="180" src="https://pinia.vuejs.org/logo.svg" alt="Colada logo">
  </a>
</p>
<br/>
<p align="center">
  <!--TODO: update img src and href's below once our app is live-->
  <a href="https://opensource.org/licenses/MIT"><img src="https://badgen.net/badge/license/MIT/green" alt="license MIT"></a>
  <a href="https://npmjs.com/package/pinia"><img src="https://badgen.net/npm/v/pinia" alt="npm package"></a>
  <a href="https://chrome.google.com/webstore/category/extensions"><img src="https://badgen.net/chrome-web-store/v/ckkdlimhmcjmikdlpkmbgfkaikojcbjk" alt="chrome web store"></a>
  <a href="https://www.typescriptlang.org/docs/"><img src="https://badgen.net/badge/icon/typescript?icon=typescript&label" alt="typescript"></a>

</p>
<br/>

# What is Colada? 

## *The perfect companion for [Pinia](https://pinia.vuejs.org/ "Pinia homepage and documentation")*
<br/>

## Colada offers a suite of developer tools for helping you manage Pinia state, including:
- A [Chrome DevTool Extension]()
- An [NPM package]() that serves as a Plugin for the [Vue DevTool]()

<br/>

## Core Features

- 🕰️ Time travel debugging 
- 
- 

<br/>
<br/>

# Getting Started

## Installation

## How to Use Colada

# colada

```
git clone <this repo>
cd colada
```
Once you are in the Colada directory, you can navigate to the following directories:

<br/>
<br/>

# colada-extension

A Chrome Devtool extension
```
cd colada-extension
npm install
npm run dev
```
Navigate to chrome://extensions in browser, select "Load Unpacked", load colada-extension/dist from your colada directory

<br/>
<br/>

# colada-plugin
```
cd colada-plugin
npm install
npm run dev
```

<br/>
<br/>

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

<br/>
<br/>

# demo-project
```
cd demo-project
npm install
npm install ../colada-plugin
npm run dev
```
