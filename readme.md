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

Powerful form handling with validation and submission:

```javascript
import { FormBuilder } from '@wyxos/vision'

const form = FormBuilder.create({
  name: '',
  email: ''
})

form.post('/api/users')
  .onSuccess(data => {
    console.log('Form submitted successfully:', data)
  })
```

#### Listing

Comprehensive listing and pagination utility:

```javascript
import { Listing } from '@wyxos/vision'

const listing = Listing.create({ page: 1, perPage: 10 })
listing.load('/api/users')
  .then(() => {
    console.log('Users:', listing.attributes.items)
    console.log('Total:', listing.attributes.total)
  })
```

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
- `useFormErrors` - Form error handling composable

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
