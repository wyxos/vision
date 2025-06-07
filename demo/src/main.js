import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import { useOruga } from '@oruga-ui/oruga-next'
import '@oruga-ui/theme-oruga/dist/oruga.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import router from './router'

// Configure axios for demo purposes
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

// Create and mount the Vue application
const app = createApp(App)

// Configure Oruga
const config = {
  iconPack: "fas",
  button: {
    override: true,
    rootClass: 'btn',
    roundedClass: 'btn-rounded'
  }
}

// Initialize Oruga with the config
app.use(useOruga, config)

app.use(router)
app.mount('#app')
