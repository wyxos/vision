import { ref } from 'vue'
import axios from 'axios'

export default class Action {
  url = ''
  processing = ref(null)
  beforeCallback = null
  afterCallback = null
  error = null

  constructor(url) {
    this.url = url
  }

  static create(url) {
    return new this(url)
  }

  async patch(payload) {
    const key = this.keyResolver ? this.keyResolver(payload) : null

    this.processing.value = key || true

    // Run before action callback and check if we should proceed
    if (this.beforeCallback && this.beforeCallback(payload) === false) {
      this.processing.value = null

      return
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(payload) : this.url

      this.processing.value = false

      return axios.patch(url, payload).then((response) => {
        this.processing.value = false

        if (this.afterCallback) {
          this.afterCallback(response)
        }

        return response
      })
    } catch (error) {
      this.processing.value = false

      this.error = error.response?.data?.message || error.message
    }
  }

  async delete(payload) {
    const key = this.keyResolver ? this.keyResolver(payload) : null

    this.processing.value = key || true

    // Run before action callback and check if we should proceed
    if (this.beforeCallback && this.beforeCallback(payload) === false) {
      this.processing.value = false

      return
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(payload) : this.url

      return axios.delete(url).then((response) => {
        this.processing.value = false

        if (this.afterCallback) {
          this.afterCallback(response)
        }

        return response
      })
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.processing.value = false

      return error
    }
  }

  before(callback) {
    this.beforeCallback = callback

    return this
  }

  after(callback) {
    this.afterCallback = callback

    return this
  }

  isProcessing(key) {
    return this.processing.value === key
  }

  setKeyResolver(resolver) {
    this.keyResolver = resolver
    return this
  }
}
