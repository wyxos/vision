<script>
import useFormErrors from './formErrors'

export default {
  name: 'WyxosInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    bag: {
      type: String,
      default: () => {
          return 'default'
      }
    }
  },
  setup() {
    const errors = useFormErrors()

    return {
      errors
    }
  },
  computed: {
    inputAttrs() {
      const attrs = this.$attrs

      const output = {}

      Object.keys(attrs).forEach((key) => {
        if (!['class'].includes(key)) {
          output[key] = attrs[key]
        }
      })

      return attrs
    }
  }
}
</script>
<template>
  <o-field :label="label" v-bind="errors.get(name, bag)">
    <o-input v-bind="$attrs" @focus="errors.clear(name, bag)"></o-input>
  </o-field>
</template>
