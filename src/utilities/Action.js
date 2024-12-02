import { ref } from 'vue'
import axios from 'axios'

export default class Action {
  type = 'switch'
  field = ''
  url = ''
  processing = ref(null)
  target = ref(null)
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

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(target) : this.url

      this.processing.value = null

      this.target.value = null

      return await axios.patch(url, payload)
    } catch (error) {
      this.processing.value = null

      this.target.value = null

      this.error = error.response?.data?.message || error.message
    }
  }

  async delete(target) {
    this.target.value = target

    this.processing.value = target.id

    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const url = typeof this.url === 'function' ? this.url(target) : this.url

      return await axios.delete(url)
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.processing.value = null

      this.target.value = null

      return error
    }
  }

  async handle(target, value) {
    this.target.value = target

    try {
      this.processing.value = target.id

      const url = typeof this.url === 'function' ? this.url(target) : this.url

      const payload = {
        [this.field]: value
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await axios[this._method](url, payload)

      this.afterSuccess(target, value, response)
    } catch (error) {
      this.error = error.response?.data?.message || error.message

      this.afterFailure(target, value, error)
    }

    this.processing.value = null

    this.target.value = null
  }

  isProcessing(row) {
    return this.processing.value === row.id
  }
}
