import axios from 'axios'
import { reactive } from 'vue'
import useFormErrors from './useFormErrors'
import State from './LoadState'

export default class FormBuilder {
  errors = null
  errorBag = 'default'
  model = reactive({})
  form = reactive({})
  original = {}
  states = {
    load: State.create(),
    submit: State.create()
  }

  paths = {
    load: null,
    submit: null
  }

  constructor(form = {}) {
    this.errors = useFormErrors()
    this.errors.createBag(this.errorBag)
    this.setAttributes(form)
    this.loaded()

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

  get isSubmitting() {
    return this.states.submit.isLoading
  }

  get isSubmitted() {
    return this.states.submit.isLoaded
  }

  get isSubmitFailed() {
    return this.states.submit.isFailure
  }

  get isLoading() {
    return this.states.load.isLoading
  }

  get isLoaded() {
    return this.states.load.isLoaded
  }

  get isFailure() {
    return this.states.load.isFailure
  }

  get isDirty() {
    return JSON.stringify(this.original) !== JSON.stringify(this.form)
  }

  static create(options) {
    return new this(options)
  }

  setPaths(paths = {}) {
    Object.assign(this.paths, paths)

    return this
  }

  setSubmit(url) {
    this.paths.submit = url

    return this
  }

  setErrors(bag) {
    this.errorBag = bag || 'default'

    this.errors = useFormErrors()

    this.errors.createBag(this.errorBag)
  }

  setAttributes(attributes) {
    this.original = attributes
    this.form = reactive({ ...attributes })
  }

  getError(key) {
    return this.errors.get(key, this.errorBag)
  }

  clearError(key) {
    this.errors.clear(key, this.errorBag)
  }

  get(path = null, { formatter = null, ...axiosConfig } = {}) {
    return this.submitRequest('get', path, { formatter, ...axiosConfig })
  }

  post(path = null, { formatter = null, ...axiosConfig } = {}) {
    return this.submitRequest('post', path, { formatter, ...axiosConfig })
  }

  submit(path = null, { formatter = null, ...axiosConfig } = {}) {
    path = path || this.paths.submit

    if (!path) {
      throw Error('No valid URL defined for submti method.')
    }

    return this.submitRequest('post', path, { formatter, ...axiosConfig })
  }

  delete(path = null, { formatter = null, ...axiosConfig } = {}) {
    return this.submitRequest('delete', path, { formatter, ...axiosConfig })
  }

  put(path = null, { formatter = null, ...axiosConfig } = {}) {
    return this.submitRequest('put', path, { formatter, ...axiosConfig })
  }

  patch(path, { formatter = null, ...axiosConfig } = {}) {
    return this.submitRequest('patch', path, { formatter, ...axiosConfig })
  }

  submitRequest(
    method,
    path = null,
    { formatter = null, ...axiosConfig } = {}
  ) {
    // Validate inputs
    if (path && typeof path !== 'string')
      throw new Error('Path must be a string')
    if (formatter !== null && typeof formatter !== 'function')
      throw new Error('Formatter must be a function')

    this.clearErrors()
    this.submitting()

    const payload = formatter ? formatter(this.form) : { ...this.form }

    let request

    if (['get', 'delete'].includes(method)) {
      axiosConfig.params = payload
      request = axios[method](path, axiosConfig)
    } else {
      request = axios[method](path, payload, axiosConfig)
    }

    return request
      .then((response) => {
        this.clearErrors()
        this.submitted()

        setTimeout(() => this.states.submit.reset(), 2000)

        return response.data
      })
      .catch((error) => {
        this.submitFailed()
        this.errors.set(error, this.errorBag)
        return Promise.reject(error)
      })
  }

  clearErrors() {
    this.errors.clear(null, this.errorBag)
  }

  handleSubmissionFailure(error) {
    this.submitFailed()
    this.errors.set(error, this.errorBag)
  }

  async advancedSubmit(callback) {
    this.states.submit.loading()

    const { data } = await Promise.resolve(callback(axios, this.form)).catch(
      (error) => {
        this.states.submit.failed()

        this.errors.set(error, this.errorBag)

        throw error
      }
    )

    this.states.submit.loaded()

    return data
  }

  async load(
    path = '',
    { updateLoading = true, updateOriginal = true, ...axiosConfig } = {}
  ) {
    this.states.load.loading()

    try {
      const { data } = await axios.get(path || this.paths.load, axiosConfig)

      if (updateOriginal) {
        Object.assign(this.original, data.form)
      }

      Object.assign(this.form, data.form)

      if (data.model) {
        Object.assign(this.model, data.model)
      }

      if (updateLoading) {
        this.loaded()
      }

      return data
    } catch (error) {
      this.states.load.failed()
      throw error
    }
  }

  loading() {
    this.states.load.loading()

    return this
  }

  loaded() {
    this.states.load.loaded()

    return this
  }

  loadFailed() {
    this.states.load.failed()

    return this
  }

  submitting() {
    this.states.submit.loading()

    return this
  }

  submitFailed() {
    this.states.submit.failed()

    return this
  }

  submitted() {
    this.states.submit.loaded()

    return this
  }

  reset() {
    Object.assign(this.form, this.original)
  }
}
