# @wyxos/vision

`@wyxos/vision` is a Laravel plugin designed to scaffold and enhance web applications by providing a set of Vue.js
components, utilities, and CLI commands. It integrates seamlessly with Laravel, offering tools for rapid SPA (Single
Page Application) development, streamlined forms and listings management, and custom command utilities for efficient
project configuration and management.

## Features

- **Vue.js Components**: Leverage a variety of components like `WyxosForm`, `WyxosImage`, and `WyxosInput` for building
  dynamic, responsive user interfaces with minimal boilerplate.
- **Utilities**: Utilize helper classes such as `FormBuilder`, `Listing`, and `Auth` to simplify form handling, data
  listing, and authentication processes.
- **CLI Commands**: Automate routine tasks with commands like `make:route` for route and component generation,
  and `toggle` commands to switch between different library configurations or versions.

## Getting Started

To get started with `@wyxos/vision`, ensure you have a Laravel project set up. Then, run the following command to
install the plugin and scaffold your project with the necessary configurations and dependencies:

```bash
npx @wyxos/vision make:laravel <projectName>
```

## Installation

The plugin can be installed directly from npm:

```bash
npm install @wyxos/vision
```

Or, if you prefer using Yarn:

```bash
yarn add @wyxos/vision
```

## Usage

After installation, you can start using the Vue.js components and utilities in your Laravel project. Here's a quick
example of how you might use the `WyxosForm` component:

```vue

<template>
  <WyxosForm :form="form" @submit="submitForm">
    <WyxosInput label="Username" v-model="form.username"/>
    <WyxosInput label="Password" type="password" v-model="form.password"/>
    <o-button @click="form.submit">Submit</o-button>
  </WyxosForm>
</template>

<script>
  import {WyxosForm, WyxosInput} from '@wyxos/vision';
  import FormBuilder from '@wyxos/vision/utilities/FormBuilder';

  export default {
    components: {
      WyxosForm,
      WyxosInput
    },
    data() {
      return {
        form: new FormBuilder({
          username: '',
          password: '',
        })
      };
    },
    methods: {
      submitForm() {
        // Handle form submission
      }
    }
  }
</script>
```

For more detailed documentation on components and utilities, refer to
the [official documentation](https://github.com/wyxos/vision).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

`@wyxos/vision` is licensed under the MIT License. See the LICENSE file for more details.
