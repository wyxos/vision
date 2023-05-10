<script>
export default {
  name: 'WyxosCollection',
  props: {
    modelValue: {
      required: true,
      type: Array
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.items = this.modelValue
  },
  methods: {
    add(payload) {
      this.items.push(payload)

      this.$emit('update:modelValue', this.items)
    },
    remove(index) {
      this.items.splice(index, 1)

      this.$emit('update:modelValue', this.items)
    }
  }
}
</script>

<template>
    <slot v-bind="{ add, remove, items }">
        <ul>
            <li></li>
        </ul>
    </slot>
</template>

