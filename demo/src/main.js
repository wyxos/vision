import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { OrugaConfig } from '@oruga-ui/oruga-next'
import '@oruga-ui/theme-oruga/dist/oruga.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Configure axios for demo purposes
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

// Configure Oruga to use Font Awesome
OrugaConfig.iconPack = 'fas'

// Create and mount the Vue application
const app = createApp(App)
app.use(OrugaConfig)
app.mount('#app')
