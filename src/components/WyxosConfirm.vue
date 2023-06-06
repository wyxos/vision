<script>
import LoadState from '../utilities/LoadState'

export default {
  name: 'WyxosConfirm',
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    message: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: ''
    },
    confirmType: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean
    },
    callback: {
      type: Function,
      default: null
    }
  },
  emits: ['close'],
  setup() {
    return {
      state: new LoadState()
    }
  },
  methods: {
    async proceed() {
      if (this.callback) {
        this.state.loading()

        await this.callback().catch((error) => {
          this.state.failed()

          throw error
        })

        this.state.loaded()
      }

      this.$emit('close', { action: true })
    }
  }
}
</script>

<template>
  <o-modal :active="true" @close="$emit('close', { action: false })">
    <section class="bg-white p-6">
      <article>
        <header>
          <h3 class="title">{{ title }}</h3>
        </header>
        <p class="mb-6">{{ message }}</p>
        <footer class="buttons" role="group">
          <wyxos-button
            :disabled="state.isLoading"
            class="button secondary"
            native-type="button"
            @click="$emit('close', { action: false })"
            >{{ cancelText }}
          </wyxos-button>
          <wyxos-button
            :class="{ [confirmType]: true }"
            :loading="state.isLoading"
            class="button"
            native-type="button"
            @click="proceed()">
            {{ confirmText }}
          </wyxos-button>
        </footer>
      </article>
    </section>
  </o-modal>
</template>
