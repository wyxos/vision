<script>
import moment from 'moment'
import FormBuilder from '../utilities/FormBuilder'

export default {
  name: 'WyxosDatepicker',
  // components: {
  //   VueDatePicker
  // },
  props: {
    modelValue: {
      required: true,
      type: [null, String]
    },
    displayFormat: {
      type: String,
      default() {
        return 'DD/MM/YYYY'
      }
    },
    submitFormat: {
      type: String,
      default() {
        return 'YYYY-MM-DD'
      }
    },
    label: {
      type: String,
      default() {
        return null
      }
    },
    name: {
      type: String,
      default() {
        return null
      }
    },
    form: {
      type: FormBuilder,
      default() {
        return null
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      query: null
    }
  },
  computed: {
    mergedOptions() {
      return {
        enableTimePicker: false,
        autoApply: true,
        ...this.options
      }
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.query = newVal ? moment(newVal, this.submitFormat)._d : null
      },
      immediate: true,
      deep: true
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

      this.form?.clearError(this.name)
    }
  }
}
</script>

<template>
  <o-field :label="label" v-bind="form?.getError(name)">
    <!--    <VueDatePicker-->
    <!--      v-model="query"-->
    <!--      v-bind="mergedOptions"-->
    <!--      @update:model-value="updateQuery"></VueDatePicker>-->
    <o-datepicker
      v-model="query"
      :formatter="dateFormatter"
      trap-focus
      v-bind="options"
      @update:model-value="updateQuery"></o-datepicker>
  </o-field>
</template>
