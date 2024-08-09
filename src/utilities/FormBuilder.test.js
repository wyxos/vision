import { describe, test, expect } from 'vitest'
import FormBuilder from './FormBuilder.js'

describe('FormBuilder', () => {
  test('initialize', () => {
    const form = FormBuilder.create({
      name: ''
    })

    expect(form).toBeInstanceOf(FormBuilder)

    form.name = 'John Doe'
    expect(form.name).toBe('John Doe')
  })

  test('Assign as property in a class', () => {
    class User {
      form = FormBuilder.create({
        name: ''
      })
    }

    const user = new User()
    expect(user.form).toBeInstanceOf(FormBuilder)
    expect(user.form.name).toBe('')
  })
})
