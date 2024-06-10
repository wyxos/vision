<script>
import Listing from '../utilities/Listing.js'
import FormBuilder from '../utilities/FormBuilder.js'

export default {
  name: 'WyxosRemove',
  props: {
    listing: {
      type: Listing,
      default: null
    },
    route: {
      type: String,
      required: true
    }
  },
  emits: ['removed', 'failed'],
  setup() {
    return {
      destroy: FormBuilder.create()
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    async onRemove() {
      this.isVisible = true
    },
    remove() {
      // execute axios.delete pointing to the route received from props
      this.destroy
        .delete(this.route)
        .then(() => {
          this.$emit('removed')

          if (this.listing) {
            this.listing.reload()
          }

          this.isVisible = false
        })
        .catch(() => {
          this.$emit('failed')
        })
    }
  }
}
</script>

<template>
  <w-button class="button is-danger" @click="onRemove()">
    <slot name="button"><i class="fas fa-trash"></i></slot>
    <teleport v-if="isVisible" to="body">
      <o-modal v-model:active="isVisible">
        <div class="content p-6">
          <slot name="title"><h3 class="title">Delete</h3></slot>
          <slot name="message"
            ><p class="mb-4">
              Are you sure you want to delete this record?
            </p></slot
          >
          <div class="buttons flex gap-6 justify-end">
            <o-button class="button is-secondary" @click="isVisible = false"
              >Cancel
            </o-button>
            <w-button
              :loading="destroy.isSubmitting"
              class="button is-danger"
              @click="remove()">
              <slot name="confirm">Confirm</slot>
            </w-button>
          </div>
        </div>
      </o-modal>
    </teleport>
  </w-button>
</template>
