<script>
import FormBuilder from '../utilities/FormBuilder'

export default {
  name: 'WyxosSelect',
  props: {
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    modelValue: {
      type: [null, String, Number],
      required: true
    },
    form: {
      type: FormBuilder,
      default: null
    },
    items: {
      type: Array,
      default: null
    }
  },
  emits: ['update:modelValue'],
  methods: {
    updateValue(value) {
      this.form?.clearError(this.name)
      this.$emit('update:modelValue', value)
    }
  }
}
</script>
<template>
  <o-field :label="label" v-bind="form?.getError(name)">
    <o-select
      :disabled="disabled"
      :model-value="modelValue"
      :name="name"
      :placeholder="placeholder"
      root-class="w-full"
      select-class="w-full"
      @update:model-value="updateValue($event)">
      <slot>
        <template v-if="items">
          <option v-for="item in items" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </template>
      </slot>
    </o-select>
  </o-field>
</template>
