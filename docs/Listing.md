# Listing

Comprehensive listing and pagination utility with filtering, searching, and state management:

```javascript
import { Listing } from '@wyxos/vision'
import { useRouter, useRoute } from 'vue-router'

// Create a listing with initial query parameters
const listing = Listing.create({ 
  page: 1, 
  perPage: 10,
  search: '',
  status: 'active'
})

// State tracking
console.log('Is listing loading?', listing.isLoading)
console.log('Is listing searching?', listing.isSearching)
console.log('Is listing refreshing?', listing.isRefreshing)

// Load data from an API endpoint
listing.load('/api/users')
  .then(() => {
    console.log('Users:', listing.attributes.items)
    console.log('Total:', listing.attributes.total)
    console.log('Current page:', listing.filter.query.page)
  })

// Transform query parameters before sending to server
listing.transform(query => {
  // Modify query before sending to server
  return {
    ...query,
    search: query.search ? query.search.trim() : ''
  }
})

// Format response data
listing.format(response => {
  return {
    listing: {
      items: response.data.data,
      total: response.data.meta.total,
      perPage: response.data.meta.per_page,
      showing: response.data.data.length
    },
    filters: response.data.meta.filters || []
  }
})

// Search with current filter parameters
listing.search()

// Navigate to next page
listing.next()

// Reset search parameters
listing.resetSearch()

// Clear a specific filter
listing.clear('status')

// Reset all filters to original values
listing.reset()

// Integration with Vue Router
const router = useRouter()
const route = useRoute()
listing.useRouter(router, route)
```

The Listing module works along with the PHP package `@wyxos/harmonie` which should be located at `../php/harmonie` relative to your project for backend integration.
