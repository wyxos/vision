<script>

export default {
  name: 'TokenExpired',
  emits: ['close'],
  methods: {
    async proceed() {
      this.$emit('close', { action: true })
    }
  }
}
</script>

<template>
  <o-modal :active="true">
    <div class="bg-white p-6">
      <h2 class="title">Session expired</h2>
      <p class="mb-6">
        Your tab has been idle for a while. We've refreshed your session for
        you. If you encountered an error after performing an action, please
        close this prompt and try again.
      </p>
      <div class="buttons">
        <w-button
          class="button is-primary"
          @click="$emit('close', { action: true })">
          Confirm
        </w-button>
      </div>
    </div>
  </o-modal>
</template>
