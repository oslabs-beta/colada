import { createApp } from "vue";
import { createPinia } from "pinia";
import Colada, {ColadaPiniaPlugin} from 'colada-plugin';
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia()
app.use(pinia);
pinia.use(ColadaPiniaPlugin)
app.use(Colada);
app.mount("#app");

