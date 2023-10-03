<script>
import Listing from '../utilities/Listing.js'

export default {
  name: 'WyxosListing',
  props: {
    listing: {
      type: Listing,
      required: true
    }
  },
  computed: {
    allPropsAndEvents() {
      return {
        ...this.listing.config,
        ...Object.keys(this.listing.events).reduce((acc, eventName) => {
          acc[`on${eventName.charAt(0).toUpperCase() + eventName.slice(1)}`] =
            this.listing.events[eventName]
          return acc
        }, {})
      }
    }
  }
}
</script>

<template>
  <o-table v-bind="allPropsAndEvents">
    <template v-for="(_, slot) in $slots" #[slot]="slotData">
      <slot :name="slot" v-bind="slotData"></slot>
    </template>
    <template #empty>
      <p v-if="listing.isEmpty">No records found.</p>
      <p v-if="listing.isSearchEmpty">
        No results for your query. Please adjust your search and try again.
      </p>
    </template>
  </o-table>
</template>
