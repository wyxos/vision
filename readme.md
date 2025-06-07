# @wyxos/vision

A comprehensive Vue.js utility library that extends Oruga UI with additional components and utilities to simplify common tasks in Vue applications.

## Features

- **Enhanced Oruga UI Components**: Seamlessly integrates with Oruga UI and provides additional components with extended functionality
- **Form Handling**: Powerful form building, validation, and submission utilities
- **Async Data Management**: Simplified API for handling asynchronous data fetching and state management
- **Listing and Pagination**: Comprehensive tools for creating data tables with filtering, pagination, and sorting
- **Error Handling**: Built-in error handling and validation utilities
- **UI Components**: Rich set of UI components for common tasks like confirmation dialogs, inline editing, and more

## Installation

```bash
npm install @wyxos/vision
```

## Requirements

This package has the following peer dependencies:

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
import Vision from '@wyxos/vision'

const app = createApp(App)

app.use(Vision)

app.mount('#app')
```

### Components

Vision provides a rich set of components with the `Wyxos` prefix (also accessible with the `W` prefix for brevity):

- `WyxosAccordion` - Collapsible content panels
- `WyxosAction` - Action button with loading states
- `WyxosAsync` - Component for handling async data loading
- `WyxosButton` - Enhanced button with loading states
- `WyxosCollection` - Collection management
- `WyxosConfirm` - Confirmation dialog
- `WyxosDatepicker` - Date picker component
- `WyxosDeleteButton` - Button for delete operations with confirmation
- `WyxosError` - Error display component
- `WyxosForm` - Form component with validation
- `WyxosIcon` - Icon component
- `WyxosImage` - Image component with loading states
- `WyxosInlineEdit` - Inline editing component
- `WyxosInput` - Enhanced input component
- `WyxosListing` - Data listing component with pagination
- `WyxosLiveInput` - Input with live updates
- `WyxosLogout` - Logout button with confirmation
- `WyxosProgress` - Progress indicator
- `WyxosPrompt` - Prompt dialog
- `WyxosRemove` - Remove button with confirmation
- `WyxosSelect` - Enhanced select component
- `WyxosSessionExpired` - Session expired notification
- `WyxosSubmit` - Submit button with loading states
- `WyxosTab` - Tab component
- `WyxosTags` - Tags input component
- `WyxosTokenExpired` - Token expired notification
- `WyxosUpdateButton` - Button for update operations with loading states

### Utilities

Vision provides several utility classes to simplify common tasks:

#### AsyncData

Simplifies handling asynchronous data fetching with loading states:

```javascript
import { AsyncData } from '@wyxos/vision'

const users = AsyncData.create()
users.load('/api/users')
  .then(response => {
    console.log('Users loaded:', users.data.value)
  })
```

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

## Additional Utilities

- `Action` - Utility for handling actions with loading states
- `AutoComplete` - Autocomplete functionality
- `DateRender` - Date formatting and rendering
- `Filter` - Query filtering utility
- `FileRequest` - File upload and download handling
- `LoadState` - Loading state management
- `ResourceList` - Resource listing utility
- `Search` - Search functionality
- `Steps` - Multi-step process management
- `Tab` - Tab management
- `FormErrors` - Form error handling utility (replaces deprecated `useFormErrors`)

## Demo

A demo application is included in this repository to showcase the usage of FormBuilder and Listing utilities. To run the demo:

```bash
npm run demo
```

This will start a Vite development server, and you can access the demo in your browser at http://localhost:3000.

The demo includes:
- FormBuilder example with validation and submission
- Listing example with pagination and filtering

For more details, see the [demo README](./demo/README.md).

## License

MIT
