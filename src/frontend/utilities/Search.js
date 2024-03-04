import { ref } from 'vue'
import axios from 'axios'
import LoadState from './LoadState'

export default class Search {
  state = new LoadState()

  result = ref([])

  value = ref(null)

  timeout = null

  options = {
    url: null,
    payload: null,
    field: null
  }

  constructor(options = {}) {
    Object.assign(this.options, options)
  }

  get getConfig() {
    return {
      data: this.result.value,
      field: this.options.field,
      modelValue: this.value.value
    }
  }

  static create(options) {
    return new Search(options)
  }

  getEvents({ searchPayloadFormatter = null } = {}) {
    return {
      'update:model-value': ($event) => {
        this.value.value = $event

        return this.search(searchPayloadFormatter)
      }
    }
  }

  search(searchPayloadFormatter) {
    const value = { value: this.value.value }

    const payload = searchPayloadFormatter
      ? searchPayloadFormatter(value)
      : value

    return this.customSearch({ payload })
  }

  async customSearch({ url, payload }) {
    if (this.timeout) {
      this.controller.abort()

      clearTimeout(this.timeout)
    }

    this.controller = new AbortController()

    this.timeout = setTimeout(async () => {
      this.state.loading()

      this.reset()

      const base = url || this.options.url

      const { data } = await axios
        .post(`${base}/search`, payload || this.options.payload, {
          signal: this.controller.signal
        })
        .catch((error) => {
          this.state.failed()

          throw error
        })

      this.result.value = data.result

      this.state.loaded()
    }, 500)
  }

  async restore(url, payload) {
    this.state.loading()

    this.reset()

    const base = url || this.options.url

    const { data } = await axios
      .post(`${base}/restore`, payload || this.options.payload)
      .catch((error) => {
        this.state.failed()

        throw error
      })

    this.state.loaded()

    return data
  }

  reset() {
    this.result.value = []
  }
}
