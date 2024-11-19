<script>
import { defineComponent } from 'vue'
import FormBuilder from '../utilities/FormBuilder'
import useFormErrors from '../utilities/useFormErrors.js'

export default defineComponent({
  name: 'WyxosError',
  props: {
    form: {
      type: FormBuilder,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    return {
      errors: useFormErrors()
    }
  }
})
</script>

<template>
  <span v-if="form?.getError(name).message" class="wyxos-error">{{
    form.getError(name).message
  }}</span>
  <span v-else-if="errors.get(name)?.message" class="wyxos-error">{{
    errors.get(name).message
  }}</span>
</template>
