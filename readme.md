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

You can use Vision in two ways:

#### Option 1: Use as a Vue Plugin (Recommended)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import Vision from '@wyxos/vision'

const app = createApp(App)

// Register all Vision components at once
app.use(Vision)

app.mount('#app')
```

This will register all components with both their full names (e.g., `WyxosForm`) and shorthand names (e.g., `WForm`).

#### Option 2: Import Components Individually

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

Vision provides various components to simplify common UI tasks. See the [Components documentation](./docs/Components.md) for details on:

- `WyxosError` - Error display component for form validation errors
- `WyxosForm` - Form component that creates and customizes a FormBuilder instance
- `WyxosListing` - Listing component that creates and customizes a Listing instance
- `WyxosSubmit` - Submit button component that integrates with FormBuilder for form submission. Can be disabled via the `disabled` prop.

### Utilities

Vision provides utility classes to simplify common tasks. See the [Utilities documentation](./docs/Utilities.md) for details on:

- `FormBuilder` - Form handling with validation, submission, and state management
- `Listing` - Comprehensive listing and pagination utility with filtering, searching, and state management
- `Filter` - Query filtering utility used by the Listing module
- `FormErrors` - Form error handling utility


## License

MIT
