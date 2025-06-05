import { createApp } from 'vue'
import App from './App.vue'
import Vision from '../../src/main'

import '@oruga-ui/oruga-next/dist/oruga-full.css'

const app = createApp(App)
app.use(Vision)
app.mount('#app')
