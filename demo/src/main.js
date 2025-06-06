import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import '@oruga-ui/theme-oruga/dist/oruga.css'

// Configure axios for demo purposes
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

// Create and mount the Vue application
createApp(App).mount('#app')
