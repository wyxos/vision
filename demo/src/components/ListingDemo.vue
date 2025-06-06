<template>
  <div class="listing-demo">
    <h2>Listing Demo</h2>
    <p>This demo shows how to use the Listing utility to fetch and display paginated data.</p>

    <!-- States Display -->
    <div class="states-container">
      <h3>Listing States</h3>
      <div class="states-grid">
        <div class="state-item">
          <div class="state-label">Load States:</div>
          <div class="state-badges">
            <span :class="{ active: listing.isLoading }" class="state-badge">Loading</span>
            <span :class="{ active: listing.isLoaded }" class="state-badge">Loaded</span>
            <span :class="{ active: listing.isLoadFailed }" class="state-badge">Failed</span>
          </div>
        </div>
        <div class="state-item">
          <div class="state-label">Search States:</div>
          <div class="state-badges">
            <span :class="{ active: listing.isSearching }" class="state-badge">Searching</span>
            <span :class="{ active: listing.isSearched }" class="state-badge">Searched</span>
            <span :class="{ active: listing.isSearchFailed }" class="state-badge">Failed</span>
          </div>
        </div>
        <div class="state-item">
          <div class="state-label">Refresh States:</div>
          <div class="state-badges">
            <span :class="{ active: listing.isRefreshing }" class="state-badge">Refreshing</span>
            <span :class="{ active: listing.isRefreshed }" class="state-badge">Refreshed</span>
            <span :class="{ active: listing.isRefreshFailed }" class="state-badge">Failed</span>
          </div>
        </div>
      </div>
    </div>

    <div class="filter-container">
      <h3>Filters</h3>
      <div class="filter-form">
        <div class="filter-group">
          <label for="userId">Filter by User ID</label>
          <input
            id="userId"
            v-model="listing.filter.query.userId"
            max="10"
            min="1"
            type="number"
          >
        </div>

        <div class="filter-actions">
          <button
            :disabled="listing.isSearching"
            class="apply-button"
            @click="applyFilters"
          >
            {{ listing.isSearching ? 'Searching...' : 'Apply Filters' }}
          </button>
          <button
            :disabled="listing.isSearching"
            class="reset-button"
            @click="resetFilters"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <div class="listing-container">
      <div v-if="listing.isLoading || listing.isSearching || listing.isRefreshing" class="loading">
        {{ getLoadingMessage() }}
      </div>

      <div v-else-if="listing.isLoadFailed || listing.isSearchFailed || listing.isRefreshFailed" class="error-message">
        Failed to load data. <button class="retry-button" @click="retryLoad">Retry</button>
      </div>

      <div v-else>
        <o-table
          :loading="listing.isLoading || listing.isSearching || listing.isRefreshing"
          v-bind="listing.config"
          v-on="listing.events"
        >
          <o-table-column v-slot="props" field="id" label="ID">
            {{ props.row.id }}
          </o-table-column>
          <o-table-column v-slot="props" field="title" label="Title">
            {{ props.row.title }}
          </o-table-column>
          <o-table-column v-slot="props" field="userId" label="User ID">
            {{ props.row.userId }}
          </o-table-column>
          <o-table-column v-slot="props" label="Actions">
            <button class="view-button" @click="viewDetails(props.row)">View</button>
          </o-table-column>
        </o-table>
      </div>
    </div>

    <div v-if="selectedItem" class="item-details">
      <h3>Post Details</h3>
      <div class="details-card">
        <h4>{{ selectedItem.title }}</h4>
        <p>{{ selectedItem.body }}</p>
        <div class="details-meta">
          <span>ID: {{ selectedItem.id }}</span>
          <span>User ID: {{ selectedItem.userId }}</span>
        </div>
        <button class="close-button" @click="selectedItem = null">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Listing from '@/utilities/Listing.js'
import { OTable, OTableColumn } from '@oruga-ui/oruga-next'

export default {
  name: 'ListingDemo',
  components: {
    OTable,
    OTableColumn
  },
  setup() {
    // Create a new listing with initial query parameters
    const listing = new Listing({
      page: 1,
      limit: 10,
      userId: ''
    })

    // URL to load data from
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'

    // Selected item for details view
    const selectedItem = ref(null)

    // Last action performed (for retry functionality)
    const lastAction = ref(null)


    // Function to get appropriate loading message
    const getLoadingMessage = () => {
      if (listing.isLoading) return 'Loading posts...'
      if (listing.isSearching) return 'Searching posts...'
      if (listing.isRefreshing) return 'Refreshing posts...'
      return 'Loading...'
    }

    // Function to retry the last failed action
    const retryLoad = () => {
      if (lastAction.value === 'load') {
        listing.load(apiUrl)
      } else if (lastAction.value === 'search') {
        listing.search()
      } else if (lastAction.value === 'refresh') {
        listing.refresh()
      } else {
        // Default fallback
        listing.load(apiUrl)
      }
    }

    // Function to apply filters
    const applyFilters = () => {
      listing.filter.query.page = 1
      lastAction.value = 'search'
      listing.search()
    }

    // Function to reset filters
    const resetFilters = () => {
      lastAction.value = 'search'
      listing.resetSearch()
    }


    // Function to view item details
    const viewDetails = (item) => {
      selectedItem.value = item
    }

    // Function to format the response to match what the Listing class expects
    const setupResponseFormatter = () => {
      listing.format(response => {
        // Format the response to match what the Listing class expects
        const totalCount = parseInt(response.headers['x-total-count'] || '0')
        const perPage = listing.filter.query.limit

        // Create and return an object with the expected structure
        return {
          listing: {
            items: response.data, // The items are in the response data array
            total: totalCount,
            perPage,
            showing: response.data.length
          }
        }
      })
    }

    // Load data when component is mounted
    onMounted(() => {
      // Transform the query parameters to match the JSONPlaceholder API
      listing.transform(query => {
        const transformedQuery = { ...query }

        // JSONPlaceholder uses _page and _limit for pagination
        transformedQuery._page = transformedQuery.page
        transformedQuery._limit = transformedQuery.limit

        delete transformedQuery.page
        delete transformedQuery.limit

        return transformedQuery
      })

      // Set up success and failure callbacks
      listing.onSuccess(data => {
        console.log('Operation successful:', data)
        return data
      })

      listing.onFail(error => {
        console.error('Operation failed:', error)
        return error
      })

      // Set up the response formatter
      setupResponseFormatter()

      // Load initial data
      lastAction.value = 'load'
      listing.load(apiUrl)
    })

    return {
      listing,
      selectedItem,
      getLoadingMessage,
      retryLoad,
      applyFilters,
      resetFilters,
      viewDetails
    }
  }
}
</script>

<style>
.listing-demo {
  margin-bottom: 30px;
}

h2, h3 {
  margin-top: 0;
  color: #333;
}

h3 {
  margin-bottom: 10px;
}

/* States Container Styles */
.states-container {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.states-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}

@media (max-width: 768px) {
  .states-grid {
    grid-template-columns: 1fr;
  }
}

.state-item {
  margin-bottom: 10px;
}

.state-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.state-badges {
  display: flex;
  gap: 10px;
}

.state-badge {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #e9ecef;
  color: #6c757d;
  font-size: 12px;
  transition: all 0.3s ease;
}

.state-badge.active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.filter-container {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #eee;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-actions {
  display: flex;
  gap: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.apply-button {
  background-color: #4CAF50;
  color: white;
}

.reset-button {
  background-color: #f44336;
  color: white;
}

.view-button {
  background-color: #2196F3;
  color: white;
  padding: 5px 10px;
  font-size: 12px;
}

.close-button {
  background-color: #757575;
  color: white;
  margin-top: 15px;
}

.retry-button {
  background-color: #ff9800;
  color: white;
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 12px;
}

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error-message {
  padding: 20px;
  text-align: center;
  color: #f44336;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 20px;
}

/* Oruga table styling overrides */
:deep(.o-table) {
  width: 100%;
  margin-bottom: 20px;
}

:deep(.o-table__th), :deep(.o-table__td) {
  padding: 10px;
  text-align: left;
}

:deep(.o-table__th) {
  background-color: #f5f5f5;
  font-weight: bold;
}

:deep(.o-table__tr:hover) {
  background-color: #f9f9f9;
}


.item-details {
  margin-top: 30px;
  padding: 15px;
  background-color: #e3f2fd;
  border-radius: 4px;
  border-left: 4px solid #2196F3;
}

.details-card {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.details-card h4 {
  margin-top: 0;
  color: #333;
}

.details-meta {
  margin-top: 15px;
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 14px;
}
</style>
