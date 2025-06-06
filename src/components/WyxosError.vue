<script setup>
import FormBuilder from '../utilities/FormBuilder'
import useFormErrors from '../utilities/useFormErrors.js'

defineProps({
  form: {
    type: FormBuilder,
    default: null
  },
  name: {
    type: String,
    required: true
  }
})

const errors = useFormErrors()
</script>

<template>
  <div class="wyxos-error">
      <span v-if="form?.getError(name).message">{{
          form.getError(name).message
        }}</span>
    <span v-else-if="errors.get(name)?.message">{{
        errors.get(name).message
      }}</span>
  </div>
</template>
