import { reactive } from 'vue'

export default class FormErrors {
  constructor() {
    this.errors = reactive({
      default: []
    })
  }

  static create() {
    return new FormErrors()
  }

  createBag(bag) {
    if (!this.errors[bag]) {
      this.errors[bag] = []
    }

    return this
  }

  set(error, bag = 'default') {
    const hasValidationErrors =
      error.response && error.response.data && error.response.data.errors

    if (!hasValidationErrors) {
      throw error
    }

    this.errors[bag] = Object.keys(error.response.data.errors).map((key) => {
      return {
        key,
        message: error.response.data.errors[key][0]
      }
    })

    return this
  }

  has(key, bag = 'default') {
    return this.errors[bag].some((error) => error.key === key)
  }

  setOne(key, message, bag = 'default') {
    const target = this.errors[bag]

    if (!target) {
      this.errors[bag] = [
        {
          key,
          message
        }
      ]
      return this
    }

    const index = target.findIndex((error) => error.key === key)

    if (index !== -1) {
      target[index].message = message
      return this
    }

    target.push({
      key,
      message
    })

    return this
  }

  get(key, bag = 'default') {
    const target = this.errors[bag]

    if (!target) {
      return {
        message: '',
        variant: ''
      }
    }

    const match = target.find((error) =>
      Array.isArray(key) ? key.includes(error.key) : error.key === key
    )

    if (!match) {
      return {
        message: '',
        variant: ''
      }
    }

    return {
      message: match.message,
      variant: 'danger'
    }
  }

  clear(key = null, bag = 'default') {
    if (key) {
      const target = this.errors[bag]

      if (!target) {
        console.warn(`Bag ${bag} is not defined.`)
        return this
      }

      const index = target.findIndex((error) => error.key === key)

      if (index !== -1) {
        target.splice(index, 1)
      }

      return this
    }

    this.errors[bag] = []

    return this
  }

  all(bag = 'default') {
    return this.errors[bag]
  }
}
