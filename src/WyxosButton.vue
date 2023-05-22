<script>
export default {
    name: 'WyxosButton',
    props: {
        loading: {
            default: false,
            type: Boolean
        },
        text: {
            type: String,
            default: 'Processing...'
        }
    }
}
</script>

<template>
    <o-button :disabled="loading">
        <slot v-if="!loading">Submit</slot>
        <slot v-if="loading && text" name="loading">{{ text }}</slot>
        <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </o-button>
</template>
