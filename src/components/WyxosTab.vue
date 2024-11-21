<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  active: {
    type: String,
    required: true
  },
  hashKey: {
    type: String,
    default: () => `tab-${Math.random().toString(36).slice(2, 11)}` // Unique default value
  },
  responsiveResolution: {
    type: Number,
    default: 768 // Default resolution threshold for mobile or tablet
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

const activeKey = ref(getHashParams()[props.hashKey] || props.active)
const isMobileView = ref(false)

const isActive = (key) => {
  if (isMobileView.value) {
    return true // Always active on small screen sizes
  }
  return key === activeKey.value
}

// Handle window resize events
const handleResize = () => {
  isMobileView.value = window.innerWidth <= props.responsiveResolution
}

const setActive = (key) => {
  activeKey.value = key
  emit('update:active', key)

  // Update the hash with the new active state
  setHashParams(props.hashKey, key)
}

onMounted(() => {
  // Watch for hash changes and update activeKey if needed
  window.addEventListener('hashchange', () => {
    const params = getHashParams()
    if (params[props.hashKey]) {
      activeKey.value = params[props.hashKey]
    }
  })

  // Initial check for mobile view
  handleResize()

  // Watch for window resize changes
  window.addEventListener('resize', handleResize)
})

// Cleanup the event listener when the component is unmounted
onUnmounted(() => {
  window.removeEventListener('hashchange', () => {})
  window.removeEventListener('resize', handleResize)
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
