import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './assets/styles/main.css'; // Import main.css


store.dispatch('loadParticipantID')


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
