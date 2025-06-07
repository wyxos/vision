import { reactive } from 'vue'
import axios from 'axios'
import useFormErrors from './useFormErrors.js'

export default class FormBuilder {
  // Function to transform the request payload
  transformCallback = null
  // Whether to force the use of FormData
  forceFormDataFlag = false
  original = {}
  form = reactive({})
  abortSubmitController = null
  abortLoadController = null
  state = reactive({
    loading: false,
    loaded: false,
    successful: false,
    failed: false,
    wasLoading: false,
    wasSubmitting: false
  })

  errors = useFormErrors()

  resetAfterSubmitFlag = false

  callbacks = {
    submit: null,
    load: null,
    success: null,
    failure: null
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

  get successful() {
    return this.state.successful
  }

  get failed() {
    return this.state.failed
  }

  get loading() {
    return this.state.loading
  }

  get loaded() {
    return this.state.loaded
  }

  get wasLoading() {
    return this.state.wasLoading
  }

  get wasSubmitting() {
    return this.state.wasSubmitting
  }

  get isSubmitting() {
    return this.state.loading && this.state.wasSubmitting
  }

  get isSubmitted() {
    return this.state.successful
  }

  get isSubmitFailed() {
    return this.state.failed && this.state.wasSubmitting
  }

  get isLoading() {
    return this.state.loading && this.state.wasLoading
  }

  get isLoaded() {
    return this.state.loaded
  }

  get isLoadFailed() {
    return this.state.failed && this.state.wasLoading
  }

  //
  static create(options) {
    return new this(options)
  }

  resetAfterSubmit(flag = true) {
    this.resetAfterSubmitFlag = flag

    return this
  }

  setAttributes(form) {
    // Use deep cloning to prevent reactivity in `original`
    this.original = JSON.parse(JSON.stringify(form))

    Object.keys(form).forEach((key) => {
      this.form[key] = form[key]
    })

    return this
  }

  forceFormData(flag = true) {
    this.forceFormDataFlag = flag

    return this
  }

  get(url, options = {}) {
    return this.submit('get', url, options)
  }

  post(url, options = {}) {
    return this.submit('post', url, options)
  }

  patch(url, options = {}) {
    return this.submit('patch', url, options)
  }

  put(url, options = {}) {
    return this.submit('put', url, options)
  }

  delete(url, options = {}) {
    return this.submit('delete', url, options)
  }

  async submit(method, url, options = {}) {
    this.setSubmitting()

    this.clearErrors()

    const { onSuccess, onFail, ...axiosConfig } = { ...options }

    // If there's an ongoing request, abort it
    if (this.abortSubmitController) {
      this.abortSubmitController.abort()
    }

    // Create a new AbortController
    this.abortSubmitController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortSubmitController.signal

    let data = this.transformCallback
      ? this.transformCallback(this.form)
      : this.form

    if (this.forceFormDataFlag) {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      data = formData
    }

    let request
    if (method === 'get') {
      request = axios.get(url, axiosConfig)
    } else if (method === 'delete') {
      request = axios.delete(url, axiosConfig)
    } else {
      request = axios[method](url, data, axiosConfig)
    }

    return request
      .then((response) => {
        this.setSubmitted()

        if (this.resetAfterSubmitFlag) {
          this.setAttributes(this.original)
        }

        // Use callback from options first, then fallback to the one set via onSuccess method
        const successCallback = onSuccess || this.callbacks.success

        return successCallback
          ? successCallback(response.data)
          : response.data
      })
      .catch((error) => {
        this.setSubmitFailed()

        this.errors.set(error)

        // Use callback from options first, then fallback to the one set via onFail method
        const failCallback = onFail || this.callbacks.failure

        if (failCallback) {
          return Promise.reject(failCallback(error))
        }

        return Promise.reject(error)
      })
  }

  load(url, options = {}) {
    this.setLoading()

    const { onSuccess, onFail, ...axiosConfig } = { ...options }

    // If there's an ongoing request, abort it
    if (this.abortLoadController) {
      this.abortLoadController.abort()
    }

    // Create a new AbortController
    this.abortLoadController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortLoadController.signal

    return axios
      .get(url, axiosConfig)
      .then((response) => {
        this.setLoaded()

        if (response.data.form) {
          this.setAttributes(response.data.form)
        }

        // Use callback from options first, then fallback to the one set via onSuccess method
        const successCallback = onSuccess || this.callbacks.success

        return successCallback
          ? successCallback(response.data)
          : response.data
      })
      .catch((error) => {
        this.setLoadFailed()

        // Use callback from options first, then fallback to the one set via onFail method
        const failCallback = onFail || this.callbacks.failure

        if (failCallback) {
          return Promise.reject(failCallback(error))
        }

        return Promise.reject(error)
      })
  }

  setSubmitting() {
    Object.assign(this.state, {
      loading: true,
      successful: false,
      failed: false,
      wasSubmitting: true,
      wasLoading: false,
      loaded: false
    })

    return this
  }

  setSubmitted() {
    Object.assign(this.state, {
      loading: false,
      successful: true,
      failed: false,
      wasSubmitting: true,
      wasLoading: false
    })

    return this
  }

  setSubmitFailed() {
    Object.assign(this.state, {
      loading: false,
      failed: true,
      successful: false,
      wasSubmitting: true,
      wasLoading: false
    })

    return this
  }

  setLoading() {
    Object.assign(this.state, {
      loading: true,
      loaded: false,
      failed: false,
      successful: false,
      wasLoading: true,
      wasSubmitting: false
    })

    return this
  }

  setLoaded() {
    Object.assign(this.state, {
      loading: false,
      loaded: true,
      failed: false,
      wasLoading: true,
      wasSubmitting: false,
      successful: false
    })

    return this
  }

  setLoadFailed() {
    Object.assign(this.state, {
      loading: false,
      loaded: false,
      failed: true,
      successful: false,
      wasLoading: true,
      wasSubmitting: false
    })

    return this
  }

  transform(callback) {
    this.transformCallback = callback

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
