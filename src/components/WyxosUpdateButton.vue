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
  },
  payload: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <wyxos-action
    :loading="action.isProcessing(id)"
    @click="action.patch({ id, ...payload })">
    <slot>
      <i class="fas fa-edit"></i>
    </slot>
  </wyxos-action>
</template>

<style scoped></style>
