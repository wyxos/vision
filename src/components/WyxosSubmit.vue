<script>
import FormBuilder from '../utilities/FormBuilder.js'

export default {
  name: 'WyxosButton',
  props: {
    form: {
      type: FormBuilder,
      required: true
    },
    labels: {
      type: Object,
      default() {
        return {
          submit: 'Submit',
          submitting: 'Processing',
          submitted: 'Complete',
          failed: 'Retry'
        }
      }
    }
  },
  data() {
    return {
      mergedLabels: {
        submit: 'Submit',
        submitting: 'Processing',
        submitted: 'Complete',
        failed: 'Retry'
      }
    }
  },
  watch: {
    labels: {
      deep: true,
      handler(newVal) {
        this.mergedLabels = { ...this.mergedLabels, ...newVal }
      }
    }
  },
  created() {
    this.mergedLabels = { ...this.mergedLabels, ...this.labels }
  }
}
</script>

<template>
  <o-button
      :disabled="Boolean(form.isSubmitting || form.isSubmitted)"
      native-type="submit">
    <span
        v-if="!form.isSubmitted && !form.isSubmitting && !form.isSubmitFailed"
    >{{ mergedLabels.submit }}</span
    >
    <span v-if="form.isSubmitting"
    >{{ mergedLabels.submitting }} <i class="fas fa-spinner fa-spin"></i
    ></span>
    <span v-if="form.isSubmitted">{{ mergedLabels.submitted }}</span>
    <span v-if="form.isSubmitFailed">{{ mergedLabels.failed }}</span>
  </o-button>
</template>
