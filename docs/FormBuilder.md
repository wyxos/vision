# FormBuilder

Form handling with validation, submission, and state management:

```javascript
import { FormBuilder } from '@wyxos/vision'

// Create a form with initial data
const form = FormBuilder.create({
  name: '',
  email: '',
  role: 'user'
})

// Form state tracking
console.log('Is form submitting?', form.isSubmitting)
console.log('Is form loading?', form.isLoading)

// Load existing data
form.load('/api/users/1')
  .then(response => {
    console.log('Form data loaded:', form.form)
  })

// Transform data before submission
form.transform(data => {
  // Modify data before sending to server
  return {
    ...data,
    email: data.email.toLowerCase()
  }
})

// Force using FormData (useful for file uploads)
form.forceFormData()

// Submit the form with various HTTP methods
form.post('/api/users')
  .onSuccess(data => {
    console.log('Form submitted successfully:', data)
  })
  .onFail(error => {
    console.error('Form submission failed:', error)
  })

// Check for errors
if (form.hasError('email')) {
  console.error('Email error:', form.getError('email'))
}

// Reset form to original values
form.reset()

// Clear all validation errors
form.clearErrors()
```
