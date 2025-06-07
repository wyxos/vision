# WyxosSubmit Component

Submit button component that integrates with FormBuilder for form submission.

## Usage

The WyxosSubmit component is typically used within a WyxosForm component:

```vue
<template>
  <WyxosForm :form="formData" submit-url="/api/users" method="post">
    <template #default="{ form, submit }">
      <!-- Form fields here -->
      
      <WyxosSubmit :form="form" @click="submit" />
    </template>
  </WyxosForm>
</template>
```

## Testing

Example test for WyxosSubmit component:

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
