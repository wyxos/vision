import axios from 'axios'
import { computed, reactive } from 'vue'
import { LoadState } from '@wyxos/vision'
import { roles } from '@dashboard/roles'

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
        if (!Reflect.has(target, name)) {
          if (name in target.attributes) {
            target.attributes[name] = value

            return true
          }

          return null
        }

        return Reflect.set(target, name, value, receiver)
      }
    })
  }

  get isAdministrator() {
    return computed(() => Boolean(this.user.super_admin)).value
  }

  get isClientAdmin() {
    return computed(() =>
      Boolean(this.roles.find((role) => role.slug === 'client-admin'))
    ).value
  }

  get isClient() {
    return computed(() =>
      Boolean(this.roles.find((role) => role.slug === 'user'))
    ).value
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

  get role() {
    if (this.user?.super_admin) {
      return roles.ADMINISTRATOR
    }

    if (this.attributes.roles?.length === 1) {
      const match = Object.keys(roles).find(
        (key) => roles[key] === this.roles[0].slug
      )

      return roles[match]
    }

    throw Error('User does not have a valid role.')
  }

  async load() {
    this.state.loading()

    await axios.get('/sanctum/csrf-cookie').catch((error) => {
      this.state.failed()

      throw error
    })

    const { data } = await axios.get('/api/user')

    if (!('user' in data)) {
      throw Error('Instance of user is not defined.')
    }

    Object.keys(data).forEach((key) => {
      this.attributes[key] = data[key]
    })

    this.state.loaded()
  }

  getUser() {
    return this.attributes.user
  }

  reset() {
    this.attributes = reactive({
      user: null
    })
  }

  canSubmitOnly() {}
}

const auth = new Auth()

export default auth
