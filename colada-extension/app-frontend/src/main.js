import { createApp } from "vue";
import App from "./App.vue";


// const app = createApp(App);
// app.mount("#app");

export async function initDevTools(){
    const app = createApp(App)
    app.mount('#app')
}
