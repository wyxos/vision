<script>
import Search from '../utilities/Search.js'

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
  emits: ['update:modelValue', 'update:query'],
  setup() {
    const search = Search.create()

    return {
      search
    }
  },
  data() {
    return {
      query: [],
      isInternalChange: false
    }
  },
  watch: {
    modelValue: {
      handler: async function (newVal, oldVal) {
        if (this.isInternalChange) {
          this.isInternalChange = false
        } else if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          this.restore()
        }
      },
      deep: true,
      immediate: false
    }
  },
  async mounted() {
    this.restore()
  },
  methods: {
    async restore() {
      if (this.modelValue && this.modelValue.length) {
        this.isInternalChange = true

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
        this.$emit('update:query', this.query)
      }
    },
    searchTags(value) {
      return this.search.customSearch({
        url: this.path,
        payload: this.payloadFormatter({
          value,
          exclude: this.query
            .map((item) => this.excludeFormatter(item))
            .filter(Boolean)
        })
      })
    },
    addedTag() {
      this.isInternalChange = true

      const reformat = this.query.map((value) => this.formatter(value))

      this.$emit('update:modelValue', reformat)

      this.$emit('update:query', this.query)
    },
    removedTag() {
      this.isInternalChange = true

      const reformat = this.query.map((value) => this.formatter(value))

      this.$emit('update:modelValue', reformat)

      this.$emit('update:query', this.query)
    },
    reset() {
      this.isInternalChange = true

      this.query = []

      this.$emit('update:modelValue', this.query)

      this.$emit('update:query', this.query)
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
    v-model="query"
    :data="search.result.value"
    allow-autocomplete
    v-bind="$attrs"
    @add="addedTag($event)"
    @remove="removedTag($event)"
    @typing="searchTags($event)">
  </o-inputitems>
</template>
