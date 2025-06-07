# FormErrors

Form error handling utility:

```javascript
import { FormErrors } from '@wyxos/vision'

// Create a new error bag
const errors = FormErrors.create()

// Set an error
errors.setOne('email', 'Please enter a valid email address')

// Check if a field has an error
if (errors.has('email')) {
  console.log('Email error:', errors.get('email').message)
}

// Clear a specific error
errors.clear('email')

// Clear all errors
errors.clear()

// Get all errors
const allErrors = errors.all()
```
