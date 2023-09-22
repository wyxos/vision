<script>
import FormBuilder from '../utilities/FormBuilder.js'

export default {
  name: 'SessionExpired',
  emits: ['close'],
  setup() {
    const login = FormBuilder.create({
      form: {
        email: null,
        password: null
      },
      submitPath: `/portal/login`
    })

    return {
      login,
    }
  },
  data() {
    return {
      user: null,
      propertiesCount: 0,
      organisations: []
    }
  },
  methods: {
    async proceed() {
      await this.login.submit()

      this.$emit('close', { action: true })
    }
  }
}
</script>

<template>
  <o-modal :active="true">
    <div class="bg-white p-6">
      <h2 class="title">Session Expired</h2>
      <p class="mb-6">
        It looks like you've been away for a bit. For your security, please
        re-enter your credentials to continue.
      </p>
      <form @submit.prevent="proceed">
        <wyxos-input
          v-model="login.email"
          name="email"
          label="Email"></wyxos-input>
        <wyxos-input
          v-model="login.password"
          name="password"
          label="Password"
          type="password"></wyxos-input>
        <div class="buttons">
          <w-button class="button is-danger" :disabled="login.isSubmitting">
            Logout
          </w-button>
          <w-button
            class="button is-primary"
            native-type="submit"
            :loading="login.isSubmitting">
            Login
          </w-button>
        </div>
      </form>
    </div>
  </o-modal>
</template>
