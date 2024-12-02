import { nextTick, reactive } from 'vue'
import axios from 'axios'
import LoadState from './LoadState'
import qs from 'query-string'
import useFormErrors from './useFormErrors'

let cancelTokenSource = null

export default class Listing {
  cancelTokenSource = null

  api = null

  baseUrl = null

  structure = null

  options = null

  errors = null

  errorBag = 'listing'

  globalCancel = true

  attributes = reactive({
    query: {
      items: [],
      showing: 0,
      perPage: 0,
      total: 0
    },
    params: {
      page: 1
    },
    state: {
      list: null,
      filter: null
    }
  })

  constructor() {
    return new Proxy(this, {
      get(target, name, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.get(target, name, receiver)
        }
        // If not, attempt to access it from the 'form' object
        if (Reflect.has(target.attributes, name)) {
          const path = name.split('.')
          if (path.length > 1) {
            // handle nested properties
            let value = target.attributes

            for (let i = 0; i < path.length; i++) {
              value = value[path[i]]
            }

            if (value === undefined || value === null) {
              return undefined
            }

            return value
          }

          return Reflect.get(target.attributes, name)
        }
        return undefined
      },
      set(target, name, value, receiver) {
        // Check if the property exists in the instance
        if (Reflect.has(target, name)) {
          return Reflect.set(target, name, value, receiver)
        }
        // If not, attempt to set it in the 'form' object
        if (Reflect.has(target.attributes, name)) {
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

          return Reflect.set(target.attributes, name, value)
        }

        return false
      }
    })
  }

  get config() {
    return {
      data: this.attributes.query.items,
      total: this.attributes.query.total,
      currentPage: this.attributes.params.page,
      perPage: this.attributes.query.perPage,
      loading: this.isLoading,
      paginated: this.attributes.query.total > this.attributes.query.perPage,
      backendPagination: true,
      striped: true
    }
  }

  get events() {
    return {
      pageChange: ($event) => this.onPageChange($event)
    }
  }

  get isFilterActive() {
    return this.attributes.state.filter
  }

  get isEmpty() {
    return this.isLoaded && this.attributes.query.items.length === 0
  }

  get isDirty() {
    return (
      JSON.stringify(this.structure) !== JSON.stringify(this.attributes.params)
    )
  }

  get isSearchEmpty() {
    return (
      this.isLoaded && this.isDirty && this.attributes.query.items.length === 0
    )
  }

  get isResettable() {
    return (
      JSON.stringify(this.attributes.params) !== JSON.stringify(this.structure)
    )
  }

  get isLoaded() {
    return this.attributes.state.list === 'loaded'
  }

  get isLoading() {
    return this.attributes.state.list === 'loading'
  }

  get isFailure() {
    return this.attributes.state.list === 'failed'
  }

  static create(params = {}, options = {}) {
    const instance = new Listing()

    instance.errors = useFormErrors()
    instance.errors.createBag(instance.errorBag)

    instance.options = Object.assign(
      {
        enableSearchUpdate: true,
        transformItem: (item) => item
      },
      options
    )

    instance.setParameters(params)

    if (instance.options.enableSearchUpdate) {
      instance.mergeSearch()
    }

    instance.baseUrl = options.baseUrl

    // instance.api = axios.create(options.axios || {})

    return instance
  }

  setUrl(url) {
    this.baseUrl = url

    return this
  }

  setRouterInstance(router) {
    this.options.router = router

    return this
  }

  setParameters(params) {
    const structure = JSON.parse(JSON.stringify(params))

    this.structure = Object.assign({}, structure)

    this.attributes.params = reactive(params)
  }

  mergeSearch() {
    const query = qs.parse(window.location.search, {
      arrayFormat: 'bracket',
      parseNumbers: true
    })

    // convert page to number if it's defined
    if (query.page) {
      query.page = Number(query.page)
    }

    Object.assign(this.attributes.params, this.structure, query)
  }

  // Retrieves the list without affecting the load state.
  async fetch(path, cancelToken) {
    const params = JSON.parse(JSON.stringify(this.attributes.params))

    const url = path || this.baseUrl

    const { data } = await axios.get(url, {
      params,
      cancelToken
    })

    return data
  }

  async reload(path) {
    const { data } = await axios.get(path || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.attributes.params))
    })

    Object.assign(this.attributes.query, data.query, {
      items: data.query.items.map((item) => this.transformItem(item))
    })

    return data
  }

  refreshUrl() {
    const base = window.location.href.replace(/\?.*/, '')

    const params = JSON.parse(JSON.stringify(this.attributes.params))

    // Filter out null and undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null)
    )

    const url =
      base + '?' + qs.stringify(filteredParams, { arrayFormat: 'bracket' })

    if (this.options.router) {
      const path = this.options.router.currentRoute.path
      this.options.router.push({
        path,
        query: { ...this.options.router.currentRoute.query, ...params }
      })
    } else {
      window.history.pushState({}, '', url)
    }
  }

  push(item) {
    this.attributes.query.items.push(this.transformItem(item))
  }

  transformItem(item) {
    return this.options.transformItem({
      ...item,
      states: {
        delete: new LoadState(),
        patch: new LoadState()
      }
    })
  }

  async load(path) {
    this.errors.clear(null, this.errorBag)

    if (this.globalCancel) {
      if (cancelTokenSource) {
        cancelTokenSource.cancel()
      }

      cancelTokenSource = axios.CancelToken.source()
    } else {
      // if a request is ongoing, cancel it
      if (this.cancelTokenSource) {
        this.cancelTokenSource.cancel()
      }

      // create a new CancelToken
      this.cancelTokenSource = axios.CancelToken.source()
    }

    this.loading()

    this.attributes.query.items = []

    this.attributes.query.total = 0

    this.attributes.query.showing = 0

    let data = null

    try {
      const params = JSON.parse(JSON.stringify(this.attributes.params))

      const url = path || this.baseUrl

      const response = await axios
        .get(url, {
          params,
          cancelToken: this.globalCancel
            ? cancelTokenSource.token
            : this.cancelTokenSource.token
        })
        .catch((error) => {
          this.failed()

          throw error
        })

      data = response.data

      if (!data || !data.query || !data.query.items) {
        this.failed()

        throw Error('Response format is invalid.')
      }

      this.loaded()

      Object.assign(this.attributes.query, data.query, {
        items: data.query.items.map((item) => this.transformItem(item))
      })

      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        this.loaded()
        console.error('Request cancelled')
      } else {
        this.failed()
        this.errors.set(error, this.errorBag)
        throw error
      }
    }
  }

  onPageChange(value) {
    this.attributes.params.page = value

    if (this.options.router) {
      return Promise.resolve().then(() => {
        this.refreshUrl()
      })
    } else {
      return this.load().then(() => {
        this.refreshUrl()
      })
    }
  }

  onQueryUpdate(to, from, next) {
    if (to.path === from.path && to.fullPath !== from.fullPath) {
      // this.mergeSearch()
      this.load()
    }
    next()
  }

  async applyFilter() {
    this.errors.clear(null, this.errorBag)

    // if a request is ongoing, cancel it
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel()
    }

    this.loading()

    // create a new CancelToken
    this.cancelTokenSource = axios.CancelToken.source()

    this.attributes.query.items = []

    this.attributes.params.page = 1

    this.attributes.query.total = 0

    this.attributes.query.showing = 0

    let data = null

    try {
      const params = JSON.parse(JSON.stringify(this.attributes.params))

      const url = this.baseUrl

      const response = await axios
        .get(url, {
          params,
          cancelToken: this.cancelTokenSource.token
        })
        .catch((error) => {
          this.failed()

          throw error
        })

      data = response.data
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request cancelled')
        return // early return if request is cancelled
      } else {
        this.failed()
        this.errors.set(error, this.errorBag)
        throw error
      }
    }

    this.refreshUrl()

    if (!data || !data.query || !data.query.items) {
      this.failed()

      throw Error('Response format is invalid.')
    }

    Object.assign(this.attributes.query, data.query, {
      items: data.query.items.map((item) => this.transformItem(item))
    })

    await nextTick()

    this.loaded()

    this.hideFilter()
  }

  showFilter() {
    this.attributes.state.filter = true
  }

  hideFilter() {
    this.attributes.state.filter = false
  }

  cancelFilter() {
    this.mergeSearch()

    this.attributes.state.filter = false
  }

  resetFilter(url = null) {
    Object.assign(this.attributes.params, this.structure)

    this.refreshUrl()

    this.attributes.state.filter = false

    return this.load(url)
  }

  getError(key) {
    return this.errors.get(key, this.errorBag)
  }

  clearError(key) {
    this.errors.clear(key, this.errorBag)
  }

  loaded() {
    this.attributes.state.list = 'loaded'
  }

  loading() {
    this.attributes.state.list = 'loading'
  }

  remove(callback) {
    const index = this.attributes.query.items.findIndex(callback)

    if (index === -1) {
      return
    }

    this.attributes.query.items.splice(index, 1)

    return this.reload()
  }

  failed() {
    this.attributes.state.list = 'failed'
  }
}
