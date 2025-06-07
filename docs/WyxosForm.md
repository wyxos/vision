# WyxosForm Component

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
