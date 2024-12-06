import { reactive, ref } from 'vue'
import axios from 'axios'
// import axios from 'axios'
// import LoadState from './LoadState'
// import qs from 'query-string'
// import useFormErrors from './useFormErrors'

export default class Listing {
  loadUrl = ''
  loadingState = ref(null)

  originalQuery = {}
  appliedQuery = {}
  appliedQueryLabel = {}

  attributes = reactive({
    response: {
      listing: {
        items: [],
        showing: 0,
        perPage: 0,
        total: 0
      }
    },
    query: {
      page: 1,
      perPage: 10
    }
  })

  constructor(query) {
    this.originalQuery = query
    this.appliedQuery = query

    Object.assign(this.attributes.query, query)

    return new Proxy(this, {
      get(target, name, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name, receiver)
        }
        // If not, attempt to access it from the 'form' object
        if (Reflect.has(target.attributes.query, name)) {
          const path = name.split('.')
          if (path.length > 1) {
            // handle nested properties
            let value = target.attributes.query

            for (let i = 0; i < path.length; i++) {
              value = value[path[i]]
            }

            if (value === undefined || value === null) {
              return undefined
            }

            return value
          }

          return Reflect.get(target.attributes.query, name)
        }
        return undefined
      },
      set(target, name, value, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.set(target, name, value, receiver)
        }
        // If not, attempt to set it in the 'form' object
        if (Reflect.has(target.attributes.query, name)) {
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

          return Reflect.set(target.attributes.query, name, value)
        }

        return false
      }
    })
  }

  get config() {
    return {
      data: this.attributes.response.listing.items,
      total: this.attributes.response.listing.total,
      currentPage: this.attributes.query.page,
      perPage: this.attributes.query.perPage,
      loading: this.isLoading,
      paginated:
        this.attributes.response.listing.total >
        this.attributes.response.listing.perPage,
      backendPagination: true,
      striped: true
    }
  }

  get events() {
    return {
      pageChange: ($event) => this.onPageChange($event)
    }
  }

  get isLoading() {
    return this.loadingState.value === 'loading'
  }

  get activeAttributes() {
    return Object.keys(this.attributes.query)
      .filter((key) => this.appliedQueryLabel[key])
      .filter(
        (key) =>
          this.appliedQuery[key] !== null &&
          this.appliedQuery[key] !== undefined &&
          this.appliedQuery[key] !== '' &&
          this.appliedQuery[key] !== 'all'
      )
      .map((key) => {
        return {
          key,
          label: this.renderLabel(key),
          value: this.appliedQuery[key]
        }
      })
  }

  static create(query) {
    return new Listing(query)
  }

  search(query = {}) {
    if (typeof query === 'function') {
      query = Object.assign(
        {},
        this.attributes.query,
        query(this.attributes.query)
      )
    } else {
      query = Object.assign({}, this.attributes.query, query)
    }

    this.loading()

    return axios
      .get(this.loadUrl, {
        params: query
      })
      .then((response) => {
        Object.assign(this.attributes.response, response.data)

        this.appliedQuery = JSON.parse(JSON.stringify(query))

        return response
      })
      .finally(() => {
        this.loadingState.value = 'loaded'
      })
  }

  load(query = {}) {
    this.attributes.query.page = 1

    if (typeof query === 'function') {
      query = Object.assign(
        {},
        this.attributes.query,
        query(this.attributes.query)
      )
    } else {
      query = Object.assign({}, this.attributes.query, query)
    }

    this.loading()

    return axios
      .get(this.loadUrl, {
        params: query
      })
      .then((response) => {
        Object.assign(this.attributes.response, response.data)

        this.appliedQuery = this.originalQuery

        return response
      })
      .finally(() => {
        this.loadingState.value = 'loaded'
      })
  }

  loading() {
    this.loadingState.value = 'loading'
  }

  displayAs(attributes) {
    this.appliedQueryLabel = attributes

    return this
  }

  renderLabel(key) {
    return this.appliedQueryLabel[key]
  }

  onPageChange(value) {
    this.attributes.query.page = value

    return this.search()
  }

  clearAttribute(key) {
    this.attributes.query[key] = this.originalQuery[key]

    return this.search()
  }

  reset() {
    Object.assign(this.attributes.query, this.originalQuery)

    return this.load()
  }

  loadFrom(path) {
    this.loadUrl = path

    return this
  }
}
