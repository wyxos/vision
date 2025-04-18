import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import Filter from './Filter.js'
import queryString from 'query-string'

export default class Listing {
  loadUrl = ''
  loadingState = ref(null)

  router = null

  attributes = reactive({
    masonry: null,
    pages: [],
    items: [],
    showing: 0,
    perPage: 0,
    total: 0
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

  masonry(number = 5) {
    this.attributes.masonry = number

    return this
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
          this.router.push({ query: this.filter.getAppliedQuery() })
        }

        if (this.attributes.masonry) {
          // if(this.attributes.pages.length > this.attributes.masonry){
          //     this.attributes.pages.shift()
          // }

          this.attributes.pages.push({
            page: this.filter.query.page,
            items: JSON.parse(JSON.stringify(this.attributes.items)).map(
              (item, index) => {
                item.uid = `${this.filter.query.page}-${index}`
                return item
              }
            )
          })
        }

        this.filter.hide()

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

        if (this.attributes.masonry) {
          this.attributes.pages.push({
            page: this.filter.query.page,
            items: JSON.parse(JSON.stringify(this.attributes.items)).map(
              (item, index) => {
                item.uid = `${this.filter.query.page}-${index}`
                return item
              }
            )
          })
        }

        if (this.router) {
          this.router.push({ query: {} })
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
    this.filter.reset()

    this.filter.applied = []

    return this.load()
  }
}
