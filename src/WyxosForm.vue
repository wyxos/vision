<script>
import FormBuilder from './FormBuilder.js'

export default {
  name: 'WyxosForm',
  props: {
    form: {
      type: FormBuilder,
      required: true
    }
  },
  emits: ['submit']
}
</script>

<template>
    <div>
        <form
            v-if="form.isLoaded"
            class="form"
            @submit.prevent="$emit('submit')">
            <slot></slot>
        </form>
        <o-loading :active="form.isLoading"></o-loading>
        <o-button
            v-if="form.isFailure"
            @click="form.load()">
            An error occurred. Try again?
        </o-button>
    </div>
</template>
