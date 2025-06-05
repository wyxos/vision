import { describe, it, beforeEach, expect, vi } from 'vitest'
import axios from 'axios'
import Listing from '../../src/utilities/Listing'

vi.mock('axios')
vi.stubGlobal('window', { location: { search: '' } })

describe('Listing', () => {
  beforeEach(() => {
    axios.get.mockReset()
    window.location.search = ''
  })

  it('searches using current filter', async () => {
    axios.get.mockResolvedValue({ data: { listing: { items: ['a'], total: 1, perPage: 10 } } })

    const listing = Listing.create({ page: 1, name: '' }).loadFrom('/items')
    await listing.search()

    expect(axios.get).toHaveBeenCalledWith('/items', { params: { page: 1, name: '' } })
    expect(listing.attributes.items).toEqual(['a'])
    expect(listing.isLoaded).toBe(true)
  })

  it('loads using query params from window', async () => {
    window.location.search = '?page=2&name=test'
    axios.get.mockResolvedValue({ data: { listing: { items: [1, 2], total: 2, perPage: 10 }, filters: [{ key: 'name', rawValue: 'test' }] } })

    const listing = Listing.create({ page: 1, name: '' }).loadFrom('/items')
    await listing.load()

    expect(listing.name).toBe('test')
    expect(listing.filter.query.page).toBe(1)
    expect(listing.attributes.items).toEqual([1, 2])
    expect(listing.filter.applied).toEqual([{ key: 'name', rawValue: 'test' }])
  })

  it('resets search and clears applied filters', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1, name: '' }).loadFrom('/items')
    listing.filter.applied = [{ key: 'name', rawValue: 'john' }]

    await listing.resetSearch()

    expect(listing.filter.applied).toEqual([])
    expect(axios.get).toHaveBeenCalledTimes(2)
  })

  it('increments page on next', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1 }).loadFrom('/items')

    await listing.next()

    expect(listing.filter.query.page).toBe(2)
    expect(axios.get).toHaveBeenCalledWith('/items', { params: { page: 2 } })
  })

  it('applies transform callback before search', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ name: 'john' }).loadFrom('/items')
    listing.transform(q => ({ ...q, name: q.name.toUpperCase() }))

    await listing.search()

    expect(axios.get).toHaveBeenCalledWith('/items', { params: { page: 1, name: 'JOHN' } })
  })
})
