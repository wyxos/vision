# @wyxos/vision

A lightweight Vue.js utility library that provides essential form handling, listing, and error display utilities for Vue applications.

## Features

- **Form Handling**: Powerful form building, validation, and submission utilities
- **Listing and Pagination**: Comprehensive tools for creating data tables with filtering, pagination, and sorting
- **Error Handling**: Built-in error handling and validation utilities

## Installation

```bash
npm install @wyxos/vision
```

## Requirements

This package has the following dependencies:

- Vue 3.x
- axios
- moment
- query-string
- vue-router

## Usage

### Basic Setup

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { FormBuilder, Listing, WyxosError } from '@wyxos/vision'

const app = createApp(App)

// Register components as needed
app.component('WyxosError', WyxosError)

app.mount('#app')
```

### Components

Vision currently provides the following component:

- `WyxosError` - Error display component for form validation errors

Note: When creating Vue components, always place the script tag at the top of the component, as shown in the example below:

```vue
<script setup>
// Imports and component logic here
</script>

<template>
  <!-- Template content here -->
</template>

<style>
/* Styles here */
</style>
```

### Utilities

Vision provides the following utility classes to simplify common tasks:

#### FormBuilder

Powerful form handling with validation, submission, and state management:

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

#### Listing

Comprehensive listing and pagination utility with filtering, searching, and state management:

```javascript
import { Listing } from '@wyxos/vision'
import { useRouter, useRoute } from 'vue-router'

// Create a listing with initial query parameters
const listing = Listing.create({ 
  page: 1, 
  perPage: 10,
  search: '',
  status: 'active'
})

// State tracking
console.log('Is listing loading?', listing.isLoading)
console.log('Is listing searching?', listing.isSearching)
console.log('Is listing refreshing?', listing.isRefreshing)

// Load data from an API endpoint
listing.load('/api/users')
  .then(() => {
    console.log('Users:', listing.attributes.items)
    console.log('Total:', listing.attributes.total)
    console.log('Current page:', listing.filter.query.page)
  })

// Transform query parameters before sending to server
listing.transform(query => {
  // Modify query before sending to server
  return {
    ...query,
    search: query.search ? query.search.trim() : ''
  }
})

// Format response data
listing.format(response => {
  return {
    listing: {
      items: response.data.data,
      total: response.data.meta.total,
      perPage: response.data.meta.per_page,
      showing: response.data.data.length
    },
    filters: response.data.meta.filters || []
  }
})

// Search with current filter parameters
listing.search()

// Navigate to next page
listing.next()

// Reset search parameters
listing.resetSearch()

// Clear a specific filter
listing.clear('status')

// Reset all filters to original values
listing.reset()

// Integration with Vue Router
const router = useRouter()
const route = useRoute()
listing.useRouter(router, route)
```

The Listing module works along with the PHP package `@wyxos/harmonie` which should be located at `../php/harmonie` relative to your project for backend integration.

#### Filter

Query filtering utility used by the Listing module:

```javascript
import { Filter } from '@wyxos/vision'

// Create a filter with initial query parameters
const filter = new Filter({
  search: '',
  status: 'active',
  page: 1
})

// Check if filter is dirty (has been modified)
console.log('Is filter dirty?', filter.isDirty)

// Reset filter to original values
filter.reset()

// Clear a specific filter
filter.clear('status')

// Get filled fields (non-empty values)
const filledFields = filter.getFilledFields()
```

#### FormErrors

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

## Demo

A demo application is included in this repository to showcase the usage of FormBuilder and Listing utilities. To run the demo:

```bash
npm run dev
```

This will start a Vite development server, and you can access the demo in your browser at http://localhost:3000.

The demo includes:
- FormBuilder example with validation and submission
- Listing example with pagination and filtering

## Deployment

To deploy the demo to GitHub Pages:

1. Build the project locally:
   ```bash
   npm run deploy
   ```
   This will build the demo and copy the CNAME file to the dist directory.

2. Commit and push the changes to GitHub, including the dist directory.

3. Configure GitHub Pages in your repository settings to use the content from the /dist directory in the main branch.

The demo will be available at [vision.wyxos.com](https://vision.wyxos.com).

## License

MIT
