import { ref } from 'vue'
import axios from 'axios'

export default class Action {
  type = 'switch'
  field = ''
  url = ''
  processing = ref(null)
  target = ref(null)
  beforeCallback = null
  afterCallback = null
  error = null

  constructor(url) {
    this.url = url
  }

  static create(url) {
    return new this(url)
  }

  async patch(target, payload) {
    this.target.value = target

    this.processing.value = target.id

    // Run before action callback and check if we should proceed
    if (this.beforeCallback && this.beforeCallback(target, payload) === false) {
      this.processing.value = null
      this.target.value = null
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(target) : this.url

      this.processing.value = null

      this.target.value = null

      return await axios.patch(url, payload).then((response) => {
        this.processing.value = null

        this.target.value = null

        if (this.afterCallback) {
          this.afterCallback(response)
        }

        return response
      })
    } catch (error) {
      this.processing.value = null

      this.target.value = null

      this.error = error.response?.data?.message || error.message
    }
  }

  async delete(target) {
    this.target.value = target

    this.processing.value = target.id

    // Run before action callback and check if we should proceed
    if (this.beforeCallback && this.beforeCallback(target) === false) {
      this.processing.value = null
      this.target.value = null
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(target) : this.url

      return axios.delete(url).then((response) => {
        this.processing.value = null

        this.target.value = null

        if (this.afterCallback) {
          this.afterCallback(response)
        }

        return response
      })
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.processing.value = null

      this.target.value = null

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

  isProcessing(row) {
    return this.processing.value === row.id
  }
}
