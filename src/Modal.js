import { ref } from 'vue'

export default class Modal {
  state = ref(false)

  show() {
    this.state.value = true
  }

  get isVisible() {
    return this.state.value
  }

  hide() {
    this.state.value = false
  }

  static create() {
    return new Modal()
  }
}
