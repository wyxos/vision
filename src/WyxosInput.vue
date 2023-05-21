<script>
import useFormErrors from './formErrors'

export default {
    name: 'WyxosInput',
    props: {
        label: {
            type: String,
            default: ''
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
        }
    },
    setup() {
        const errors = useFormErrors()

        return {
            errors
        }
    },
    computed: {
        fieldAttrs() {
            const attrs = this.$attrs

            const output = {}

            Object.keys(attrs).forEach((key) => {
                if (/^field-/.test(key)) {
                    output[key.replace(/^field-/, '')] = attrs[key]
                }
            })

            return output
        },
        inputAttrs() {
            const attrs = this.$attrs

            const output = {}

            Object.keys(attrs).forEach((key) => {
                if (!/^field-/.test(key)) {
                    output[key] = attrs[key]
                }
            })

            return output
        }
    }
}
</script>
<template>
    <o-field :label="label" v-bind="{...errors.get(name, bag), ...fieldAttrs}">
        <o-input v-bind="inputAttrs" @focus="errors.clear(name, bag)"></o-input>
    </o-field>
</template>
