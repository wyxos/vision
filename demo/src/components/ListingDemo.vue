<template>
  <div class="listing-demo">
    <h2>Listing Demo</h2>
    <p>This demo shows how to use the Listing utility to fetch and display paginated data.</p>

    <div class="filter-container">
      <h3>Filters</h3>
      <div class="filter-form">
        <div class="filter-group">
          <label for="userId">Filter by User ID</label>
          <input
            id="userId"
            type="number"
            v-model="listing.filter.query.userId"
            min="1"
            max="10"
          >
        </div>

        <div class="filter-actions">
          <button @click="applyFilters" class="apply-button">Apply Filters</button>
          <button @click="resetFilters" class="reset-button">Reset Filters</button>
        </div>
      </div>
    </div>

    <div class="listing-container">
      <div v-if="listing.isLoading" class="loading">
        Loading posts...
      </div>

      <div v-else>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listing.attributes.items" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.userId }}</td>
              <td>
                <button @click="viewDetails(item)" class="view-button">View</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <div class="pagination-info">
            Showing {{ listing.attributes.items.length }} of {{ listing.attributes.total }} items
          </div>
          <div class="pagination-controls">
            <button
              @click="prevPage"
              :disabled="listing.filter.query.page <= 1"
              class="pagination-button"
            >
              Previous
            </button>
            <span class="page-info">Page {{ listing.filter.query.page }}</span>
            <button
              @click="nextPage"
              :disabled="!hasMorePages"
              class="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
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
        <button @click="selectedItem = null" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Listing from '@/utilities/Listing.js'

export default {
  name: 'ListingDemo',
  setup() {
    // Create a new listing with initial query parameters
    const listing = new Listing({
      page: 1,
      limit: 10,
      userId: ''
    })

    // Set the URL to load data from
    listing.loadFrom('https://jsonplaceholder.typicode.com/posts')

    // Selected item for details view
    const selectedItem = ref(null)

    // Computed property to check if there are more pages
    const hasMorePages = computed(() => {
      return listing.attributes.total >
        (listing.filter.query.page * listing.filter.query.limit)
    })

    // Function to apply filters
    const applyFilters = () => {
      listing.filter.query.page = 1
      listing.search()
    }

    // Function to reset filters
    const resetFilters = () => {
      listing.resetSearch()
    }

    // Function to go to the next page
    const nextPage = () => {
      if (hasMorePages.value) {
        listing.next()
      }
    }

    // Function to go to the previous page
    const prevPage = () => {
      if (listing.filter.query.page > 1) {
        listing.filter.query.page -= 1
        listing.search()
      }
    }

    // Function to view item details
    const viewDetails = (item) => {
      selectedItem.value = item
    }

    // Load data when component is mounted
    onMounted(() => {
      // Transform the query parameters to match the JSONPlaceholder API
      listing.transform(query => {
        const transformedQuery = { ...query }

        // Only include userId if it's not empty
        if (!transformedQuery.userId) {
          delete transformedQuery.userId
        }

        // JSONPlaceholder uses _page and _limit for pagination
        transformedQuery._page = transformedQuery.page
        transformedQuery._limit = transformedQuery.limit

        delete transformedQuery.page
        delete transformedQuery.limit

        return transformedQuery
      })

      // Load initial data
      listing.load().then(response => {
        // JSONPlaceholder returns total count in headers
        const totalCount = parseInt(response.headers['x-total-count'] || '0')
        listing.attributes.total = totalCount
      })
    })

    return {
      listing,
      selectedItem,
      hasMorePages,
      applyFilters,
      resetFilters,
      nextPage,
      prevPage,
      viewDetails
    }
  }
}
</script>

<style scoped>
.listing-demo {
  margin-bottom: 30px;
}

h2, h3 {
  margin-top: 0;
  color: #333;
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

.loading {
  padding: 20px;
  text-align: center;
  color: #666;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th, .data-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.data-table tr:hover {
  background-color: #f9f9f9;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination-info {
  color: #666;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  background-color: #2196F3;
  color: white;
}

.pagination-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.page-info {
  font-weight: bold;
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
