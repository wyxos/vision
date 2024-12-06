import { reactive, ref } from 'vue'
import axios from 'axios'
// import axios from 'axios'
// import LoadState from './LoadState'
// import qs from 'query-string'
// import useFormErrors from './useFormErrors'

class Filter {
  labels = {}

  applied = {}

  constructor(query) {
    this.original = query

    this.query = reactive({
      page: 1,
      perPage: 10,
      ...query
    })
  }

  displayAs(attributes) {
    this.labels = attributes

    return this
  }

  apply() {
    this.applied = Object.assign({}, this.query)
  }

  render() {}

  reset() {
    this.query = reactive({
      page: 1,
      perPage: 10,
      ...this.original
    })
  }
}

export default class Listing {
  loadUrl = ''
  loadingState = ref(null)

  attributes = reactive({
    listing: {
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    }
  })

  constructor(query) {
    this.filter = new Filter(query)

    return new Proxy(this, {
      get(target, name, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name, receiver)
        }
        // If not, attempt to access it from the 'form' object
        if (Reflect.has(target.filter.query, name)) {
          const path = name.split('.')
          if (path.length > 1) {
            // handle nested properties
            let value = target.filter.query

            for (let i = 0; i < path.length; i++) {
              value = value[path[i]]
            }

            if (value === undefined || value === null) {
              return undefined
            }

            return value
          }

          return Reflect.get(target.filter.query, name)
        }
        return undefined
      },
      set(target, name, value, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.set(target, name, value, receiver)
        }
        // If not, attempt to set it in the 'form' object
        if (Reflect.has(target.filter.query, name)) {
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

          return Reflect.set(target.filter.query, name, value)
        }

        return false
      }
    })
  }

  get config() {
    return {
      data: this.attributes.listing.items,
      total: this.attributes.listing.total,
      currentPage: this.filter.query.page,
      perPage: this.filter.query.perPage,
      loading: this.isLoading,
      paginated:
        this.attributes.listing.total > this.attributes.listing.perPage,
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

  static create(query) {
    return new Listing(query)
  }

  search(query = {}) {
    if (typeof query === 'function') {
      query = Object.assign({}, this.filter.query, query(this.filter.query))
    } else {
      query = Object.assign({}, this.filter.query, query)
    }

    this.loading()

    return axios
      .get(this.loadUrl, {
        params: query
      })
      .then((response) => {
        Object.assign(this.attributes, response.data)

        this.filter.apply()

        return response
      })
      .finally(() => {
        this.loadingState.value = 'loaded'
      })
  }

  load(query = {}) {
    this.filter.query.page = 1

    if (typeof query === 'function') {
      query = Object.assign({}, this.filter.query, query(this.filter.query))
    } else {
      query = Object.assign({}, this.filter.query, query)
    }

    this.loading()

    return axios
      .get(this.loadUrl, {
        params: query
      })
      .then((response) => {
        Object.assign(this.attributes, response.data)

        return response
      })
      .finally(() => {
        this.loadingState.value = 'loaded'
      })
  }

  loading() {
    this.loadingState.value = 'loading'
  }

  onPageChange(value) {
    this.filter.query.page = value

    return this.search()
  }

  loadFrom(path) {
    this.loadUrl = path

    return this
  }
}
