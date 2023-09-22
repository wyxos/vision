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
  </o-table>
</template>