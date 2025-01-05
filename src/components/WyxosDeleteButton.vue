<script setup>

import WyxosAction from "./WyxosAction.vue";
import Action from "../utilities/Action.js";

defineProps({
  action: {
    type: Action,
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
                @click="action.delete({id}).then((response) => $emit('done', response))"></wyxos-action>
</template>

<style scoped>

</style>
