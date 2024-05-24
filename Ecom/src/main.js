import './assets/main.css'
import 'primevue/resources/themes/aura-light-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import VuePapaParse from 'vue-papa-parse'
import Papa from "papaparse";

const app = createApp(App)
app.use(PrimeVue);
app.use(ToastService);
app.use(VuePapaParse)
app.mount('#app');
app.component('Toast', Toast);
