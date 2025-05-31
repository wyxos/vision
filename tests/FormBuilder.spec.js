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

  describe('Initialization', () => {
    it('should initialize with the provided form data', () => {
      expect(form.form.name).toBe('John')
      expect(form.form.email).toBe('john@example.com')
      expect(form.original).toEqual(defaultFormData)
    })

    it('should create a new instance using static create method', () => {
      const newForm = FormBuilder.create({ foo: 'bar' })
      expect(newForm).toBeInstanceOf(FormBuilder)
      expect(newForm.foo).toBe('bar')
    })
  })

  describe('HTTP Method Handling', () => {
    it.each([
      ['post', (form) => form.isPost()],
      ['patch', (form) => form.isPatch()],
      ['put', (form) => form.isPut()]
    ])('should set %s method correctly', (methodName, setMethod) => {
      setMethod(form)
      expect(form.method).toBe(methodName)
    })

    it('should set submission and load URLs correctly', () => {
      form.submitAt(apiUrl)
      expect(form.submitUrl).toBe(apiUrl)

      form.loadFrom(singleResourceUrl)
      expect(form.loadUrl).toBe(singleResourceUrl)
    })
  })

  describe('Form Submission', () => {
    it.each([
      ['post', (form) => form.isPost(), axios.post],
      ['patch', (form) => form.isPatch(), axios.patch],
      ['put', (form) => form.isPut(), axios.put]
    ])(
      'submits using %s method',
      async (methodName, setMethod, axiosMethod) => {
        const responseData = mockSuccessResponse(methodName)

        setMethod(form)
        form.submitAt(apiUrl)
        const result = await form.submit()

        expect(axiosMethod).toHaveBeenCalled()
        expect(result).toEqual(responseData)
        expect(form.isSubmitted).toBe(true)
      }
    )

    it('should load form data correctly', async () => {
      const responseData = {
        form: {
          name: 'Jane',
          email: 'jane@example.com'
        }
      }
      axios.get.mockResolvedValue({ data: responseData })

      form.loadFrom(singleResourceUrl)
      const result = await form.load()

      expect(axios.get).toHaveBeenCalledWith(
        singleResourceUrl,
        expect.objectContaining({ signal: expect.any(Object) })
      )
      expect(result).toEqual(responseData)
      expect(form.name).toBe('Jane')
      expect(form.email).toBe('jane@example.com')
      expect(form.isLoaded).toBe(true)
    })

    it('should reset form after successful submission when resetAfterSubmit is true', async () => {
      mockSuccessResponse()

      form.name = 'Jane' // Change form data
      form.resetAfterSubmit(true).submitAt(apiUrl)
      await form.submit()

      expect(form.name).toBe('John') // Should be reset to original
      expect(form.email).toBe('john@example.com')
    })
  })

  describe('Callbacks', () => {
    it('should execute success callback after successful submission', async () => {
      const responseData = mockSuccessResponse()
      const successCallback = vi.fn()

      form.submitAt(apiUrl).onSuccess(successCallback)
      await form.submit()

      expect(successCallback).toHaveBeenCalledWith(responseData)
    })

    it('should execute failure callback after failed submission', async () => {
      const error = mockErrorResponse()
      const failureCallback = vi.fn().mockReturnValue('Custom error')

      form.submitAt(apiUrl).onFail(failureCallback)

      await expect(form.submit()).rejects.toBe('Custom error')
      expect(failureCallback).toHaveBeenCalledWith(error)
    })

    it('should use formatter callback when provided', async () => {
      mockSuccessResponse()
      const formatterCallback = vi.fn().mockReturnValue({ formatted: true })

      form.submitAt(apiUrl).formatter(formatterCallback)
      await form.submit()

      expect(formatterCallback).toHaveBeenCalledWith(form.form)
      expect(axios.post).toHaveBeenCalledWith(
        apiUrl,
        { formatted: true },
        expect.any(Object)
      )
    })
  })

  describe('Error Handling', () => {
    it('should handle errors during submission', async () => {
      const error = mockErrorResponse()

      form.submitAt(apiUrl)

      await expect(form.submit()).rejects.toEqual(error)
      expect(mockErrorsInstance.set).toHaveBeenCalledWith(error)
      expect(form.isSubmitFailed).toBe(true)
    })

    it('should handle errors during loading', async () => {
      const error = new Error('Network error')
      axios.get.mockRejectedValue(error)

      form.loadFrom(singleResourceUrl)

      await expect(form.load()).rejects.toEqual(error)
      expect(form.isLoadFailed).toBe(true)
    })

    it('should delegate error handling to the errors object', () => {
      mockErrorsInstance.get.mockReturnValue({
        message: 'Error message',
        variant: 'danger'
      })
      mockErrorsInstance.has.mockReturnValue(true)
      mockErrorsInstance.all.mockReturnValue([
        { key: 'email', message: 'Error message' }
      ])

      form.getError('email')
      expect(mockErrorsInstance.get).toHaveBeenCalledWith('email')

      form.hasError('email')
      expect(mockErrorsInstance.has).toHaveBeenCalledWith('email')

      form.clearError('email')
      expect(mockErrorsInstance.clear).toHaveBeenCalledWith('email')

      form.clearErrors()
      expect(mockErrorsInstance.clear).toHaveBeenCalled()

      form.getErrors()
      expect(mockErrorsInstance.all).toHaveBeenCalled()
    })
  })

  describe('Form Reset', () => {
    it('should reset form to original values', () => {
      form.name = 'Jane'
      form.email = 'jane@example.com'

      form.reset()

      expect(form.name).toBe('John')
      expect(form.email).toBe('john@example.com')
    })
  })

  describe('Proxy Access', () => {
    it('should allow direct access to form properties via proxy', () => {
      expect(form.name).toBe('John')
      expect(form.email).toBe('john@example.com')

      // Test setting values via proxy
      form.name = 'Jane'
      expect(form.name).toBe('Jane')
      expect(form.form.name).toBe('Jane')
    })
  })

  describe('Nested Proxy Access', () => {
    it('should handle nested properties via proxy', () => {
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

  describe('Serialization', () => {
    it('should convert form to JSON', () => {
      const json = form.toJson()
      expect(json).toEqual(defaultFormData)
      expect(json).not.toBe(form.form) // Should be a new object, not a reference
    })
  })

  describe('State Management', () => {
    it('should track form state correctly', () => {
      expect(form.isSubmitting).toBe(false)
      expect(form.isSubmitted).toBe(false)
      expect(form.isSubmitFailed).toBe(false)
      expect(form.isLoading).toBe(false)
      expect(form.isLoaded).toBe(false)
      expect(form.isLoadFailed).toBe(false)

      form.submitting()
      expect(form.isSubmitting).toBe(true)

      form.submitted()
      expect(form.isSubmitted).toBe(true)

      form.submitFailed()
      expect(form.isSubmitFailed).toBe(true)

      form.loading()
      expect(form.isLoading).toBe(true)

      form.loaded()
      expect(form.isLoaded).toBe(true)

      form.loadFailed()
      expect(form.isLoadFailed).toBe(true)
    })
  })
})
