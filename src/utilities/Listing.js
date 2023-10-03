import { reactive } from 'vue'
import axios from 'axios'
import LoadState from './LoadState'
import qs from 'query-string'
import useFormErrors from './useFormErrors'

let cancelTokenSource

export default class Listing {
  api = null

  baseUrl = null

  structure = null

  options = null

  errors = null

  errorBag = 'default'

  states = {
    load: LoadState.create(),
    fetch: LoadState.create(),
    filter: LoadState.create()
  }

  query = reactive({
    items: [],
    showing: 0,
    perPage: 0,
    total: 0
  })

  params = reactive({
    page: 1
  })

  state = reactive({
    isFilterActive: false
  })

  get config() {
    return {
      data: this.query.items,
      total: this.query.total,
      currentPage: this.params.page,
      perPage: this.query.perPage,
      loading: this.isLoading,
      paginated: true,
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
    return this.states.fetch.isLoading
  }

  get isLoaded() {
    return this.states.fetch.isLoaded
  }

  get isFailure() {
    return this.states.fetch.isFailure
  }

  get isFilterLoading() {
    return this.states.filter.isLoading
  }

  get isFilterActive() {
    return this.state.isFilterActive
  }

  get isEmpty(){
    return this.isLoaded && this.query.items.length === 0
  }

  get isDirty() {
    return JSON.stringify(this.structure) !== JSON.stringify(this.params)
  }

  get isSearchEmpty(){
    return this.isLoaded && this.isDirty && this.query.items.length === 0
  }

  setUrl(url){
    this.baseUrl = url

    return this
  }

  static create(params = {}, options = {}) {
    const instance = new Listing()

    instance.errors = useFormErrors()
    instance.errors.createBag(this.errorBag)

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

    instance.api = axios.create(options.axios || {})

    return instance
  }

  setParameters(params) {
    const structure = JSON.parse(JSON.stringify(params))

    this.structure = Object.assign({}, structure)

    this.params = reactive(params)
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

    Object.assign(this.params, this.structure, query)
  }

  async fetch(path, cancelToken) {
    this.states.fetch.loading()

    const params = JSON.parse(JSON.stringify(this.params))

    const url = path || this.baseUrl

    try {
      const { data } = await this.api.get(url, {
        params,
        cancelToken
      })

      this.states.fetch.loaded()

      if (this.options.enableSearchUpdate) {
        this.refreshUrl()
      }

      return data
    } catch (error) {
      this.states.fetch.failed()
    }
  }

  async reload(path) {
    const { data } = await this.api.get(path || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    })

    Object.assign(this.query, data.query, {
      items: data.query.items.map((item) => this.transformItem(item))
    })

    return data
  }

  refreshUrl() {
    const base = window.location.href.replace(/\?.*/, '')

    const params = JSON.parse(JSON.stringify(this.params))

    // Filter out null and undefined parameters
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v != null)
    )

    const url =
      base + '?' + qs.stringify(filteredParams, { arrayFormat: 'bracket' })

    window.history.pushState({}, '', url)
  }

  push(item) {
    this.query.items.push(this.transformItem(item))
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

    // if a request is ongoing, cancel it
    if (cancelTokenSource) {
      cancelTokenSource.cancel()
    }

    // create a new CancelToken
    cancelTokenSource = axios.CancelToken.source()

    this.states.fetch.loading()

    this.query.items = []

    this.query.total = 0

    this.query.showing = 0

    let data = null

    try {
      this.states.fetch.loading()

      const params = JSON.parse(JSON.stringify(this.params))

      const url = path || this.baseUrl

      const response = await this.api
        .get(url, {
          params,
          cancelToken: cancelTokenSource.token
        })
        .catch((error) => {
          this.states.fetch.failed()

          throw error
        })

      this.states.fetch.loaded()

      data = response.data

      this.states.fetch.loaded()

      if (!data || !data.query || !data.query.items) {
        this.states.fetch.failed()

        throw Error('Response format is invalid.')
      }

      Object.assign(this.query, data.query, {
        items: data.query.items.map((item) => this.transformItem(item))
      })

      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        this.states.fetch.loaded()
        console.error('Request cancelled')
      } else {
        this.states.fetch.failed()
        this.errors.set(error, this.errorBag)
        throw error
      }
    }
  }

  onPageChange(value) {
    this.params.page = value

    return this.load()
  }

  async patch({ path, props, payload } = {}) {
    const { row } = props

    payload = {
      id: row.id,
      ...payload
    }

    const { data } = await this.api
      .patch(path || this.baseUrl, payload)
      .catch((error) => {
        throw error
      })

    if (data.patch) {
      Object.assign(row, data.patch)
    }

    const fetch = await this.fetch()

    if (!fetch.query.items.length) {
      this.params.page--

      await this.load()

      return data
    }

    // filter items to remove

    // filter items to add

    return data
  }

  async delete(options) {
    return this.processRowAndRefreshList({
      ...options,
      method: 'delete',
      state: 'delete'
    })
  }

  async restore(options) {
    return this.processRowAndRefreshList({
      ...options,
      method: 'patch',
      state: 'restore'
    })
  }

  async processRowAndRefreshList({ path, props, payload, state, method } = {}) {
    const { row, index } = props

    payload = {
      id: row.id,
      ...payload
    }

    let rowState = row.states[state]

    if (!rowState) {
      rowState = row.states[state] = LoadState.create()
    }

    rowState.loading()

    const { data } = await this.api[method](
      path || this.baseUrl,
      payload
    ).catch((error) => {
      rowState.failed()

      throw error
    })

    rowState.loaded()

    if (data.row) {
      Object.assign(row, data.row)
    }

    const fetch = await this.fetch()

    this.query.items.splice(index, 1)

    if (!fetch.query.items.length) {
      this.params.page--

      await this.load()

      return data
    }

    if (this.query.items.length < fetch.query.items.length) {
      const item = fetch.query.items[fetch.query.items.length - 1]

      this.push(item)
    }

    return data
  }

  async applyFilter() {
    this.errors.clear(null, this.errorBag)

    // if a request is ongoing, cancel it
    if (cancelTokenSource) {
      cancelTokenSource.cancel()
    }

    this.states.filter.loading()
    this.states.load.loading()

    // create a new CancelToken
    cancelTokenSource = axios.CancelToken.source()

    this.query.items = []

    this.query.total = 0

    this.query.showing = 0

    let data = null

    try {
      const params = JSON.parse(JSON.stringify(this.params))

      const url = this.baseUrl

      const response = await this.api
        .get(url, {
          params,
          cancelToken: cancelTokenSource.token
        })
        .catch((error) => {
          this.states.filter.failed()

          throw error
        })

      data = response.data
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request cancelled')
        return // early return if request is cancelled
      } else {
        this.states.filter.failed()
        this.states.load.failed()
        this.errors.set(error, this.errorBag)
        throw error
      }
    }

    this.refreshUrl()

    if (!data || !data.query || !data.query.items) {
      this.states.filter.failed()

      throw Error('Response format is invalid.')
    }

    Object.assign(this.query, data.query, {
      items: data.query.items.map((item) => this.transformItem(item))
    })

    this.states.filter.loaded()
    this.states.load.loaded()

    this.state.isFilterActive = false
  }

  showFilter() {
    this.state.isFilterActive = true
  }

  cancelFilter() {
    this.state.isFilterActive = false
  }

  async resetFilter(resetType = 'url', url = null) {
    if (resetType === 'url') {
      // Reset based on the URL
      this.mergeSearch()
    } else if (resetType === 'initial') {
      // Reset to initial structure
      Object.assign(this.params, this.structure)

      this.refreshUrl()
    }

    this.state.isFilterActive = false

    await this.load(url)
  }

  getError(key) {
    return this.errors.get(key, this.errorBag)
  }

  clearError(key) {
    this.errors.clear(key, this.errorBag)
  }

  get isResettable() {
    return JSON.stringify(this.params) !== JSON.stringify(this.structure)
  }
}
