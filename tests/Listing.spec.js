import { describe, it, expect, vi } from 'vitest'
import Listing from '../src/utilities/Listing'

vi.stubGlobal('window', { location: { search: '?page=1&name=test' } })
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { listing: {} } }))
  }
}))

describe('Listing', () => {
  it('allow reset filter', async () => {
    const listing = Listing.create({
      name: ''
    })

    expect(listing.name).toBe('')

    listing.name = 'test'

    expect(listing.name).toBe('test')

    await listing.resetSearch()

    expect(listing.name).toBe('')
  })

  it('allow reset programmatically set filter', async () => {
    const listing = Listing.create()

    listing.setFilter({
      name: ''
    })

    expect(listing.name).toBe('')

    listing.name = 'test'

    expect(listing.name).toBe('test')

    await listing.resetSearch()

    expect(listing.name).toBe('')
  })

  it('allow reset filter after a search', () => {})
})
