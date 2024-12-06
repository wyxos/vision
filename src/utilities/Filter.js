import { reactive, ref } from 'vue'

export default class Filter {
  visibility = ref(false)

  applied = {}

  constructor(query) {
    this.original = query

    this.query = reactive({
      page: 1,
      perPage: 10,
      ...query
    })
  }

  get isVisible() {
    return this.visibility.value
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
      page: 1,
      perPage: 10,
      ...this.original
    })
  }

  clear(key, callback) {
    if (key) {
      this.query[key] = this.original[key]
    } else {
      this.query = reactive({
        page: 1,
        perPage: 10,
        ...this.original
      })
    }

    if (callback) {
      callback()
    }
  }
}
