import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Vision from '../../src/main'

const app = createApp(App)

app.use(Vision)

app.mount('#app')
