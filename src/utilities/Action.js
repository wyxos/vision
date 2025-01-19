import { ref } from 'vue'
import axios from 'axios'

export default class Action {
  url = ''
  processing = ref(null)
  onBeforeCallback = null
  onSuccessCallback = null
  error = null

  constructor(url) {
    this.url = url
  }

  static create(url) {
    return new this(url)
  }

  async get(params) {
    const key = this.keyResolver ? this.keyResolver(params) : null

    this.processing.value = key || true

    // Run before action callback and check if we should proceed
    if (this.onBeforeCallback && this.onBeforeCallback(params) === false) {
      this.processing.value = null

      return
    }

    try {
      const url = typeof this.url === 'function' ? this.url(params) : this.url

      return axios
        .get(url, {
          params
        })
        .then((response) => {
          this.processing.value = false

          if (this.onSuccessCallback) {
            this.onSuccessCallback(response)
          }

          return response
        })
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.processing.value = false

      if (this.onFailCallback) {
        return this.onFailCallback(error)
      }

      return error
    }
  }

  async patch(payload) {
    const key = this.keyResolver ? this.keyResolver(payload) : null

    this.processing.value = key || true

    // Run before action callback and check if we should proceed
    if (this.onBeforeCallback && this.onBeforeCallback(payload) === false) {
      this.processing.value = null

      return
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(payload) : this.url

      this.processing.value = false

      return axios.patch(url, payload).then((response) => {
        this.processing.value = false

        if (this.onSuccessCallback) {
          this.onSuccessCallback(response)
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
    if (this.onBeforeCallback && this.onBeforeCallback(payload) === false) {
      this.processing.value = false

      return
    }

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(payload) : this.url

      return axios.delete(url).then((response) => {
        this.processing.value = false

        if (this.onSuccessCallback) {
          this.onSuccessCallback(response)
        }

        return response
      })
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.processing.value = false

      return error
    }
  }

  onBefore(callback) {
    this.onBeforeCallback = callback

    return this
  }

  onSuccess(callback) {
    this.onSuccessCallback = callback

    return this
  }

  onFail(callback) {
    this.onFailCallback = callback

    return this
  }

  isProcessing(key) {
    return this.processing.value === key
  }

  withKey(resolver) {
    this.keyResolver = resolver
    return this
  }
}
