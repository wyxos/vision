<script>
import useFormErrors from '../utilities/useFormErrors'
import FormBuilder from '../utilities/FormBuilder.js'

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
    clearable: {
      type: Boolean,
      default() {
        return false
      }
    },
    fieldClass: {
      type: String,
      default() {
        return null
      }
    },
    inputRootClass: {
      type: String,
      default() {
        return null
      }
    },
    inputClass: {
      type: String,
      default() {
        return null
      }
    },
    modelValue: {
      type: [String, Number, null],
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
    disabled: {
      type: [Boolean, String],
      default() {
        return null
      }
    },
    placeholder: {
      type: String,
      default() {
        return null
      }
    },
    passwordReveal: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const errors = useFormErrors()

    return {
      errors
    }
  },
  computed: {
    getError() {
      if (!this.name) {
        return
      }

      if (this.form) {
        return this.form.getError(this.name)
      }

      return this.errors.get(this.name, this.bag)
    }
  },
  methods: {
    onInput(value) {
      // Clearing the error if form object exists, else clear using errors helper.
      if (this.form) {
        this.form.clearError(this.name)
      } else {
        this.errors.clear(this.name, this.bag)
      }

      // Emitting the new value to the parent.
      // This is all you need to update the parent's state.
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<template>
  <o-field :class="fieldClass" :label="label" v-bind="getError">
    <o-input
      :class="inputClass"
      :clearable="clearable"
      :disabled="disabled"
      :model-value="modelValue ?? ''"
      :name="name"
      :password-reveal="passwordReveal"
      :placeholder="placeholder"
      :readonly="readonly"
      :root-class="inputRootClass"
      :type="type"
      @update:model-value="onInput($event)"></o-input>
  </o-field>
</template>
