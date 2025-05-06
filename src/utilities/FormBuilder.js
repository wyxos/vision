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
        // If not, attempt to set it in the 'form' object if it exists there
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

            // Optionally, if you want to ensure the final property already exists:
            // if (obj[path[path.length - 1]] === undefined) {
            //   return false;
            // }

            obj[path[path.length - 1]] = value
            return true
          }

          return Reflect.set(target.form, name, value)
        }
        // Allow new properties (such as new functions) to be created on the instance
        return Reflect.set(target, name, value, receiver)
      }
    })
  }

  // get isDirty() {
  //   const deepSort = (obj) => {
  //     if (Array.isArray(obj)) {
  //       return obj.map(deepSort) // Sort each item in the array
  //     } else if (obj && typeof obj === 'object') {
  //       return Object.keys(obj)
  //         .sort() // Sort keys
  //         .reduce((sorted, key) => {
  //           sorted[key] = deepSort(obj[key]) // Recursively sort values
  //           return sorted
  //         }, {})
  //     }
  //     return obj // Return non-object values as is
  //   }
  //
  //   return (
  //     JSON.stringify(deepSort(this.original)) !==
  //     JSON.stringify(deepSort(this.form))
  //   )
  // }

  get isSubmitting() {
    return this.submitState.value === 'loading'
  }

  get isSubmitted() {
    return this.submitState.value === 'loaded'
  }

  get isSubmitFailed() {
    return this.submitState.value === 'failed'
  }

  get isLoading() {
    return this.loadState.value === 'loading'
  }

  get isLoaded() {
    return this.loadState.value === 'loaded'
  }

  get isLoadFailed() {
    return this.loadState.value === 'failed'
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
    // Use deep cloning to prevent reactivity in `original`
    this.original = JSON.parse(JSON.stringify(form))
    // this.form = reactive(
    //   Object.assign({}, this.form, JSON.parse(JSON.stringify(form)))
    // )
    Object.keys(form).forEach((key) => {
      this.form[key] = form[key]
    })

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

        if (this.callbacks.failure) {
          return Promise.reject(this.callbacks.failure(error))
        }

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

    return this
  }

  submitted() {
    this.submitState.value = 'loaded'

    return this
  }

  submitFailed() {
    this.submitState.value = 'failed'

    return this
  }

  loading() {
    this.loadState.value = 'loading'

    return this
  }

  loaded() {
    this.loadState.value = 'loaded'

    return this
  }

  loadFailed() {
    this.loadState.value = 'failed'

    return this
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

  onFail(callback) {
    this.callbacks.failure = callback

    return this
  }

  toJson() {
    return JSON.parse(JSON.stringify(this.form))
  }

  reset() {
    this.setAttributes(this.original)

    return this
  }
}
