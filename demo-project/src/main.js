import { createApp } from "vue";
import { createPinia } from "pinia";
import Colada from 'colada-plugin';
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(Colada);
app.mount("#app");
