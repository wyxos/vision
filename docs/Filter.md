# Filter

Query filtering utility used by the Listing module:

```javascript
import { Filter } from '@wyxos/vision'

// Create a filter with initial query parameters
const filter = new Filter({
  search: '',
  status: 'active',
  page: 1
})

// Check if filter is dirty (has been modified)
console.log('Is filter dirty?', filter.isDirty)

// Reset filter to original values
filter.reset()

// Clear a specific filter
filter.clear('status')

// Get filled fields (non-empty values)
const filledFields = filter.getFilledFields()
```
