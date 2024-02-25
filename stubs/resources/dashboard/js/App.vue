<script>
export default {
    mounted() {
        window.axios.get('/api/test')
    },
    methods: {
        helloWorld() {
            alert('Hello World!')
        }
    }
}
</script>
<template>
    <h1>Your admin is ready</h1>
    <p>Build something awesome!</p>
    <o-button class="p-4 bg-blue-500 text-slate-200" @click="helloWorld()">Click me</o-button>
</template>
