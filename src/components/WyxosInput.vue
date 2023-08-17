<script>
import useFormErrors from '../utilities/useFormErrors'

export default {
  name: 'WyxosInput',
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
    fieldClass: {
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
    disabled: {
      type: [Boolean, String],
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
      this.errors.clear(this.name, this.bag)

      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<template>
  <o-field
    :label="label"
    :class="fieldClass"
    v-bind="{ ...errors.get(name, bag) }">
    <o-input
      :readonly="readonly"
      :class="inputClass"
      :name="name"
      :type="type"
      :disabled="disabled"
      :model-value="modelValue"
      @update:model-value="onInput($event)"></o-input>
  </o-field>
</template>