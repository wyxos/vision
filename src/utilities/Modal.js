import {ref} from 'vue'

export default class Modal {
    state = ref(false)

    get isVisible() {
        return this.state
    }

    static create() {
        return new Modal()
    }

    show() {
        this.state = true
    }

    hide() {
        this.state = false
    }
}
