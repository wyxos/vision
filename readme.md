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
import { FormBuilder, Listing, WyxosError, WyxosForm, WyxosListing } from '@wyxos/vision'

const app = createApp(App)

// Register components as needed
app.component('WyxosError', WyxosError)
app.component('WyxosForm', WyxosForm)
app.component('WyxosListing', WyxosListing)

app.mount('#app')
```

### Components

Vision currently provides the following components:

- `WyxosError` - Error display component for form validation errors
- `WyxosForm` - Form component that creates and customizes a FormBuilder instance
- `WyxosListing` - Listing component that creates and customizes a Listing instance
- `WyxosSubmit` - Submit button component that integrates with FormBuilder for form submission

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

#### Using WyxosListing Component

The WyxosListing component provides a convenient wrapper around the Listing utility:

```vue
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Reference to the WyxosListing component
const listingRef = ref(null)

// Handle successful data loading
const onSuccess = (response) => {
  console.log('Data loaded successfully:', response)
}

// Custom transform function
const transformQuery = (query) => {
  return {
    ...query,
    search: query.search ? query.search.trim() : ''
  }
}

// Custom format function
const formatResponse = (response) => {
  return {
    listing: {
      items: response.data.data,
      total: response.data.meta.total,
      perPage: response.data.meta.per_page,
      showing: response.data.meta.per_page
    },
    filters: response.data.meta.filters || []
  }
}

// Method to trigger a search
const performSearch = () => {
  listingRef.value.search()
}

// Method to reset search
const resetFilters = () => {
  listingRef.value.resetSearch()
}
</script>

<template>
  <div>
    <WyxosListing
      ref="listingRef"
      load-url="/api/users"
      :query="{ page: 1, perPage: 10, search: '' }"
      :router="router"
      :route="route"
      :transform="transformQuery"
      :format="formatResponse"
      auto-load
      @success="onSuccess"
    >
      <template #default="{ 
        listing, 
        attributes, 
        isLoading, 
        isSearching,
        search,
        resetSearch,
        refresh
      }">
        <!-- Search controls -->
        <div class="search-controls">
          <input 
            v-model="listing.filter.query.search" 
            placeholder="Search..." 
            @keyup.enter="search()"
          />
          <button @click="search()" :disabled="is-searching">
            {{ is-searching ? 'Searching...' : 'Search' }}
          </button>
          <button @click="reset-search()">Reset</button>
          <button @click="refresh()">Refresh</button>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading">Loading...</div>

        <!-- Data table -->
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in attributes.items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <button @click="editItem(item)">Edit</button>
                <button @click="deleteItem(item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
          <span>
            Showing {{ attributes.showing }} of {{ attributes.total }} items
          </span>
          <!-- Implement pagination controls here -->
        </div>
      </template>
    </WyxosListing>
  </div>
</template>
```

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

#### WyxosForm Component

The WyxosForm component creates and customizes a FormBuilder instance:

```vue
<script setup>
import { WyxosForm, WyxosSubmit } from '@wyxos/vision'
import { ref } from 'vue'

const formRef = ref(null)

const handleSuccess = (response) => {
  console.log('Form submitted successfully:', response)
}

const handleFail = (error) => {
  console.error('Form submission failed:', error)
}
</script>

<template>
  <WyxosForm
    ref="formRef"
    :form="{ name: '', email: '', role: 'user' }"
    submit-url="/api/users"
    method="post"
    :reset-after-submit="true"
    :force-form-data="false"
    :transform="(data) => ({ ...data, email: data.email.toLowerCase() })"
    @success="handleSuccess"
    @fail="handleFail"
  >
    <template #default="{ form, submit, isSubmitting, hasErrors, errors }">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" />
        <WyxosError :form="form" name="name" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" />
        <WyxosError :form="form" name="email" />
      </div>

      <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="form.role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <WyxosError :form="form" name="role" />
      </div>

      <WyxosSubmit :form="form" @click="submit" />

      <div v-if="hasErrors" class="error-summary">
        <p>Please correct the following errors:</p>
        <ul>
          <li v-for="error in errors" :key="error.key">
            {{ error.message }}
          </li>
        </ul>
      </div>
    </template>
  </WyxosForm>
</template>
```

The WyxosForm component accepts the following props:

- `form`: Initial form data (object)
- `loadUrl`: URL for loading form data (string)
- `submitUrl`: URL for submitting form data (string)
- `method`: HTTP method for form submission ('get', 'post', 'put', 'patch', 'delete')
- `resetAfterSubmit`: Whether to reset form after successful submission (boolean)
- `forceFormData`: Whether to force using FormData for submission (boolean)
- `transform`: Function to transform form data before submission (function)
- `autoLoad`: Whether to automatically load form data on mount (boolean)

The component emits the following events:

- `success`: Emitted when form submission is successful
- `fail`: Emitted when form submission fails
- `submit`: Emitted when form is submitted
- `load`: Emitted when form data loading starts
- `loaded`: Emitted when form data is loaded successfully
- `loading`: Emitted when form is in loading state
- `load-failed`: Emitted when form data loading fails

The component exposes the following methods and properties via template slots and refs:

- `form`: The FormBuilder instance
- `submit`: Method to submit the form
- `load`: Method to load form data
- `reset`: Method to reset the form
- `isSubmitting`: Whether the form is currently being submitted
- `isSubmitted`: Whether the form has been successfully submitted
- `isLoading`: Whether the form is currently loading data
- `isLoaded`: Whether the form data has been loaded
- `hasErrors`: Whether the form has validation errors
- `errors`: Array of form validation errors


## Testing

The library uses Vitest for testing. To run the tests:

```bash
npm test
```

The test configuration is in `vitest.config.js` at the root of the project. It uses the Vue plugin to handle .vue files during testing.

When testing components, make sure to provide all required props and mock any necessary dependencies. For example, testing the WyxosSubmit component which requires a FormBuilder instance:

```javascript
import { mount } from '@vue/test-utils'
import WyxosSubmit from '../src/components/WyxosSubmit.vue'
import FormBuilder from '../src/utilities/FormBuilder'

// Example test for WyxosSubmit component
it('renders correctly', () => {
  const mockForm = new FormBuilder()
  mockForm.state.loading = false
  mockForm.state.wasSubmitting = false

  const wrapper = mount(WyxosSubmit, {
    props: {
      form: mockForm
    },
    slots: {
      default: 'Custom Submit Text' // Optional: provide custom text via slot
    }
  })

  // Test assertions here
})
```

## License

MIT
