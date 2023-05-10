import { ref } from 'vue'
import axios from 'axios'
import LoadState from './LoadState'

export default class Search {
  state = new LoadState

  result = ref([])

  timeout = null

  options = {
    url: null,
    payload: null,
    field: null
  }

  constructor (options = {}) {
    Object.assign(this.options, options)
  }

  static create (options) {
    return new Search(options)
  }

  search (value) {
    return this.customSearch({ payload: { value } })
  }

  async customSearch ({ url, payload }) {
    if(this.timeout){
      this.controller.abort()

      clearTimeout(this.timeout)
    }

    this.controller = new AbortController();

    this.timeout = setTimeout(async () => {
      this.state.loading()

      this.result.value = []

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

  async restore (url, payload) {
    this.state.loading()

    this.result.value = []

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

  getConfig () {
    return {
      data: this.result.value,
      field: this.options.field
    }
  }
}
