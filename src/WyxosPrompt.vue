<script>
import LoadState from './LoadState'

export default {
    name: 'WyxosPrompt',
    props: {
        title: {
            type: String
        },
        message: {
            type: String
        },
        confirmText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean
        },
        callback: {
            type: Function
        }
    },
    setup(){
        return {
            state: new LoadState()
        }
    },
    methods: {
        async proceed(){
            if(this.callback){
                this.state.loading()

                await this.callback()
                    .catch(error => {
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
        <p>{{ message}}</p>
        <div class="button-group">
            <wyxos-button native-type="button" :disabled="state.isLoading" @click="$emit('close', {action: false})">{{ cancelText }}</wyxos-button>
            <wyxos-button native-type="button" :loading="state.isLoading" @click="proceed()">{{ confirmText }}</wyxos-button>
        </div>
    </o-modal>
</template>
