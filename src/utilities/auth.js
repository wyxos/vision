import axios from 'axios'
import { reactive } from 'vue'
import LoadState from '../utilities/LoadState'

class Auth {
  attributes = reactive({
    user: null
  })

  state = new LoadState()

  constructor() {
    return new Proxy(this, {
      get(target, name, receiver) {
        if (!Reflect.has(target, name)) {
          if (name in target.attributes) {
            return target.attributes[name]
          }

          return null
        }

        return Reflect.get(target, name, receiver)
      },
      set(target, name, value, receiver) {
        if (!Reflect.has(target, name) && !(name in target.attributes)) {
          // Allow setting new properties on the target
          Reflect.set(target, name, value, receiver)
          return true
        }
        if (name in target.attributes) {
          target.attributes[name] = value
          return true
        }
        return Reflect.set(target, name, value, receiver)
      }
    })
  }

  get isLoading() {
    return this.state.isLoading
  }

  get isLoaded() {
    return this.state.isLoaded
  }

  get isFailure() {
    return this.state.isFailure
  }

  get isAuthenticated() {
    return Boolean(this.attributes.user)
  }

  async load() {
    this.loading()

    await axios.get('/sanctum/csrf-cookie').catch((error) => {
      this.failed()

      throw error
    })

    const { data } = await axios.get('/api/user')

    if (!('user' in data)) {
      throw Error('Instance of user is not defined.')
    }

    Object.keys(data).forEach((key) => {
      this.attributes[key] = data[key]
    })

    this.loaded()
  }

  loading() {
    return this.state.loading()
  }

  loaded() {
    return this.state.loaded()
  }

  failed() {
    return this.state.failed()
  }

  reset() {
    this.attributes = reactive({
      user: null
    })

    this.state.reset()
  }
}

const auth = new Auth()

export default auth
