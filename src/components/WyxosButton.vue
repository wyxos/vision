<script>
import FormBuilder from '../utilities/FormBuilder.js'

export default {
  name: 'WyxosButton',
  props: {
    form: {
      type: FormBuilder,
      default: null
    }
  }
}
</script>

<template>
  <button :disabled="form.isSubmitting" type="submit">
    <slot>
      <span v-if="!form.isSubmitting">Submit</span>
      <span v-if="form.isSubmitting">Processing</span>
    </slot>
    <slot v-if="form.isSubmitting" name="icon">
      <i class="fas fa-spinner fa-spin"></i>
    </slot>
  </button>
</template>
