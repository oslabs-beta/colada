import {createApp} from 'vue';
import App from './app-frontend/src/App.vue';
import router from './app-frontend/src/router';

const app = createApp(App);
app.use(router);
app.mount('#app');



