import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Vision from '../../src/frontend/main'

const app = createApp(App)

app.use(Vision)

app.mount('#app')
