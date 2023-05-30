<script>
import LoadState from '../utilities/LoadState.js'

export default {
    name: 'WyxosPrompt',
    props: {
        title: {
            type: String,
            default: null
        },
        message: {
            type: String,
            default: null
        },
        confirmText: {
            type: String,
            default: null
        },
        cancelText: {
            type: String,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
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

            this.$emit('close', {action: true})
        }
    }
}
</script>

<template>
    <o-modal :active="true">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="button-group">
            <wyxos-button
                    :disabled="state.isLoading"
                    native-type="button"
                    @click="$emit('close', { action: false })">
                {{ cancelText }}
            </wyxos-button>
            <wyxos-button
                    :loading="state.isLoading"
                    native-type="button"
                    @click="proceed()"
            >{{ confirmText }}
            </wyxos-button>
        </div>
    </o-modal>
</template>
