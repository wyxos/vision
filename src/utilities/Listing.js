import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import Filter from './Filter.js'
import queryString from 'query-string'

export default class Listing {
  loadUrl = ''
  loadState = ref('')
  searchState = ref('')
  refreshState = ref('')

  abortLoadController = null
  abortSearchController = null
  abortRefreshController = null

  router = null

  transformCallback = null

  formatCallback = null

  /**
   * Filter out empty parameters from a query object
   * @param {Object} query - The query object to filter
   * @returns {Object} - A new query object with empty parameters removed
   */
  filterEmptyParams(query) {
    const filteredQuery = {}

    for (const key in query) {
      // Skip if the property is null, undefined, or an empty string
      if (query[key] === null || query[key] === undefined || query[key] === '') {
        continue
      }

      filteredQuery[key] = query[key]
    }

    return filteredQuery
  }

  attributes = reactive({
    items: [],
    showing: 0,
    perPage: 0,
    total: 0
  })

  callbacks = {
    success: null,
    failure: null
  }

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
            let obj = target.filter.query

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
    return this.loadState.value === 'loading'
  }

  get isLoaded() {
    return this.loadState.value === 'loaded'
  }

  get isLoadFailed() {
    return this.loadState.value === 'failed'
  }

  get isSearching() {
    return this.searchState.value === 'loading'
  }

  get isSearched() {
    return this.searchState.value === 'loaded'
  }

  get isSearchFailed() {
    return this.searchState.value === 'failed'
  }

  get isRefreshing() {
    return this.refreshState.value === 'loading'
  }

  get isRefreshed() {
    return this.refreshState.value === 'loaded'
  }

  get isRefreshFailed() {
    return this.refreshState.value === 'failed'
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

  search(preserveEmpty = false) {
    let query = Object.assign({}, this.filter.query)

    if (this.transformCallback) {
      query = this.transformCallback(query)
    }

    if (this.router) {
      return this.router.push({ query })
    }

    this.searching()

    // Use the original query if preserveEmpty is true, otherwise filter out empty parameters
    const queryToUse = preserveEmpty ? query : this.filterEmptyParams(query)

    const axiosConfig = { params: queryToUse }

    // If there's an ongoing request, abort it
    if (this.abortSearchController) {
      this.abortSearchController.abort()
    }

    // Create a new AbortController
    this.abortSearchController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortSearchController.signal

    return axios
      .get(this.loadUrl, axiosConfig)
      .then((response) => {
        this.searched()

        // Process the response using the formatResponse callback or default processing
        const processedData = this.processResponse(response)

        if (processedData.listing) {
          Object.assign(this.attributes, processedData.listing)
        }

        if (processedData.filters) {
          this.filter.applied = processedData.filters
        }

        return this.callbacks.success
          ? this.callbacks.success(processedData)
          : response
      })
      .catch((error) => {
        // Don't handle aborted requests as errors
        if (error.name === 'CanceledError' || error.name === 'AbortError') {
          return Promise.reject(error)
        }

        this.searchFailed()

        if (this.callbacks.failure) {
          return Promise.reject(this.callbacks.failure(error))
        }

        return Promise.reject(error)
      })
  }

  load(url) {
    this.loadUrl = url

    const urlQuery = queryString.parse(window.location.search, {
      parseNumbers: true,
      parseBooleans: true
    })

    Object.assign(this.filter.query, urlQuery)

    this.filter.query.page = 1

    let query = Object.assign({}, this.filter.query)

    if (this.transformCallback) {
      query = this.transformCallback(query)
    }

    this.loading()

    // Filter out empty parameters
    const filteredQuery = this.filterEmptyParams(query)

    const axiosConfig = { params: filteredQuery }

    // If there's an ongoing request, abort it
    if (this.abortLoadController) {
      this.abortLoadController.abort()
    }

    // Create a new AbortController
    this.abortLoadController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortLoadController.signal

    return axios
      .get(url, axiosConfig)
      .then((response) => {
        this.loaded()

        // Process the response using the formatResponse callback or default processing
        const processedData = this.processResponse(response)

        if (processedData.listing) {
          Object.assign(this.attributes, processedData.listing)
        }

        if (processedData.filters) {
          this.filter.applied = processedData.filters
        }

        return this.callbacks.success
          ? this.callbacks.success(processedData)
          : response
      })
      .catch((error) => {
        // Don't handle aborted requests as errors
        if (error.name === 'CanceledError' || error.name === 'AbortError') {
          return Promise.reject(error)
        }

        this.loadFailed()

        if (this.callbacks.failure) {
          return Promise.reject(this.callbacks.failure(error))
        }

        return Promise.reject(error)
      })
  }

  refresh() {
    let query = Object.assign({}, this.filter.query)

    if (this.transformCallback) {
      query = this.transformCallback(query)
    }

    this.refreshing()

    // Filter out empty parameters
    const filteredQuery = this.filterEmptyParams(query)

    const axiosConfig = { params: filteredQuery }

    // If there's an ongoing request, abort it
    if (this.abortRefreshController) {
      this.abortRefreshController.abort()
    }

    // Create a new AbortController
    this.abortRefreshController = new AbortController()

    // Add the signal to the axios config
    axiosConfig.signal = this.abortRefreshController.signal

    return axios
      .get(this.loadUrl, axiosConfig)
      .then((response) => {
        this.refreshed()

        // Process the response using the formatResponse callback or default processing
        const processedData = this.processResponse(response)

        if (processedData.listing) {
          Object.assign(this.attributes, processedData.listing)
        }

        if (processedData.filters) {
          this.filter.applied = processedData.filters
        }

        return this.callbacks.success
          ? this.callbacks.success(processedData)
          : response
      })
      .catch((error) => {
        // Don't handle aborted requests as errors
        if (error.name === 'CanceledError' || error.name === 'AbortError') {
          return Promise.reject(error)
        }

        this.refreshFailed()

        if (this.callbacks.failure) {
          return Promise.reject(this.callbacks.failure(error))
        }

        return Promise.reject(error)
      })
  }

  loading() {
    this.loadState.value = 'loading'
    return this
  }

  loaded() {
    this.loadState.value = 'loaded'
    return this
  }

  loadFailed() {
    this.loadState.value = 'failed'
    return this
  }

  searching() {
    this.searchState.value = 'loading'
    return this
  }

  searched() {
    this.searchState.value = 'loaded'
    return this
  }

  searchFailed() {
    this.searchState.value = 'failed'
    return this
  }

  refreshing() {
    this.refreshState.value = 'loading'
    return this
  }

  refreshed() {
    this.refreshState.value = 'loaded'
    return this
  }

  refreshFailed() {
    this.refreshState.value = 'failed'
    return this
  }

  onPageChange(value) {
    this.filter.query.page = value

    return this.search()
  }


  reset() {
    this.filter.reset()

    return this.search()
  }

  clear(key) {
    this.filter.clear(key)

    return this.search()
  }

  useRouter(router, route) {
    this.router = router

    watch(
      () => route.query,
      () => this.refresh(),
      { deep: true }
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

    if (this.router) {
      return this.router.push({ query: {} }) // Clear query params without reload
    }

    return this.search()
  }

  transform(callback) {
    this.transformCallback = callback

    return this
  }

  onSuccess(callback) {
    this.callbacks.success = callback

    return this
  }

  onFail(callback) {
    this.callbacks.failure = callback

    return this
  }

  format(callback) {
    this.formatCallback = callback

    return this
  }

  /**
   * Format the response data to match what the listing expects
   * @param {Object} response - The axios response object
   * @returns {Object} - The formatted response data
   */
  processResponse(response) {
    if (this.formatCallback) {
      return this.formatCallback(response)
    }

    // Default formatting if no callback is provided
    return response.data
  }
}
