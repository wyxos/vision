import { reactive } from 'vue'
import axios from 'axios'
import LoadState from './LoadState'
import qs from 'query-string';

export default class Listing {
  api = null

  baseUrl = null

  structure = null

  options = null

  states = {
    fetch: new LoadState(),
    filter: new LoadState()
  }

  query = reactive({
    items: [],
    perPage: 0,
    total: 0
  })

  params = reactive({
    page: 1
  })

  state = reactive({
    isFilterActive: false
  })

  static create (params, options) {
    if (!options) {
      throw Error('Listing options have not been provided.')
    }

    const instance = new Listing()

    if (!params) {
      throw Error('Structure of search query required.')
    }

    instance.structure = Object.assign({}, JSON.parse(JSON.stringify(params)))

    instance.options = Object.assign({
      enableSearchUpdate: true,
      transformItem: (item) => item
    }, options)

    Object.assign(instance.params, params)

    if (instance.options.enableSearchUpdate) {
      instance.mergeSearch()
    }

    instance.baseUrl = options.baseUrl

    instance.api = axios.create(options.axios || {})

    return instance
  }

  mergeSearch () {
    const query = qs.parse(window.location.search, {
      arrayFormat: 'bracket'
    })

    Object.assign(this.params, this.structure, query)
  }

  tableConfig () {
    return {
      data: this.query.items,
      total: this.query.total,
      perPage: this.query.perPage,
      loading: this.isLoading
    }
  }

  async fetch (path) {
    this.states.fetch.loading()

    const params = JSON.parse(JSON.stringify(this.params))

    const url = path || this.baseUrl

    const { data } = await this.api.get(url, {
      params
    })
      .catch(error => {
        this.states.fetch.failed()

        throw error
      })

    this.states.fetch.loaded()

    if (this.options.enableSearchUpdate) {
      this.refreshUrl()
    }

    return data
  }

  async reload (path) {
    const { data } = await this.api.get(path || this.baseUrl, {
      params: JSON.parse(JSON.stringify(this.params))
    })

    Object.assign(this.query, data.query, {
      items: data.query.items.map(item => this.transformItem(item))
    })

    return data
  }

  refreshUrl () {
    const base = window.location.href.replace(/\?.*/, '')

    const params = JSON.parse(JSON.stringify(this.params))

    const url = base + '?' + qs.stringify(params, {arrayFormat: 'bracket'})

    window.history.replaceState({}, '', url)
  }

  push (item) {
    this.query.items.push(
      this.transformItem(
        item
      )
    )
  }

  transformItem (item) {
    return this.options.transformItem({
      ...item,
      states: {
        delete: new LoadState,
        patch: new LoadState
      }
    })
  }

  async load (path) {
    const data = await this.fetch(path)

    if (!data.query || !data.query.items) {
      this.states.fetch.failed()

      throw Error('Response format is invalid.')
    }

    Object.assign(this.query, data.query, {
      items: data.query.items.map(item => this.transformItem(item))
    })

    return data
  }

  onPageChange (value) {
    this.params.page = value

    return this.load()
  }

  async patch (options) {
    const { path, props, attributes } = options

    const { row, index } = props

    const payload = {
      id: row.id,
      ...attributes
    }

    const { data } = await this.api.patch(path || this.baseUrl, payload)
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

  async delete (options) {
    const { path, props, attributes } = options

    const { row, index } = props

    const payload = {
      id: row.id,
      ...attributes
    }

    row.states.delete.loading()

    const { data } = await this.api.delete(path || this.baseUrl, {
      data: payload
    })
      .catch((error) => {
        row.states.delete.failed()

        throw error
      })

    row.states.delete.loaded()

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

  get isLoading () {
    return this.states.fetch.isLoading
  }

  get isLoaded () {
    return this.states.fetch.isLoaded
  }

  get isFailure () {
    return this.states.fetch.isFailure
  }

  get isFilterLoading () {
    return this.states.filter.isLoading
  }

  get isFilterActive () {
    return this.state.isFilterActive
  }

  async applyFilter () {
    await this.load()

    this.state.isFilterActive = false
  }

  showFilter () {
    this.state.isFilterActive = true
  }

  cancelFilter () {
    this.state.isFilterActive = false
  }

  async resetFilter (url = null) {
    Object.assign(this.params, this.structure)

    this.state.isFilterActive = false

    await this.load(url)
  }
}
