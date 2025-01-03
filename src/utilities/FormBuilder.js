import { reactive, ref } from 'vue'
import axios from 'axios'
import useFormErrors from './useFormErrors.js'

export default class FormBuilder {
  method = 'post'
  submitUrl = null
  loadUrl = null
  original = {}
  form = reactive({})
  abortSubmitController = null
  abortLoadController = null
  submitState = ref('')
  loadState = ref('')
  errors = useFormErrors()
  resetAfterSubmitFlag = false

  callbacks = {
    submit: null,
    load: null,
    success: null,
    failure: null,
    formatter: null
  }

  constructor(form = {}) {
    this.setAttributes(form)

    return new Proxy(this, {
      get(target, name, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name, receiver)
        }
        // If not, attempt to access it from the 'form' object
        if (Reflect.has(target.form, name)) {
          const path = name.split('.')
          if (path.length > 1) {
            // handle nested properties
            let value = target.form

            for (let i = 0; i < path.length; i++) {
              value = value[path[i]]
            }

            if (value === undefined || value === null) {
              return undefined
            }

            return value
          }

          return Reflect.get(target.form, name)
        }
        return undefined
      },
      set(target, name, value, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.set(target, name, value, receiver)
        }
        // If not, attempt to set it in the 'form' object
        if (Reflect.has(target.form, name)) {
          const path = name.split('.')

          if (path.length > 1) {
            let obj = target.form

            for (let i = 0; i < path.length - 1; i++) {
              if (!(path[i] in obj)) {
                obj[path[i]] = {}
              }
              obj = obj[path[i]]
            }

            if (obj[path[path.length - 1]] === undefined) {
              return false
            }

            obj[path[path.length - 1]] = value

            return true
          }

          return Reflect.set(target.form, name, value)
        }

        return false
      }
    })
  }

  get isDirty() {
    const deepSort = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(deepSort) // Sort each item in the array
      } else if (obj && typeof obj === 'object') {
        return Object.keys(obj)
          .sort() // Sort keys
          .reduce((sorted, key) => {
            sorted[key] = deepSort(obj[key]) // Recursively sort values
            return sorted
          }, {})
      }
      return obj // Return non-object values as is
    }

    return (
      JSON.stringify(deepSort(this.original)) !==
      JSON.stringify(deepSort(this.form))
    )
  }

  get isSubmitting() {
    return this.submitState.value === 'loading'
  }

  get isSubmitted() {
    return this.submitState.value === 'loaded'
  }

  get isSubmitFailed() {
    return this.submitState.value === 'failed'
  }

  //
  static create(options) {
    return new this(options)
  }

  isPost() {
    this.method = 'post'

    return this
  }

  isPatch() {
    this.method = 'patch'

    return this
  }

  isPut() {
    this.method = 'put'

    return this
  }

  resetAfterSubmit(flag = true) {
    this.resetAfterSubmitFlag = flag

    return this
  }

  setAttributes(form) {
    this.original = form
    Object.assign(this.form, this.original)

    return this
  }

  submitAt(path) {
    this.submitUrl = path

    return this
  }

  async submit() {
    this.submitting()

    this.clearErrors()

    const axiosConfig = {}

    // If there's an ongoing request, abort it
    if (this.abortSubmitController) {
      this.abortSubmitController.abort()
    }

    // Create a new AbortController
    this.abortSubmitController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortSubmitController.signal

    // delay by 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = this.callbacks.formatter
      ? this.callbacks.formatter(this.form)
      : this.form

    const method = this.method

    return axios[method](this.submitUrl, data, axiosConfig)
      .then((response) => {
        this.submitted()

        if (this.resetAfterSubmitFlag) {
          this.setAttributes(this.original)
        }

        return this.callbacks.success
          ? this.callbacks.success(response.data)
          : response.data
      })
      .catch((error) => {
        this.submitFailed()

        this.errors.set(error)

        return Promise.reject(error)
      })
  }

  load() {
    this.loading()

    const axiosConfig = {}

    // If there's an ongoing request, abort it
    if (this.abortLoadController) {
      this.abortLoadController.abort()
    }

    // Create a new AbortController
    this.abortLoadController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortLoadController.signal

    return axios
      .get(this.loadUrl, axiosConfig)
      .then((response) => {
        this.loaded()

        if (response.data.form) {
          this.setAttributes(response.data.form)
        }

        return response.data
      })
      .catch((error) => {
        this.loadFailed()

        return Promise.reject(error)
      })
  }

  submitting() {
    this.submitState.value = 'loading'
  }

  submitted() {
    this.submitState.value = 'loaded'
  }

  submitFailed() {
    this.submitState.value = 'failed'
  }

  loading() {
    this.loadState.value = 'loading'
  }

  loaded() {
    this.loadState.value = 'loaded'
  }

  loadFailed() {
    this.loadState.value = 'failed'
  }

  formatter(callback) {
    this.callbacks.formatter = callback

    return this
  }

  loadFrom(path) {
    this.loadUrl = path

    return this
  }

  getError(key) {
    return this.errors.get(key)
  }

  hasError(key) {
    return this.errors.has(key)
  }

  clearError(key) {
    this.errors.clear(key)
  }

  clearErrors() {
    this.errors.clear()
  }

  getErrors() {
    return this.errors.all()
  }

  onSuccess(callback) {
    this.callbacks.success = callback

    return this
  }

  onFailure(callback) {
    this.callbacks.failure = callback

    return this
  }

  //
  // clearErrors() {
  //   this.errors.clear(null, this.errorBag)
  // }
  //
  // reset() {
  //   Object.assign(this.form, this.original)
  // }
  //
  // resetOnly(keys) {
  //   // Ensure keys is an array
  //   if (!Array.isArray(keys)) {
  //     throw new Error('The keys should be an array.')
  //   }
  //
  //   // Loop through the keys and reset only those
  //   keys.forEach((key) => {
  //     if (Object.prototype.hasOwnProperty.call(this.original, key)) {
  //       this.form[key] = this.original[key]
  //     }
  //   })
  // }
  //
  // resetExcept(keys) {
  //   // Ensure keys is an array
  //   if (!Array.isArray(keys)) {
  //     throw new Error('The keys should be an array.')
  //   }
  //
  //   // Assign the new form object back to the reactive form
  //   Object.keys(this.form).forEach((key) => {
  //     console.log('key', key, !keys.includes(key), this.original[key])
  //     if (!keys.includes(key)) {
  //       this.form[key] = this.original[key]
  //     }
  //   })
  // }
  //
  // delay(timeout = 0, callback) {
  //   clearTimeout(this.timeout)
  //
  //   this.timeout = setTimeout(callback, timeout)
  // }
  //
  toJson() {
    return JSON.parse(JSON.stringify(this.form))
  }
}
