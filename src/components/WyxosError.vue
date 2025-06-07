<script setup>
import FormBuilder from '../utilities/FormBuilder'
import FormError from '../utilities/FormErrors'
import {computed} from "vue";

const props = defineProps({
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

const errorMessage = computed(() => {
  return props.form?.getError(props.name)?.message || errors.get(props.name)?.message || ''
})
</script>

<template>
  <div v-if="errorMessage" class="wyxos-error">
    <span>{{ errorMessage }}</span>
  </div>
</template>
