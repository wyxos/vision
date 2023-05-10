import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import Oruga from '@oruga-ui/oruga-next'

const app = createApp(App)

app.use(Oruga, { iconPack: 'fas' })

app.mount('#app')
