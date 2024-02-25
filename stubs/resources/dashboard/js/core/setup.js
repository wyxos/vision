import '../bootstrap';
import '../../css/app.css'
import {createApp} from 'vue'
import plugins from "../plugins"
import components from '../components'

export default function setup(element) {
    const app = createApp(element)

    plugins(app)

    components(app)

    app.mount('#app');
}
