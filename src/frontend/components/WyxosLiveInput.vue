<script>
import useFormErrors from '../utilities/useFormErrors'
import FormBuilder from '../utilities/FormBuilder.js'

export default {
  name: 'WyxosLiveInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    bag: {
      type: String,
      default: () => {
        return 'default'
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    fieldClass: {
      type: String,
      default: null
    },
    inputRootClass: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number, null],
      default: null
    },
    form: {
      type: FormBuilder,
      default: null
    },
    disabled: {
      type: [Boolean, String],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const errors = useFormErrors()

    return {
      errors
    }
  },
  methods: {
    onInput(value) {
      if (!this.name) {
        this.$emit('update:modelValue', value)

        return
      }

      if (this.form) {
        this.form.clearError(this.name)

        return this.form.submit(null, {
          formatter: () => ({ field: this.name, value })
        })
      }

      this.errors.clear(this.name, this.bag)

      this.$emit('update:modelValue', value)
    },
    getError() {
      if (!this.name) {
        return
      }

      if (this.form) {
        return this.form.getError(this.name)
      }

      return this.errors.get(this.name)
    }
  }
}
</script>
<template>
  <o-field :label="label" :class="fieldClass" v-bind="{ ...getError() }">
    <o-input
      :readonly="readonly"
      :class="inputClass"
      :root-class="inputRootClass"
      :name="name"
      :type="type"
      :clearable="clearable"
      :disabled="disabled"
      :model-value="modelValue"
      :placeholder="placeholder"
      @update:model-value="onInput($event)"></o-input>
  </o-field>
</template>
