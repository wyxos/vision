import { describe, it, expect } from 'vitest'
import FormErrors from '../../src/utilities/FormErrors'

describe('FormErrors', () => {
  it('creates instance and manages bags', () => {
    const errors = FormErrors.create()
    errors.createBag('custom')
    expect(errors.all('custom')).toEqual([])
  })

  it('sets errors from response and retrieves them', () => {
    const errors = FormErrors.create()
    const responseError = {
      response: {
        data: {
          errors: {
            name: ['required'],
            email: ['invalid']
          }
        }
      }
    }

    errors.set(responseError)

    expect(errors.has('name')).toBe(true)
    expect(errors.get('name')).toEqual({
      message: 'required',
      variant: 'danger'
    })
    expect(errors.all()).toEqual([
      { key: 'name', message: 'required' },
      { key: 'email', message: 'invalid' }
    ])
  })

  it('throws when setting with non validation error', () => {
    const errors = FormErrors.create()
    expect(() => errors.set({})).toThrow()
  })

  it('updates and clears errors', () => {
    const errors = FormErrors.create()
    errors.setOne('field', 'invalid')
    expect(errors.get('field')).toEqual({
      message: 'invalid',
      variant: 'danger'
    })

    errors.setOne('field', 'changed')
    expect(errors.get('field')).toEqual({
      message: 'changed',
      variant: 'danger'
    })

    errors.clear('field')
    expect(errors.has('field')).toBe(false)

    errors.setOne('field', 'again')
    errors.clear()
    expect(errors.all()).toEqual([])
  })
})
