<script>
import FormBuilder from '../utilities/FormBuilder'
import Listing from "../utilities/Listing.js";

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

      if(this.reset){
        this.form.reset()
      }

      this.$emit('submitted')

      if(this.listing){
        return this.listing.reload()
      }
    }
  }
}
</script>

<template>
  <div>
    <form v-if="form.isLoaded" @submit.prevent="handle()">
      <slot></slot>
    </form>
    <o-loading :active="form.isLoading"></o-loading>
    <o-button v-if="form.isFailure" @click="form.load()">
      An error occurred. Try again?
    </o-button>
  </div>
</template>
