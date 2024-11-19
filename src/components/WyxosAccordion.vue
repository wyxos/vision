<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: false
  }
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  isOpen.value = props.active
})
</script>

<template>
  <div class="wyxos-accordion">
    <slot :is-open="isOpen" :toggle="toggle" name="header"></slot>
    <slot v-if="isOpen" name="body"></slot>
  </div>
</template>
