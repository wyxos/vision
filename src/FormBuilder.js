import axios from 'axios'
import { reactive, ref } from 'vue'
import useFormErrors from './formErrors'
import State from './LoadState'

export default class FormBuilder {
  loadPath = ''
  submitPath = ''
  submitMethod = 'post'
  bag = ''
  model = reactive({})
  form = reactive({})
  original = {}
  errors = null
  states = {
    load: new State(),
    submit: new State()
  }

  constructor (options) {
    this.setPath(options.submitPath)

    this.submitMethod = options.submitMethod

    this.loadPath = options.loadPath

    this.setErrors(options.bag)

    this.setAttributes(options.form)

    this.states.load.loaded()

    return new Proxy(this, {
      get (target, name, receiver) {
        if (!Reflect.has(target, name)) {
          if (name in target.form) {
            return target.form[name]
          }

          return null
        }

        return Reflect.get(target, name, receiver)
      },
      set (target, name, value, receiver) {
        if (!Reflect.has(target, name)) {
          if (name in target.form) {
            target.form[name] = value

            return true
          }

          return null
        }

        return Reflect.set(target, name, value, receiver)
      }
    })
  }

  static create (options) {
    return new this(options)
  }

  setPath (path) {
    this.submitPath = path
  }

  setErrors (bag) {
    this.bag = bag || 'default'

    this.errors = useFormErrors()

    this.errors.createBag(this.bag)
  }

  setAttributes (attributes) {
    Object.assign(this.original, attributes)

    Object.assign(this.form, attributes)
  }

  getError (key) {
    return this.errors.get(key, this.bag)
  }

  clearError (key) {
    this.errors.clear(key, this.bag)
  }

  async submit (options) {
    const {
      path, formatter, config = {}
    } = options || {}

    this.errors.clear(null, this.bag)

    this.states.submit.loading()

    const cleanJson = JSON.parse(JSON.stringify(this.form))

    const payload = formatter
      ? formatter(this.form)
      : cleanJson

    const url = path || this.submitPath

    if (!url) {
      this.states.submit.failed()

      throw Error('No url defined.')
    }

    const methods = config?.method || this.submitMethod || 'post'

    const { data } = await axios[methods](
      url,
      payload,
      config
    ).catch((error) => {
      this.states.submit.failed()

      this.errors.set(error, this.bag)

      throw error
    })

    this.errors.clear(null, this.bag)

    this.states.submit.loaded()

    return data
  }

  async advancedSubmit (callback) {
    this.states.submit.loading()

    const { data } = await Promise.resolve(callback(axios, this.form)).catch(
      (error) => {
        this.states.submit.failed()

        this.errors.set(error, this.bag)

        throw error
      }
    )

    this.states.submit.loaded()

    return data
  }

  async load (options) {
    const {
      path,
      params
    } = options || {}

    this.states.load.loading()

    const url = path || this.loadPath

    if (!url) {
      this.states.load.failed()

      throw Error('Url is not defined for the load method.')
    }

    const { data } = await axios
      .get(url, {
        params
      })
      .catch((error) => {
        this.states.load.failed()

        throw error
      })

    this.setAttributes(data.form)

    if (data.model) {
      Object.assign(this.model, data.model)
    }

    this.states.load.loaded()

    return data
  }

  reset () {
    Object.assign(this.form, this.original)
  }

  get isSubmitting () {
    return this.states.submit.isLoading
  }

  get isSubmitted () {
    return this.states.submit.isLoaded
  }

  get isSubmitFailed () {
    return this.states.submit.isFailure
  }

  get isLoading () {
    return this.states.load.isLoading
  }

  get isLoaded () {
    return this.states.load.isLoaded
  }

  get isFailure () {
    return this.states.load.isFailure
  }
}
