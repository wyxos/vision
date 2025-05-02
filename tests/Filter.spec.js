import { describe, it, expect, beforeEach, vi } from 'vitest'
import Filter from '../src/utilities/Filter'

describe('Filter', () => {
  let filter

  beforeEach(() => {
    filter = new Filter({ search: 'test' })
  })

  it('should initialize with default query values', () => {
    expect(filter.query.page).toBe(1)
    expect(filter.query.search).toBe('test')
    expect(filter.isVisible).toBe(false)
  })

  it('should toggle visibility', () => {
    expect(filter.isVisible).toBe(false)
    filter.show()
    expect(filter.isVisible).toBe(true)
    filter.hide()
    expect(filter.isVisible).toBe(false)
    filter.toggle()
    expect(filter.isVisible).toBe(true)
  })

  it('should detect if query is dirty', () => {
    expect(filter.isDirty).toBe(false)
    filter.query.search = 'changed'
    expect(filter.isDirty).toBe(true)
  })

  it('should reset query to original values', () => {
    filter.query.search = 'changed'
    expect(filter.isDirty).toBe(true)
    filter.reset()
    expect(filter.isDirty).toBe(false)
    expect(filter.query.search).toBe('test')
  })

  it('should clear a specific key in the query', () => {
    filter.query.search = 'changed'
    filter.clear('search')
    expect(filter.query.search).toBe('test')
  })

  it('should clear the entire query if no key is provided', () => {
    filter.query.search = 'changed'
    filter.clear()
    expect(filter.query.search).toBe('test')
  })

  it('should execute callback after clearing', () => {
    const callback = vi.fn()
    filter.clear('search', callback)
    expect(callback).toHaveBeenCalled()
  })

  it('should return applied query', () => {
    filter.applied = [{ key: 'search', rawValue: 'test' }]
    const appliedQuery = filter.getAppliedQuery()
    expect(appliedQuery).toEqual({ search: 'test' })
  })

  it('should check if a key is default', () => {
    expect(filter.isDefault('search')).toBe(true)
    filter.query.search = 'changed'
    expect(filter.isDefault('search')).toBe(false)
  })
})
