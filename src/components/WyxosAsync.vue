<script setup>
const props = defineProps({
  instance: {
    type: Object,
    required: true
  }
})

const { data, isLoading, isLoaded, isError } = props.instance
</script>

<template>
  <div v-if="isLoading">
    <slot name="loading"> Loading... </slot>
  </div>
  <div v-else-if="isLoaded">
    <slot :data="data" name="default">
      {{ data }}
    </slot>
  </div>
  <div v-else-if="isError">Error loading lead.</div>
</template>
