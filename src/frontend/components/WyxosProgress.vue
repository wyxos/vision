<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WyxosProgress',
  props: {
    showValue: {
      type: Boolean,
      default: true
    },
    value: {
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
  <progress :value="value" :max="max"></progress
  ><span v-if="showValue">{{ value }} / {{ max }}</span>
</template>
