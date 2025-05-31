import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import FormBuilder from '../src/utilities/FormBuilder'
import axios from 'axios'
import useFormErrors from '../src/utilities/useFormErrors'

// Mock axios
vi.mock('axios')

describe('FormBuilder', () => {
  let form
  let mockErrorsInstance
  const defaultFormData = { name: 'John', email: 'john@example.com' }
  const apiUrl = '/api/users'
  const singleResourceUrl = '/api/users/1'

  // Helper function to setup a successful response
  const mockSuccessResponse = (
    method = 'post',
    responseData = { success: true }
  ) => {
    axios[method].mockResolvedValue({ data: responseData })
    return responseData
  }

  // Helper function to setup an error response
  const mockErrorResponse = (
    method = 'post',
    errorData = {
      response: {
        data: {
          errors: {
            email: ['Invalid email format']
          }
        }
      }
    }
  ) => {
    axios[method].mockRejectedValue(errorData)
    return errorData
  }

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()

    // Mock setTimeout to execute immediately
    vi.spyOn(global, 'setTimeout').mockImplementation(fn => fn())

    // Create mock error methods
    mockErrorsInstance = {
      set: vi.fn(),
      get: vi.fn(),
      has: vi.fn(),
      clear: vi.fn(),
      setOne: vi.fn(),
      all: vi.fn(),
      createBag: vi.fn()
    }

    // Create a new form instance for each test
    form = new FormBuilder(defaultFormData)

    // Replace the errors property with our mock
    form.errors = mockErrorsInstance

    // Reset axios mock
    axios.post.mockReset()
    axios.patch.mockReset()
    axios.put.mockReset()
    axios.get.mockReset()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  // Core functionality tests
  it('should test core FormBuilder functionality', () => {
    // Test initialization
    expect(form.form.name).toBe('John')
    expect(form.form.email).toBe('john@example.com')
    expect(form.original).toEqual(defaultFormData)

    // Test static create method
    const newForm = FormBuilder.create({ foo: 'bar' })
    expect(newForm).toBeInstanceOf(FormBuilder)
    expect(newForm.foo).toBe('bar')

    // Test HTTP method setters
    form.isPatch()
    expect(form.method).toBe('patch')
    form.isPut()
    expect(form.method).toBe('put')
    form.isPost()
    expect(form.method).toBe('post')

    // Test URL setters
    form.submitAt(apiUrl)
    expect(form.submitUrl).toBe(apiUrl)
    form.loadFrom(singleResourceUrl)
    expect(form.loadUrl).toBe(singleResourceUrl)

    // Test proxy access
    expect(form.name).toBe('John')
    form.name = 'Jane'
    expect(form.name).toBe('Jane')
    expect(form.form.name).toBe('Jane')

    // Test reset method
    form.reset()
    expect(form.name).toBe('John')

    // Test toJson method
    const json = form.toJson()
    expect(json).toEqual(defaultFormData)
    expect(json).not.toBe(form.form)

    // Test state tracking
    expect(form.isSubmitting).toBe(false)
    form.submitting()
    expect(form.isSubmitting).toBe(true)
    form.submitted()
    expect(form.isSubmitted).toBe(true)
  })

  // Test form submission and loading
  it('should handle form submission and loading', async () => {
    // Test POST submission
    mockSuccessResponse('post')
    form.isPost().submitAt(apiUrl)
    let result = await form.submit()
    expect(axios.post).toHaveBeenCalled()
    expect(form.isSubmitted).toBe(true)

    // Test form loading
    const loadResponseData = {
      form: {
        name: 'Jane',
        email: 'jane@example.com'
      }
    }
    axios.get.mockResolvedValue({ data: loadResponseData })
    form.loadFrom(singleResourceUrl)
    result = await form.load()
    expect(axios.get).toHaveBeenCalled()
    expect(form.name).toBe('Jane')
    expect(form.isLoaded).toBe(true)

    // Test resetAfterSubmit
    form.name = 'Modified'
    form.resetAfterSubmit(true)
    mockSuccessResponse('post')
    await form.submit()
    expect(form.name).toBe('Jane') // Reset to the loaded value
  })

  // Test callbacks and error handling
  it('should handle callbacks and errors', async () => {
    // Test success callback
    const successCallback = vi.fn()
    const responseData = mockSuccessResponse()
    form.submitAt(apiUrl).onSuccess(successCallback)
    await form.submit()
    expect(successCallback).toHaveBeenCalledWith(responseData)

    // Test formatter callback
    const formatterCallback = vi.fn().mockReturnValue({ formatted: true })
    form.formatter(formatterCallback)
    await form.submit()
    expect(formatterCallback).toHaveBeenCalledWith(form.form)

    // Test error handling during submission
    const error = mockErrorResponse()
    await expect(form.submit()).rejects.toEqual(error)
    expect(mockErrorsInstance.set).toHaveBeenCalledWith(error)
    expect(form.isSubmitFailed).toBe(true)

    // Test failure callback
    const failureCallback = vi.fn().mockReturnValue('Custom error')
    form.onFail(failureCallback)
    await expect(form.submit()).rejects.toBe('Custom error')

    // Test error handling methods
    mockErrorsInstance.get.mockReturnValue({ message: 'Error message', variant: 'danger' })
    mockErrorsInstance.has.mockReturnValue(true)
    form.getError('email')
    expect(mockErrorsInstance.get).toHaveBeenCalledWith('email')
    form.hasError('email')
    expect(mockErrorsInstance.has).toHaveBeenCalledWith('email')
    form.clearErrors()
    expect(mockErrorsInstance.clear).toHaveBeenCalled()
  })

  // Test nested properties
  it('should handle nested properties', () => {
    const nestedForm = new FormBuilder({
      user: {
        name: 'John',
        address: {
          city: 'New York'
        }
      }
    })

    // Access nested properties
    expect(nestedForm.user.name).toBe('John')
    expect(nestedForm.user.address.city).toBe('New York')

    // Set nested properties
    nestedForm.user.name = 'Jane'
    nestedForm.user.address.city = 'Boston'

    expect(nestedForm.user.name).toBe('Jane')
    expect(nestedForm.user.address.city).toBe('Boston')
    expect(nestedForm.form.user.name).toBe('Jane')
    expect(nestedForm.form.user.address.city).toBe('Boston')
  })
})
