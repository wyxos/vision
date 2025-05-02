import { describe, it, expect } from 'vitest'

describe('Example Test Suite', () => {
  it('should add two numbers correctly', () => {
    const sum = 2 + 3
    expect(sum).toBe(5)
  })

  it('should return true for a truthy value', () => {
    const value = true
    expect(value).toBeTruthy()
  })
})
