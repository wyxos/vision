<script>
import moment from 'moment'

export default {
  name: 'WyxosDatepicker',
  props: {
    modelValue: {
      required: true,
      type: [null, String]
    },
    displayFormat: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    submitFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      query: null
    }
  },
  mounted() {
    if (this.modelValue) {
      this.query = moment(this.modelValue, this.submitFormat)._d
    }
  },
  methods: {
    dateFormatter(value) {
      if (!value) {
        return null
      }

      return moment(value).format(this.displayFormat)
    },
    updateQuery() {
      this.$emit(
        'update:modelValue',
        this.query ? moment(this.query).format(this.submitFormat) : null
      )
    }
  }
}
</script>

<template>
  <o-datepicker
    v-model="query"
    :date-formatter="dateFormatter"
    @update:model-value="updateQuery"></o-datepicker>
</template>
