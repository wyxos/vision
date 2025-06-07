<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import FormBuilder from '../utilities/FormBuilder'

const props = defineProps({
  // Initial form data
  form: {
    type: Object,
    default: () => ({})
  },
  // URL for loading form data
  loadUrl: {
    type: String,
    default: null
  },
  // URL for submitting form data
  submitUrl: {
    type: String,
    default: null
  },
  // HTTP method for form submission
  method: {
    type: String,
    default: 'post',
    validator: (value) =>
      ['get', 'post', 'put', 'patch', 'delete'].includes(value)
  },
  // Whether to reset form after successful submission
  resetAfterSubmit: {
    type: Boolean,
    default: false
  },
  // Whether to force using FormData for submission
  forceFormData: {
    type: Boolean,
    default: false
  },
  // Function to transform form data before submission
  transform: {
    type: Function,
    default: null
  },
  // Auto-load form data on mount
  autoLoad: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'success',
  'fail',
  'submit',
  'load',
  'loaded',
  'loading',
  'load-failed'
])

// Create FormBuilder instance
const formBuilder = ref(FormBuilder.create(props.form))

// Apply configuration based on props
if (props.resetAfterSubmit) {
  formBuilder.value.resetAfterSubmit()
}

if (props.forceFormData) {
  formBuilder.value.forceFormData()
}

if (props.transform) {
  formBuilder.value.transform(props.transform)
}

// Set up callbacks
formBuilder.value.onSuccess((response) => {
  emit('success', response)
  return response
})

formBuilder.value.onFail((error) => {
  emit('fail', error)
  return error
})

// Computed properties for form state
const isSubmitting = computed(() => formBuilder.value.isSubmitting)
const isSubmitted = computed(() => formBuilder.value.isSubmitted)
const isLoading = computed(() => formBuilder.value.isLoading)
const isLoaded = computed(() => formBuilder.value.isLoaded)
const hasErrors = computed(() => formBuilder.value.hasErrors())
const errors = computed(() => formBuilder.value.getErrors())

// Methods
const submit = async () => {
  emit('submit', formBuilder.value.form)
  return formBuilder.value[props.method](props.submitUrl)
}

const load = async (url = null) => {
  const loadUrl = url || props.loadUrl

  if (!loadUrl) {
    console.error('No load URL provided')
    return
  }

  emit('load', loadUrl)

  try {
    const response = await formBuilder.value.load(loadUrl)
    emit('loaded', response)
    return response
  } catch (error) {
    emit('load-failed', error)
    throw error
  }
}

const reset = () => {
  formBuilder.value.reset()
}

// Auto-load on mount if enabled
onMounted(() => {
  if (props.autoLoad && props.loadUrl) {
    load()
  }
})

// Expose the form instance to child components
provide('form', formBuilder)

// Expose methods and properties to parent component
defineExpose({
  form: formBuilder,
  submit,
  load,
  reset,
  isSubmitting,
  isSubmitted,
  isLoading,
  isLoaded,
  hasErrors,
  errors
})
</script>

<template>
  <form @submit.prevent="submit">
    <slot
      :form="formBuilder"
      :submit="submit"
      :load="load"
      :reset="reset"
      :is-submitting="isSubmitting"
      :is-submitted="isSubmitted"
      :is-loading="isLoading"
      :is-loaded="isLoaded"
      :has-errors="hasErrors"
      :errors="errors"></slot>
  </form>
</template>
