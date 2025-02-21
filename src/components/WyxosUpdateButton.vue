<script setup>
import WyxosAction from './WyxosAction.vue'
import Action from '../utilities/Action.js'

defineProps({
  action: {
    type: Action,
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

const emit = defineEmits(['done'])
</script>

<template>
  <wyxos-action
    :loading="action.isProcessing(id)"
    @click="
      action
        .patch({ id, ...payload })
        .then((response) => emit('done', response))
    ">
    <slot>
      <i class="fas fa-edit"></i>
    </slot>
  </wyxos-action>
</template>

<style scoped></style>
