<script>
import FormBuilder from '../utilities/FormBuilder'
import Listing from '../utilities/Listing.js'

export default {
  name: 'WyxosForm',
  props: {
    form: {
      type: FormBuilder,
      required: true
    },
    submit: {
      type: Function,
      default: null
    },
    listing: {
      type: Listing,
      default: null
    },
    reset: {
      type: Boolean,
      default: false
    },
    formClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  emits: ['submitted'],
  methods: {
    async handle() {
      if (this.submit) {
        await this.submit(this.form)
      } else {
        await this.form.submit()
      }

      if (this.reset) {
        this.form.reset()
      }

      this.$emit('submitted')

      if (this.listing) {
        return this.listing.reload()
      }
    }
  }
}
</script>

<template>
  <form :class="formClass" v-if="form.isLoaded" @submit.prevent="handle()">
    <slot></slot>
  </form>
  <o-loading v-if="form.isLoading" :active="true"></o-loading>
  <o-button v-if="form.isFailure" @click="form.load()">
    Error. Retry or refresh.
  </o-button>
</template>
