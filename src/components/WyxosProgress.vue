<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WyxosProgress',
  props: {
    showValue: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    format: {
      type: String,
      default: 'percent'
    }
  }
})
</script>

<template>
  <progress :max="max" :value="modelValue"></progress>
  <span v-if="showValue">{{ modelValue }} / {{ max }}</span>
</template>
