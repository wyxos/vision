import axios from 'axios'
import { reactive } from 'vue'
import useFormErrors from './useFormErrors'
import State from './LoadState'

export default class FormBuilder {
  loadPath = ''
  submitPath = ''
  submitMethod = 'post'
  errors = null
  errorBag = ''
  model = reactive({})
  form = reactive({})
  original = {}
  states = {
    load: new State(),
    submit: new State()
  }

  constructor({
    submitPath,
    submitMethod = 'post',
    loadPath = '',
    bag = 'default',
    form = {}
  } = {}) {
    this.submitPath = submitPath
    this.submitMethod = submitMethod
    this.loadPath = loadPath
    this.errorBag = bag
    this.errors = useFormErrors()
    this.errors.createBag(this.errorBag)
    this.setAttributes(form)
    this.states.load.loaded()

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

  setPath(path) {
    this.submitPath = path
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

  async submit(
    { path = this.submitPath, formatter = null, config = {} } = {},
    onComplete = null
  ) {
    // Validate inputs
    if (typeof path !== 'string') throw new Error('Path must be a string')
    if (formatter !== null && typeof formatter !== 'function')
      throw new Error('Formatter must be a function')
    if (typeof config !== 'object') throw new Error('Config must be an object')

    this.clearErrors()
    this.submitting()

    const cleanJson = JSON.parse(JSON.stringify(this.form))
    const payload = formatter ? formatter(this.form) : cleanJson

    if (!path) {
      return this.handleSubmissionFailure('No url defined.')
    }

    const methods = config?.method || this.submitMethod || 'post'

    try {
      const { data } = await axios[methods](path, payload, config)
      console.log('are we here?')
      this.clearErrors()
      this.submitted()
      return onComplete ? onComplete(data) : data
    } catch (error) {
      console.log('caught error in plugin', error.response.status)

      if (error.response?.status === 422) {
        this.handleSubmissionFailure(error)

        return null
      }

      return Promise.reject(error)
    }
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

  async load({ path = '', params = {}, updateOriginal = true } = {}) {
    this.loading()

    const url = path || this.loadPath

    if (!url) {
      this.loadFailed()

      throw Error('Url is not defined for the load method.')
    }

    const { data } = await axios
      .get(url, {
        params
      })
      .catch((error) => {
        this.loadFailed()

        throw error
      })

    if (updateOriginal) {
      Object.assign(this.original, data.form)
    }

    Object.assign(this.form, data.form)

    if (data.model) {
      Object.assign(this.model, data.model)
    }

    this.loaded()

    return data
  }

  loading() {
    this.states.load.loading()
  }

  loaded() {
    this.states.load.loaded()
  }

  loadFailed() {
    this.states.load.failed()
  }

  submitting() {
    this.states.submit.loading()
  }

  submitFailed() {
    this.states.submit.failed()
  }

  submitted() {
    this.states.submit.loaded()
  }

  reset() {
    Object.assign(this.form, this.original)
  }
}
