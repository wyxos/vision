import axios from 'axios'
import {reactive} from 'vue'
import LoadState from '../utilities/LoadState.js'

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
        this.state.loading()

        await axios.get('/sanctum/csrf-cookie').catch((error) => {
            this.state.failed()

            throw error
        })

        const {data} = await axios.get('/api/user')

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
}

const auth = new Auth()

export default auth
