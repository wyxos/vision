import { reactive } from 'vue'
import axios from 'axios'

export default class ResourceList {
  structure = {}

  query = reactive({
    items: [],
    perPage: 0,
    total: 0,
    isLoading: false,
    isLoaded: false,
    isFilterActive: false
  })

  params = reactive({
    page: 1
  })

  router = null

  static create(resource, structure = {}, options = {}, router) {
    options = Object.assign(
      { base: '/api/admin', route: `${resource}.index` },
      options
    )

    const base = options.base

    const urls = {
      route: options.route,
      index: options.index || `${base}/${resource}/index`,
      destroy: `${base}/${resource}/destroy`
    }

    const instance = new this()

    instance.options = options

    instance.structure = structure

    instance.params = Object.assign(instance.params, structure)

    instance.router = router

    instance.urls = urls

    return instance
  }

  async fetch(url) {
    this.query.isLoading = true

    this.query.isLoaded = false

    const { data } = await axios
      .get(url || this.urls.index, {
        params: this.params
      })
      .catch((error) => {
        this.query.isLoading = false

        throw error
      })

    await this.router.push({ name: this.urls.route, query: this.params })

    this.query.isLoading = false

    this.query.isLoaded = true

    return data
  }

  async load(url) {
    const data = await this.fetch(url)

    Object.assign(this.query, data.query, {
      items: data.query.items.map((item) => ({
        ...item,
        isProcessing: false
      }))
    })

    return data
  }

  onPageChange(value) {
    this.params.page = value

    return this.load()
  }

  async action(path, { row, index, remove, method }, attributes = {}) {
    row.isProcessing = true

    const payload = {
      id: row.id,
      ...attributes
    }

    if (method === 'delete') {
      const { data } = await axios
        .delete(path, {
          data: payload
        })
        .catch((error) => {
          row.isProcessing = false

          throw error
        })

      row.isProcessing = false

      if (data.row) {
        Object.assign(row, data.row)
      }
    } else {
      const { data } = await axios.post(path, payload).catch((error) => {
        row.isProcessing = false

        throw error
      })

      row.isProcessing = false

      if (data.row) {
        Object.assign(row, data.row)
      }
    }

    if (remove) {
      const data = await this.fetch()

      this.query.items.splice(index, 1)

      if (!data.query.items.length) {
        this.params.page--

        await this.load()

        return
      }

      if (this.query.items.length < data.query.items.length) {
        this.query.items.push(data.query.items[data.query.items.length - 1])
      }
    }
  }

  destroy(record, payload) {
    return this.action(this.urls.destroy, { ...record, remove: true }, payload)
  }

  async resetFilter(url = null) {
    Object.assign(this.params, this.structure)

    this.query.isFilterActive = false

    await this.load(url)
  }
}
