# WyxosListing Component

The WyxosListing component provides a convenient wrapper around the Listing utility:

```vue
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Reference to the WyxosListing component
const listingRef = ref(null)

// Handle successful data loading
const onSuccess = (response) => {
  console.log('Data loaded successfully:', response)
}

// Custom transform function
const transformQuery = (query) => {
  return {
    ...query,
    search: query.search ? query.search.trim() : ''
  }
}

// Custom format function
const formatResponse = (response) => {
  return {
    listing: {
      items: response.data.data,
      total: response.data.meta.total,
      perPage: response.data.meta.per_page,
      showing: response.data.meta.per_page
    },
    filters: response.data.meta.filters || []
  }
}

// Method to trigger a search
const performSearch = () => {
  listingRef.value.search()
}

// Method to reset search
const resetFilters = () => {
  listingRef.value.resetSearch()
}
</script>

<template>
  <div>
    <WyxosListing
      ref="listingRef"
      load-url="/api/users"
      :query="{ page: 1, perPage: 10, search: '' }"
      :router="router"
      :route="route"
      :transform="transformQuery"
      :format="formatResponse"
      auto-load
      @success="onSuccess"
    >
      <template #default="{ 
        listing, 
        attributes, 
        isLoading, 
        isSearching,
        search,
        resetSearch,
        refresh
      }">
        <!-- Search controls -->
        <div class="search-controls">
          <input 
            v-model="listing.filter.query.search" 
            placeholder="Search..." 
            @keyup.enter="search()"
          />
          <button @click="search()" :disabled="is-searching">
            {{ is-searching ? 'Searching...' : 'Search' }}
          </button>
          <button @click="reset-search()">Reset</button>
          <button @click="refresh()">Refresh</button>
        </div>

        <!-- Loading state -->
        <div v-if="isLoading">Loading...</div>

        <!-- Data table -->
        <table v-else>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in attributes.items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <button @click="editItem(item)">Edit</button>
                <button @click="deleteItem(item)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
          <span>
            Showing {{ attributes.showing }} of {{ attributes.total }} items
          </span>
          <!-- Implement pagination controls here -->
        </div>
      </template>
    </WyxosListing>
  </div>
</template>
```
