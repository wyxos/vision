<script setup>
import FormBuilder from '../utilities/FormBuilder'
import FormError from '../utilities/FormErrors'

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

const errors = FormError.create()
</script>

<template>
  <div class="wyxos-error text-sm text-red-500">
      <span v-if="form?.getError(name).message">{{
          form.getError(name).message
        }}</span>
    <span v-else-if="errors.get(name)?.message">{{
        errors.get(name).message
      }}</span>
  </div>
</template>
