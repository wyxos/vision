// import axios from 'axios'
import { reactive, ref } from 'vue'
import axios from 'axios'
import useFormErrors from './useFormErrors.js'
// import useFormErrors from './useFormErrors'
// import State from './LoadState'

export default class FormBuilder {
  submitUrl = null
  loadUrl = null
  original = {}
  form = reactive({})
  formatCallback = null
  abortSubmitController = null
  abortLoadController = null
  submitState = ref(null)
  loadState = ref(null)
  errors = useFormErrors()
  resetAfterSubmitFlag = false
  // errorBag = 'default'
  // model = reactive({})
  // form = reactive({})
  // original = {}
  // states = {
  //   load: State.create(),
  //   submit: State.create()
  // }
  //
  // paths = {
  //   load: null,
  //   submit: null
  // }
  //
  // // Add an abort controller property
  // abortSubmitController = null
  //
  // timeout = null
  //
  constructor(form = {}) {
    // this.errors = useFormErrors()
    // this.errors.createBag(this.errorBag)
    // this.setAttributes(form)
    // this.loaded()
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
    return JSON.stringify(this.original) !== JSON.stringify(this.form)
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

  resetAfterSubmit(flag = true) {
    this.resetAfterSubmitFlag = flag

    return this
  }

  setAttributes(form) {
    this.original = form
    Object.assign(this.form, this.original)

    return this
  }

  //
  // get isSubmitting() {
  //   return this.states.submit.isLoading
  // }
  //
  // get isSubmitted() {
  //   return this.states.submit.isLoaded
  // }
  //
  // get isSubmitFailed() {
  //   return this.states.submit.isFailure
  // }
  //
  // get isLoading() {
  //   return this.states.load.isLoading
  // }
  //
  // get isLoaded() {
  //   return this.states.load.isLoaded
  // }
  //
  // get isFailure() {
  //   return this.states.load.isFailure
  // }

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

    const data = this.formatCallback
      ? this.formatCallback(this.form)
      : this.form

    return axios
      .post(this.submitUrl, data, axiosConfig)
      .then((response) => {
        this.submitted()

        if (this.resetAfterSubmitFlag) {
          this.setAttributes(this.original)
        }

        return response.data
      })
      .catch((error) => {
        this.submitFailed()

        this.errors.set(error)

        return Promise.reject(error)
      })
  }

  load() {
    const axiosConfig = {}

    // If there's an ongoing request, abort it
    if (this.abortLoadController) {
      this.abortLoadController.abort()
    }

    // Create a new AbortController
    this.abortLoadController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortLoadController.signal

    return axios.get(this.loadUrl, axiosConfig).then((response) => {
      if (response.data.form) {
        this.setAttributes(response.data.form)
      }

      return response.data
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

  formatter(callback) {
    this.formatCallback = callback

    return this
  }

  loadFrom(path) {
    this.loadUrl = path

    return this
  }

  //
  // setPaths(paths = {}) {
  //   Object.assign(this.paths, paths)
  //
  //   return this
  // }
  //
  // setLoad(url) {
  //   this.paths.load = url
  //
  //   return this
  // }
  //
  // setSubmit(url) {
  //   this.paths.submit = url
  //
  //   return this
  // }
  //
  // setErrors(bag) {
  //   this.errorBag = bag || 'default'
  //
  //   this.errors = useFormErrors()
  //
  //   this.errors.createBag(this.errorBag)
  // }
  //
  // setAttributes(attributes) {
  //   this.original = attributes
  //   this.form = reactive({ ...attributes })
  // }
  //
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

  //
  // get(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('get', path, { formatter, ...axiosConfig })
  // }
  //
  // post(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('post', path, { formatter, ...axiosConfig })
  // }
  //
  // submit(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   path = path || this.paths.submit
  //
  //   if (!path) {
  //     throw Error('No valid URL defined for submit method.')
  //   }
  //
  //   return this.submitRequest('post', path, { formatter, ...axiosConfig })
  // }
  //
  // delete(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('delete', path, { formatter, ...axiosConfig })
  // }
  //
  // put(path = null, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('put', path, { formatter, ...axiosConfig })
  // }
  //
  // patch(path, { formatter = null, ...axiosConfig } = {}) {
  //   return this.submitRequest('patch', path, { formatter, ...axiosConfig })
  // }
  //
  // async submitRequest(
  //   method,
  //   path = null,
  //   { formatter = null, ...axiosConfig } = {}
  // ) {
  //   // Validate inputs
  //   if (path && typeof path !== 'string')
  //     throw new Error('Path must be a string')
  //   if (formatter !== null && typeof formatter !== 'function')
  //     throw new Error('Formatter must be a function')
  //
  //   // If there's an ongoing request, abort it
  //   if (this.abortSubmitController) {
  //     this.abortSubmitController.abort()
  //   }
  //
  //   // Create a new AbortController
  //   this.abortSubmitController = new AbortController()
  //
  //   // Add the signal to the axios config
  //   axiosConfig.signal = this.abortSubmitController.signal
  //
  //   this.clearErrors()
  //   this.submitting()
  //
  //   // wait 1 second
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  //
  //   const payload = formatter ? formatter(this.form) : { ...this.form }
  //
  //   let request
  //
  //   if (['get', 'delete'].includes(method)) {
  //     axiosConfig.params = payload
  //     request = axios[method](path, axiosConfig)
  //   } else {
  //     request = axios[method](path, payload, axiosConfig)
  //   }
  //
  //   return request
  //     .then((response) => {
  //       // After a successful request, nullify the abortSubmitController
  //       this.abortSubmitController = null
  //
  //       this.clearErrors()
  //       this.submitted()
  //       // this.states.submit.reset()
  //
  //       return response.data
  //     })
  //     .catch((error) => {
  //       if (error.name === 'AbortError') {
  //         console.log('Request aborted:', error.message)
  //       } else {
  //         this.submitFailed()
  //         this.errors.set(error, this.errorBag)
  //       }
  //       return Promise.reject(error)
  //     })
  // }
  //
  // clearErrors() {
  //   this.errors.clear(null, this.errorBag)
  // }
  //
  // handleSubmissionFailure(error) {
  //   this.submitFailed()
  //   this.errors.set(error, this.errorBag)
  // }
  //
  // async advancedSubmit(callback) {
  //   this.states.submit.loading()
  //
  //   const { data } = await Promise.resolve(callback(axios, this.form)).catch(
  //     (error) => {
  //       this.states.submit.failed()
  //
  //       this.errors.set(error, this.errorBag)
  //
  //       throw error
  //     }
  //   )
  //
  //   this.states.submit.loaded()
  //
  //   return data
  // }
  //
  // async load(
  //   path = '',
  //   { updateLoading = true, updateOriginal = true, ...axiosConfig } = {}
  // ) {
  //   this.clearErrors()
  //
  //   this.states.load.loading()
  //
  //   try {
  //     const { data } = await axios.get(path || this.paths.load, axiosConfig)
  //
  //     if (updateOriginal) {
  //       Object.assign(this.original, data.form)
  //     }
  //
  //     Object.assign(this.form, data.form)
  //
  //     if (data.model) {
  //       Object.assign(this.model, data.model)
  //     }
  //
  //     if (updateLoading) {
  //       this.loaded()
  //     }
  //
  //     return data
  //   } catch (error) {
  //     this.states.load.failed()
  //     throw error
  //   }
  // }
  //
  // loading() {
  //   this.states.load.loading()
  //
  //   return this
  // }
  //
  // loaded() {
  //   this.states.load.loaded()
  //
  //   return this
  // }
  //
  // loadFailed() {
  //   this.states.load.failed()
  //
  //   return this
  // }
  //
  // submitting() {
  //   this.states.submit.loading()
  //
  //   return this
  // }
  //
  // submitFailed() {
  //   this.states.submit.failed()
  //
  //   return this
  // }
  //
  // submitted() {
  //   this.states.submit.loaded()
  //
  //   return this
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
