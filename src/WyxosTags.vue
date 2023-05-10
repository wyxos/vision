<script>
import Search from './Search.js'

export default {
  name: 'WyxosTags',
  props: {
    path: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      required: true
    },
    formatter: {
      type: Function,
      required: true
    },
    excludeFormatter: {
      type: Function,
      default: null
    },
    restoreFormatter: {
      type: Function,
      default: (payload) => payload
    },
    payloadFormatter: {
      type: Function,
      default: (payload) => payload
    }
  },
  emits: ['update:modelValue'],
  setup() {
    const search = Search.create()

    return {
      search
    }
  },
  data() {
    return {
      query: []
    }
  },
  async mounted() {
    if (this.modelValue && this.modelValue.length) {
      const { result } = await this.search.restore(
        this.path,
        this.restoreFormatter({
          values: this.modelValue
        })
      )

      this.query = result

      this.$emit(
        'update:modelValue',
        this.query.map((value) => this.formatter(value))
      )
    }
  },
  methods: {
    searchTags(value) {
      return this.search.customSearch(
          {
              url: this.path,
              payload: this.payloadFormatter({
                  value,
                  exclude: this.query.map((item) => this.excludeFormatter(item)).filter(Boolean)
              })
          }
      )
    },
    addedTag() {
      const reformat = this.query.map((value) => this.formatter(value))

      this.$emit('update:modelValue', reformat)
    },
    removedTag() {
      const reformat = this.query.map((value) => this.formatter(value))

      this.$emit('update:modelValue', reformat)
    },
    reset() {
      this.query = []

      this.$emit('update:modelValue', this.query)
    },
    addItem() {
      this.$refs.tagInput.addItem()
    }
  }
}
</script>
<template>
  <o-inputitems
      ref="tagInput"
    v-bind="$attrs"
    v-model="query"
    :data="search.result.value"
    :open-on-focus="true"
    autocomplete
    @add="addedTag($event)"
    @remove="removedTag($event)"
    @focus="searchTags()"
    @typing="searchTags($event)">
  </o-inputitems>
</template>
