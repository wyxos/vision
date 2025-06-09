<script setup>
import { computed } from 'vue'

const props = defineProps({
  // FormBuilder instance
  form: {
    type: Object,
    required: true
  },
  // Allow disabling the button externally
  disabled: {
    type: Boolean,
    default: false
  }
})

// Computed property to determine if the button should be disabled
const isDisabled = computed(() => {
  return props.form.isSubmitting || props.disabled
})

// Computed property to determine if the form is submitting
const isSubmitting = computed(() => {
  return props.form.isSubmitting
})
</script>

<template>
  <button type="submit" :disabled="isDisabled" class="wyxos-submit">
    <span v-if="isSubmitting" class="wyxos-submit-loading">
      <!-- Simple loading spinner -->
      <span class="wyxos-submit-spinner"></span>
    </span>
    <span v-else>
      <slot>Submit</slot>
    </span>
  </button>
</template>

<style scoped>
.wyxos-submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wyxos-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.wyxos-submit-loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wyxos-submit-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
