<script>
import axios from 'axios'

export default {
  name: 'WyxosLogout',
  props: {
    path: {
      type: String,
      default: '/logout'
    }
  },
  methods: {
    async logout() {
      const {data} = await axios
          .post(this.path)
          .catch((error) => {
            if (error.response.status === 401) {
              window.location.href = '/'
            }

            throw error
          })

      window.location.href = data?.redirect || '/'
    }
  }
}
</script>

<template>
  <slot :logout="logout">
    <button class="button is-primary" @click="logout()">Sign out</button>
  </slot>
</template>
