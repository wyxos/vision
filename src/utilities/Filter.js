import { reactive, ref } from 'vue'

export default class Filter {
  visibility = ref(false)

  applied = []

  constructor(query) {
    query = {
      page: 1,
      ...query
    }

    this.original = query

    this.query = reactive({
      ...query
    })
  }

  get isVisible() {
    return this.visibility.value
  }

  get isDirty() {
    return JSON.stringify(this.query) !== JSON.stringify(this.original)
  }

  show() {
    this.visibility.value = true
  }

  hide() {
    this.visibility.value = false
  }

  toggle() {
    this.visibility.value = !this.visibility.value
  }

  render() {
    return this.applied
  }

  reset() {
    this.query = reactive({
      ...this.original
    })
  }

  clear(key, callback) {
    if (key) {
      this.query[key] = this.original[key]
    } else {
      this.query = reactive({
        ...this.original
      })
    }

    if (callback) {
      callback()
    }
  }

  getAppliedQuery() {
    const output = {}
    this.applied.forEach((item) => {
      output[item.key] = item.rawValue
    })

    return output
  }

  isDefault(key) {
    return this.original[key] === this.query[key]
  }
}
