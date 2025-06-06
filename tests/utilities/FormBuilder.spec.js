import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import FormBuilder from '../../src/utilities/FormBuilder'

vi.mock('axios')
vi.stubGlobal('window', {})

describe('FormBuilder', () => {
  beforeEach(() => {
    axios.post.mockReset()
    axios.get.mockReset()
  })

  it('creates instance and exposes fields', () => {
    const form = FormBuilder.create({ name: '', age: 0 })
    form.name = 'John'
    expect(form.name).toBe('John')
    expect(form.toJson()).toEqual({ name: 'John', age: 0 })
  })

  it('submits form and resets on success', async () => {
    let sent
    axios.post.mockImplementation((url, data) => {
      sent = { url, data: { ...data } }
      return Promise.resolve({ data: { id: 1 } })
    })
    const form = FormBuilder.create({ name: '' }).resetAfterSubmit()
    form.name = 'John'

    await form.post('/api')

    expect(sent).toEqual({ url: '/api', data: { name: 'John' } })
    expect(form.isSubmitted).toBe(true)
    expect(form.successful).toBe(true)
    expect(form.wasSubmitting).toBe(true)
    expect(form.name).toBe('')
  })

  it('transforms data before submit', async () => {
    axios.post.mockResolvedValueOnce({ data: {} })
    const form = FormBuilder.create({ name: 'john' })
    form.transform((data) => ({ ...data, name: data.name.toUpperCase() }))

    await form.post('/api')

    expect(axios.post.mock.calls[0][0]).toBe('/api')
    expect(axios.post.mock.calls[0][1]).toEqual({ name: 'JOHN' })
  })

  it('handles failed submission and sets errors', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { errors: { name: ['required'] } } }
    })
    const form = FormBuilder.create({ name: '' })
    await expect(form.post('/api')).rejects.toBeDefined()
    expect(form.hasError('name')).toBe(true)
    expect(form.failed).toBe(true)
    expect(form.wasSubmitting).toBe(true)
  })

  it('loads data and updates state on success', async () => {
    axios.get.mockResolvedValueOnce({ data: { form: { name: 'Jane' } } })
    const form = FormBuilder.create({ name: '' })

    await form.load('/api')

    expect(form.loaded).toBe(true)
    expect(form.wasLoading).toBe(true)
    expect(form.name).toBe('Jane')
  })

  it('handles failed load', async () => {
    axios.get.mockRejectedValueOnce({})
    const form = FormBuilder.create({ name: '' })

    await expect(form.load('/api')).rejects.toBeDefined()

    expect(form.isLoadFailed).toBe(true)
    expect(form.wasLoading).toBe(true)
  })

  it('tracks dirty state correctly', () => {
    const form = FormBuilder.create({ name: '', email: '' })

    // Initially the form should not be dirty
    expect(form.isDirty).toBe(false)

    // Form should be dirty after changing a value
    form.name = 'John'
    expect(form.isDirty).toBe(true)

    // Form should not be dirty after resetting
    form.reset()
    expect(form.isDirty).toBe(false)

    // Form should be dirty after changing a value again
    form.email = 'john@example.com'
    expect(form.isDirty).toBe(true)
  })
})
