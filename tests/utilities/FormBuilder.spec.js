import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import FormBuilder from '../../src/utilities/FormBuilder'

vi.mock('axios')
vi.stubGlobal('window', {})

describe('FormBuilder', () => {
  beforeEach(() => {
    axios.post.mockReset()
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
    expect(form.isSubmitFailed).toBe(true)
  })
})
