# WyxosError Component

Error display component for form validation errors.

## Usage

The WyxosError component is typically used within form fields to display validation errors:

```vue
<template>
  <WyxosForm :form="formData" submit-url="/api/users" method="post">
    <template #default="{ form }">
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
      
      <!-- More form fields -->
    </template>
  </WyxosForm>
</template>
```

## Props

- `form`: The FormBuilder instance (required)
- `name`: The name of the form field to display errors for (required)
