<script setup>
import { onMounted } from 'vue'
import { FormBuilder, Listing } from '../../src/main'

const form = FormBuilder.create({ title: '', body: '' })
const listing = Listing.create({ page: 1 }).loadFrom('https://jsonplaceholder.typicode.com/posts')

const submit = async () => {
  await form.post('https://jsonplaceholder.typicode.com/posts')
  await listing.load()
}

onMounted(() => {
  listing.load()
})
</script>

<template>
  <div class="container">
    <h1 class="title">Vision Demo</h1>
    <wyxos-form :form="form" :submit="submit" form-class="box">
      <wyxos-input label="Title" name="title" :form="form" />
      <wyxos-input label="Body" name="body" :form="form" />
      <wyxos-button :form="form">Create</wyxos-button>
    </wyxos-form>

    <h2 class="title is-4 mt-4">Posts</h2>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listing.attributes.items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
}
.table {
  margin-top: 1rem;
}
</style>
