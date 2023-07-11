import { ref } from 'vue'

export default class Steps {
  current = ref(null)
  history = ref([])
  flow = []

  constructor(current) {
    this.current.value = current
  }

  is(step) {
    return this.current.value === step
  }

  isAny(...steps) {
    return Boolean(steps.includes(this.current.value))
  }

  setFlow(array) {
    this.flow = array
  }

  next() {
    const index = this.flow.findIndex(this.getCurrent())

    const next = this.flow[index + 1]

    if (next) {
      this.set(next)

      return
    }

    throw Error(`No step defined after ${this.getCurrent()}`)
  }

  set(step) {
    this.current.value = step

    this.history.value.push(step)
  }

  previous() {
    this.history.value.pop()

    this.current.value = this.history.value[this.history.value.length - 1]
  }

  getCurrent() {
    return this.current.value
  }

  assign(steps) {
    Object.assign(this, steps)
  }
}
