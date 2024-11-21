<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  active: {
    type: String,
    required: true
  },
  tabKey: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:active'])

// Parse the hash string to get the current active tabs for all keys
const getHashParams = () => {
  const hash = window.location.hash.replace('#', '')
  const params = new URLSearchParams(hash)
  return Object.fromEntries(params.entries())
}

// Update the hash string with the current state of active tabs
const setHashParams = (key, value) => {
  const hash = window.location.hash.replace('#', '')
  const params = new URLSearchParams(hash)
  params.set(key, value)
  window.location.hash = params.toString()
}

const activeKey = ref(getHashParams()[props.tabKey] || props.active)

const isActive = (key) => {
  return key === activeKey.value
}

const setActive = (key) => {
  activeKey.value = key
  emit('update:active', key)

  // Update the hash with the new active state
  setHashParams(props.tabKey, key)
}

onMounted(() => {
  // Watch for hash changes and update activeKey if needed
  window.addEventListener('hashchange', () => {
    const params = getHashParams()
    if (params[props.tabKey]) {
      activeKey.value = params[props.tabKey]
    }
  })
})

// Cleanup the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('hashchange', () => {})
})
</script>

<template>
  <div>
    <slot :is-active="isActive" :set-active="setActive" name="navigation">
      Fill in navigation content here
    </slot>
    <slot :is-active="isActive" name="content"> Fill in content here</slot>
  </div>
</template>
