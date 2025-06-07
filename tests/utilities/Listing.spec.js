import { describe, it, beforeEach, expect, vi } from 'vitest'
import axios from 'axios'
import Listing from '../../src/utilities/Listing'

vi.mock('axios')
vi.stubGlobal('window', { location: { search: '' } })
vi.stubGlobal(
  'AbortController',
  class AbortController {
    signal = { aborted: false }
    abort() {
      this.signal.aborted = true
    }
  }
)

describe('Listing', () => {
  beforeEach(() => {
    axios.get.mockReset()
    window.location.search = ''
  })

  it('searches using current filter', async () => {
    axios.get.mockResolvedValue({
      data: { listing: { items: ['a'], total: 1, perPage: 10 } }
    })

    const listing = Listing.create({ page: 1, name: '' })
    listing.load('/items')
    await listing.search(true)

    // Check that axios.get was called with the correct URL and params
    expect(axios.get).toHaveBeenCalledTimes(2)
    const lastCall = axios.get.mock.calls[1]
    expect(lastCall[0]).toBe('/items')
    expect(lastCall[1].params).toEqual({ page: 1, name: '' })

    expect(listing.attributes.items).toEqual(['a'])
    expect(listing.isSearched).toBe(true)
  })

  it('loads using query params from window', async () => {
    window.location.search = '?page=2&name=test'
    axios.get.mockResolvedValue({
      data: {
        listing: { items: [1, 2], total: 2, perPage: 10 },
        filters: [{ key: 'name', rawValue: 'test' }]
      }
    })

    const listing = Listing.create({ page: 1, name: '' })
    await listing.load('/items')

    expect(listing.name).toBe('test')
    expect(listing.filter.query.page).toBe(1)
    expect(listing.attributes.items).toEqual([1, 2])
    expect(listing.filter.applied).toEqual([{ key: 'name', rawValue: 'test' }])
  })

  it('resets search and clears applied filters', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1, name: '' })
    listing.load('/items')
    listing.filter.applied = [{ key: 'name', rawValue: 'john' }]

    await listing.resetSearch()

    expect(listing.filter.applied).toEqual([])
    expect(axios.get).toHaveBeenCalledTimes(2)
  })

  it('increments page on next', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1 })
    listing.load('/items')

    await listing.next()

    expect(listing.filter.query.page).toBe(2)

    // Check that axios.get was called with the correct URL and params
    const lastCall = axios.get.mock.calls[axios.get.mock.calls.length - 1]
    expect(lastCall[0]).toBe('/items')
    expect(lastCall[1].params).toEqual({ page: 2 })
  })

  it('applies transform callback before search', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ name: 'john' })
    listing.load('/items')
    listing.transform((q) => ({ ...q, name: q.name.toUpperCase() }))

    await listing.search()

    // Check that axios.get was called with the correct URL and params
    const lastCall = axios.get.mock.calls[axios.get.mock.calls.length - 1]
    expect(lastCall[0]).toBe('/items')
    expect(lastCall[1].params).toEqual({ page: 1, name: 'JOHN' })
  })

  it('tracks state correctly during search operation', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1 })
    listing.load('/items')

    // Initial state
    expect(listing.isSearching).toBe(false)
    expect(listing.isSearched).toBe(false)
    expect(listing.isSearchFailed).toBe(false)

    // Start search
    const searchPromise = listing.search()

    // During search
    expect(listing.isSearching).toBe(true)
    expect(listing.isSearched).toBe(false)
    expect(listing.isSearchFailed).toBe(false)

    // After search completes
    await searchPromise
    expect(listing.isSearching).toBe(false)
    expect(listing.isSearched).toBe(true)
    expect(listing.isSearchFailed).toBe(false)
  })

  it('tracks state correctly during failed search operation', async () => {
    axios.get.mockRejectedValue(new Error('Network error'))
    const listing = Listing.create({ page: 1 })
    // load() sets internal URL and returns a promise. Since the axios call is
    // mocked to reject, we must catch the promise to avoid an unhandled
    // rejection during the test.
    listing.load('/items').catch(() => {})

    // Start search
    const searchPromise = listing.search().catch(() => {})

    // During search
    expect(listing.isSearching).toBe(true)

    // After search fails
    await searchPromise
    expect(listing.isSearching).toBe(false)
    expect(listing.isSearched).toBe(false)
    expect(listing.isSearchFailed).toBe(true)
  })

  it('cancels previous request when making a new one', async () => {
    axios.get.mockResolvedValue({ data: { listing: {} } })
    const listing = Listing.create({ page: 1 })
    listing.load('/items')

    // Start first search
    const firstSearch = listing.search()

    // Verify abort controller is set
    expect(listing.abortSearchController).toBeDefined()
    const firstController = listing.abortSearchController

    // Start second search
    listing.search()

    // Verify first controller was aborted
    expect(firstController.signal.aborted).toBe(true)

    // Verify a new controller was created
    expect(listing.abortSearchController).not.toBe(firstController)

    await firstSearch.catch(() => {})
  })

  it('handles success and failure callbacks', async () => {
    const successData = { listing: { items: [1, 2], total: 2 } }
    axios.get.mockResolvedValue({ data: successData })

    const listing = Listing.create({ page: 1 })
    listing.load('/items')

    const successSpy = vi.fn().mockReturnValue('success')
    const failureSpy = vi.fn().mockReturnValue('failure')

    listing.onSuccess(successSpy)
    listing.onFail(failureSpy)

    const result = await listing.search()

    expect(successSpy).toHaveBeenCalledWith(successData)
    expect(failureSpy).not.toHaveBeenCalled()
    expect(result).toBe('success')

    // Test failure callback
    axios.get.mockRejectedValue(new Error('API error'))

    try {
      await listing.search()
    } catch (error) {
      expect(failureSpy).toHaveBeenCalled()
      expect(error).toBe('failure')
    }
  })
})
