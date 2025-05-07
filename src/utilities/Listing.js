import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import Filter from './Filter.js'
import queryString from 'query-string'

export default class Listing {
  loadUrl = ''
  loadingState = ref(null)

  router = null

  transformCallback = null

  attributes = reactive({
    items: [],
    showing: 0,
    perPage: 0,
    total: 0
  })

  constructor(query) {
    this.filter = new Filter(query)

    const proxy = new Proxy(this, {
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

    return proxy
  }

  get config() {
    return {
      data: this.attributes.items,
      total: this.attributes.total,
      currentPage: this.filter.query.page,
      loading: this.isLoading,
      paginated: this.attributes.total > this.attributes.perPage,
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

  get isLoaded() {
    return this.loadingState.value === 'loaded'
  }

  get isDirty() {
    return this.filter.isDirty
  }

  static create(query) {
    return new Listing(query)
  }

  setFilter(attributes) {
    this.filter = new Filter(attributes)

    return this
  }

  search(query = {}) {
    if (typeof query === 'function') {
      query = Object.assign({}, this.filter.query, query(this.filter.query))
    } else {
      query = Object.assign({}, this.filter.query, query)
    }

    if (this.transformCallback) {
      query = this.transformCallback(query)
    }

    console.log('query', query)

    this.loading()

    return axios
      .get(this.loadUrl, {
        params: query
      })
      .then((response) => {
        if (response.data.listing) {
          Object.assign(this.attributes, response.data.listing)
        }

        if (response.data.filters) {
          this.filter.applied = response.data.filters
        }

        if (this.router) {
          this.router.push({ query })
        }

        return response
      })
      .finally(() => {
        this.loaded()
      })
  }

  load(query = {}) {
    const urlQuery = queryString.parse(window.location.search, {
      parseNumbers: true,
      parseBooleans: true
    })

    Object.assign(this.filter.query, urlQuery)

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
        if (response.data.listing) {
          Object.assign(this.attributes, response.data.listing)
        }

        if (response.data.filters) {
          this.filter.applied = response.data.filters
        }

        return response
      })
      .finally(() => {
        this.loaded()
      })
  }

  refresh(query) {
    const urlQuery = queryString.parse(window.location.search, {
      parseNumbers: true,
      parseBooleans: true
    })

    Object.assign(this.filter.query, urlQuery)

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
        if (response.data.listing) {
          Object.assign(this.attributes, response.data.listing)
        }

        if (response.data.filters) {
          this.filter.applied = response.data.filters
        }

        return response
      })
      .finally(() => {
        this.loaded()
      })
  }

  loading() {
    this.loadingState.value = 'loading'
  }

  loaded() {
    this.loadingState.value = 'loaded'
  }

  onPageChange(value) {
    this.filter.query.page = value

    return this.search()
  }

  loadFrom(path) {
    this.loadUrl = path

    return this
  }

  reset() {
    this.filter.reset()

    return this.search()
  }

  clear(key) {
    this.filter.clear(key)

    return this.search()
  }

  enableRouterSync(router) {
    this.router = router

    return this
  }

  syncOnRouteChange(route) {
    watch(
      () => route.query,
      () => {
        this.refresh()
      }
    )

    return this
  }

  next() {
    this.filter.query.page += 1

    return this.search()
  }

  resetSearch() {
    this.reset()
    this.filter.applied = []

    if (this.router) {
      return this.router.push({ query: {} }) // Clear query params without reload
    }

    return this.load()
  }

  transform(callback) {
    this.transformCallback = callback

    return this
  }
}
