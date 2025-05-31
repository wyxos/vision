import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Listing from '../src/utilities/Listing'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('Listing', () => {
  let listing
  const defaultQuery = { page: 1, query: '' }
  const apiUrl = '/api/listings'

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()

    // Mock window.location
    vi.stubGlobal('window', { location: { search: '?page=1&name=test' } })

    // Create a new listing instance for each test
    listing = Listing.create(defaultQuery)
    listing.loadFrom(apiUrl)

    // Setup default axios response
    axios.get.mockResolvedValue({
      data: {
        listing: {
          items: [{ id: 1, name: 'Item 1' }],
          total: 10,
          perPage: 10,
          showing: 1
        },
        filters: []
      }
    })
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should initialize with the provided query', () => {
    expect(listing.filter.query.page).toBe(1)
    expect(listing.filter.query.query).toBe('')
    expect(listing.loadUrl).toBe(apiUrl)
  })

  it('should call filter.reset when resetting filter', async () => {
    // Create a new listing with a name property in the filter
    const testListing = new Listing({
      name: ''
    })
    testListing.loadFrom(apiUrl)

    // Mock axios for this specific test
    axios.get.mockResolvedValue({
      data: { listing: {}, filters: [] }
    })

    // Spy on the filter.reset method
    const resetSpy = vi.spyOn(testListing.filter, 'reset')

    // Change the filter value
    testListing.filter.query.name = 'test'

    // Reset and verify the method was called
    await testListing.resetSearch()
    expect(resetSpy).toHaveBeenCalled()
    expect(testListing.filter.applied).toEqual([])
  })

  it('should call filter.reset when programmatically setting filter', async () => {
    // Create a new listing
    const testListing = new Listing()
    testListing.loadFrom(apiUrl)

    // Mock axios for this specific test
    axios.get.mockResolvedValue({
      data: { listing: {}, filters: [] }
    })

    // Set filter programmatically
    testListing.setFilter({
      name: ''
    })

    // Spy on the filter.reset method
    const resetSpy = vi.spyOn(testListing.filter, 'reset')

    // Change the filter value
    testListing.filter.query.name = 'test'

    // Reset and verify the method was called
    await testListing.resetSearch()
    expect(resetSpy).toHaveBeenCalled()
    expect(testListing.filter.applied).toEqual([])
  })

  it('should call filter.reset after a search', async () => {
    // Create a new listing with a name property in the filter
    const testListing = new Listing({
      name: ''
    })
    testListing.loadFrom(apiUrl)

    // Mock axios for this specific test
    axios.get.mockResolvedValue({
      data: { listing: {}, filters: [] }
    })

    // Change the filter value
    testListing.filter.query.name = 'test'

    // Perform search
    await testListing.search()
    expect(axios.get).toHaveBeenCalledWith(apiUrl, {
      params: expect.objectContaining({ name: 'test' })
    })

    // Spy on the filter.reset method
    const resetSpy = vi.spyOn(testListing.filter, 'reset')

    // Reset and verify the method was called
    await testListing.resetSearch()
    expect(resetSpy).toHaveBeenCalled()
    expect(testListing.filter.applied).toEqual([])
  })

  it('should handle pagination correctly', async () => {
    // Test page change
    await listing.onPageChange(2)
    expect(listing.filter.query.page).toBe(2)
    expect(axios.get).toHaveBeenCalledWith(apiUrl, {
      params: expect.objectContaining({ page: 2 })
    })

    // Test next page
    await listing.next()
    expect(listing.filter.query.page).toBe(3)
    expect(axios.get).toHaveBeenCalledWith(apiUrl, {
      params: expect.objectContaining({ page: 3 })
    })
  })

  it('should handle loading states correctly', async () => {
    expect(listing.isLoading).toBe(false)

    // Start loading
    const promise = listing.load()
    expect(listing.isLoading).toBe(true)

    // Complete loading
    await promise
    expect(listing.isLoaded).toBe(true)
  })

  it('should handle router integration', async () => {
    const mockRouter = {
      push: vi.fn().mockResolvedValue(true)
    }

    const mockRoute = {
      query: { page: 1 }
    }

    // Setup watch mock
    vi.mock('vue', async () => {
      const actual = await vi.importActual('vue')
      return {
        ...actual,
        watch: vi.fn()
      }
    })

    listing.useRouter(mockRouter, mockRoute)

    // Test search with router
    listing.filter.query.name = 'router-test'
    await listing.search()

    expect(mockRouter.push).toHaveBeenCalledWith({
      query: expect.objectContaining({ name: 'router-test' })
    })

    // Test resetSearch with router
    await listing.resetSearch()
    expect(mockRouter.push).toHaveBeenCalledWith({ query: {} })
  })
})
