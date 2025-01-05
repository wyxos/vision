<script setup>
import WyxosAction from './WyxosAction.vue'

defineProps({
  action: {
    type: Object,
    required: true
  },
  id: {
    type: [String, Number],
    required: true
  }
})
</script>

<template>
  <wyxos-action
    :loading="action.isProcessing(id)"
    @click="action.patch()"></wyxos-action>
</template>

<style scoped></style>
