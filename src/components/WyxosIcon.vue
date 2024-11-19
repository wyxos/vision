<script setup>
defineProps({
  active: {
    type: Boolean,
    required: false
  },
  on: {
    type: String,
    required: false,
    default: 'chevron-down'
  },
  off: {
    type: String,
    required: false,
    default: 'chevron-right'
  }
})
</script>

<template>
  <i :class="`fa-${active ? on : off}`" class="fas"></i>
</template>
