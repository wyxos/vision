<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :disabled="loading">
    <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    <slot v-else>
      <i class="fas fa-trash"></i>
    </slot>
  </button>
</template>
