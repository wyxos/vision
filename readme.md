# @wyxos/vision

`@wyxos/vision` is a comprehensive package of reusable Vue components and utility classes designed to streamline the development of web applications. It provides a collection of ready-to-use components and functionalities that can be easily integrated into Vue-based projects, enabling developers to build robust and user-friendly interfaces.

## Features

- **Components**: The package includes a wide range of Vue components, such as buttons, forms, image display, date picker, tags, and more. These components are designed with flexibility and customization in mind, allowing developers to adapt them to suit their specific project requirements.

- **Utility Classes**: `@wyxos/vision` provides utility classes that assist with common tasks encountered during web development. These utility classes include load state management, form errors handling, and a search utility. They help simplify complex operations and improve code organization.

## Installation

Install the package using npm or yarn:

```bash
npm install @wyxos/vision

# or

yarn add @wyxos/vision
```

## Usage

Once installed, import the components and utility classes from `@wyxos/vision` into your Vue project and start using them in your templates and scripts. Detailed documentation and examples for each component and utility class can be found in the package's documentation.

```vue
<template>
  <div>
    <wyxos-button @click="submitForm">Submit</wyxos-button>
    <wyxos-form :form="form">
      <wyxos-input label="Name" name="name"></wyxos-input>
    </wyxos-form>
    <wyxos-image src="/path/to/image.jpg"></wyxos-image>
  </div>
</template>

<script>
import { WyxosButton, WyxosForm, WyxosInput, WyxosImage } from '@wyxos/vision'

export default {
  components: {
    WyxosButton,
    WyxosForm,
    WyxosInput,
    WyxosImage
  },
  data() {
    return {
      form: /* form data */
    }
  },
  methods: {
    submitForm() {
      // Handle form submission logic
    }
  }
}
</script>
```

## Documentation

For detailed usage instructions and examples, please refer to the [documentation](link-to-documentation) of `@wyxos/vision`.

## Contributing

Contributions to `@wyxos/vision` are welcome! If you encounter any issues, have suggestions for improvements, or would like to add new features, please open an issue or submit a pull request on the [GitHub repository](link-to-repo).

## License

`@wyxos/vision` is released under the [MIT License](link-to-license).