<script setup>
import Action from '../utilities/Action.js'

defineProps({
  action: {
    type: Action,
    required: true
  },
  row: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <button
    :disabled="action.isProcessing(row)"
    class="bg-red-500 text-white"
    @click="action.delete(row)">
    <i v-if="action.isProcessing(row)" class="fas fa-spinner fa-spin"></i>
    <i v-else :class="`fas fa-trash`"></i>
  </button>
</template>
