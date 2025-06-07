<script setup>
import { ref, computed, onMounted, provide } from 'vue'
import Listing from '../utilities/Listing.js'

const props = defineProps({
  // Initial query parameters
  query: {
    type: Object,
    default: () => ({})
  },
  // URL for loading listing data
  loadUrl: {
    type: String,
    default: null
  },
  // Auto-load listing data on mount
  autoLoad: {
    type: Boolean,
    default: false
  },
  // Function to transform query before submission
  transform: {
    type: Function,
    default: null
  },
  // Function to format response data
  format: {
    type: Function,
    default: null
  },
  // Router instance for query parameter handling
  router: {
    type: Object,
    default: null
  },
  // Route instance for query parameter handling
  route: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'success',
  'fail',
  'search',
  'searched',
  'search-failed',
  'load',
  'loaded',
  'load-failed',
  'refresh',
  'refreshed',
  'refresh-failed',
  'page-change'
])

// Create Listing instance
const listing = ref(Listing.create(props.query))

// Apply configuration based on props
if (props.transform) {
  listing.value.transform(props.transform)
}

if (props.format) {
  listing.value.format(props.format)
}

if (props.router && props.route) {
  listing.value.useRouter(props.router, props.route)
}

// Set up callbacks
listing.value.onSuccess((response) => {
  emit('success', response)
  return response
})

listing.value.onFail((error) => {
  emit('fail', error)
  return error
})

// Computed properties for listing state
const isLoading = computed(() => listing.value.isLoading)
const isLoaded = computed(() => listing.value.isLoaded)
const isLoadFailed = computed(() => listing.value.isLoadFailed)
const isSearching = computed(() => listing.value.isSearching)
const isSearched = computed(() => listing.value.isSearched)
const isSearchFailed = computed(() => listing.value.isSearchFailed)
const isRefreshing = computed(() => listing.value.isRefreshing)
const isRefreshed = computed(() => listing.value.isRefreshed)
const isRefreshFailed = computed(() => listing.value.isRefreshFailed)
const isDirty = computed(() => listing.value.isDirty)
const attributes = computed(() => listing.value.attributes)
const config = computed(() => listing.value.config)
const events = computed(() => listing.value.events)

// Methods
const load = async (url = null) => {
  const loadUrl = url || props.loadUrl

  if (!loadUrl) {
    console.error('No load URL provided')
    return
  }

  emit('load', loadUrl)

  try {
    const response = await listing.value.load(loadUrl)
    emit('loaded', response)
    return response
  } catch (error) {
    emit('load-failed', error)
    throw error
  }
}

const search = async (preserveEmpty = false) => {
  emit('search', listing.value.filter.query)

  try {
    const response = await listing.value.search(preserveEmpty)
    emit('searched', response)
    return response
  } catch (error) {
    emit('search-failed', error)
    throw error
  }
}

const refresh = async () => {
  emit('refresh')

  try {
    const response = await listing.value.refresh()
    emit('refreshed', response)
    return response
  } catch (error) {
    emit('refresh-failed', error)
    throw error
  }
}

const reset = () => {
  return listing.value.reset()
}

const resetSearch = () => {
  return listing.value.resetSearch()
}

const clear = (key) => {
  return listing.value.clear(key)
}

const onPageChange = (page) => {
  emit('page-change', page)
  return listing.value.onPageChange(page)
}

// Auto-load on mount if enabled
onMounted(() => {
  if (props.autoLoad && props.loadUrl) {
    load()
  }
})

// Expose the listing instance to child components
provide('listing', listing)

// Expose methods and properties to parent component
defineExpose({
  listing,
  load,
  search,
  refresh,
  reset,
  resetSearch,
  clear,
  onPageChange,
  isLoading,
  isLoaded,
  isLoadFailed,
  isSearching,
  isSearched,
  isSearchFailed,
  isRefreshing,
  isRefreshed,
  isRefreshFailed,
  isDirty,
  attributes,
  config,
  events
})
</script>

<template>
  <div>
    <slot
      :listing="listing"
      :load="load"
      :search="search"
      :refresh="refresh"
      :reset="reset"
      :reset-search="resetSearch"
      :clear="clear"
      :on-page-change="onPageChange"
      :is-loading="isLoading"
      :is-loaded="isLoaded"
      :is-load-failed="isLoadFailed"
      :is-searching="isSearching"
      :is-searched="isSearched"
      :is-search-failed="isSearchFailed"
      :is-refreshing="isRefreshing"
      :is-refreshed="isRefreshed"
      :is-refresh-failed="isRefreshFailed"
      :is-dirty="isDirty"
      :attributes="attributes"
      :config="config"
      :events="events"
    ></slot>
  </div>
</template>
