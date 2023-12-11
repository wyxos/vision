import {reactive} from 'vue'

const formErrors = reactive({
    default: []
})

export default function useFormErrors() {
    return {
        createBag(bag) {
            if (!formErrors[bag]) {
                formErrors[bag] = []
            }
        },
        set(error, bag = 'default') {
            const hasValidationErrors =
                error.response && error.response.data && error.response.data.errors

            if (!hasValidationErrors) {
                throw error
            }

            formErrors[bag] = Object.keys(error.response.data.errors).map((key) => {
                return {
                    key,
                    message: error.response.data.errors[key][0]
                }
            })
        },
        get(key, bag = 'default') {
            const target = formErrors[bag]

            if (!target) {
                return {
                    message: '',
                    variant: ''
                }
            }

            const match = target.find((error) =>
                Array.isArray(key) ? key.includes(error.key) : error.key === key
            )

            console.log('target', key, match)

            if (!match) {
                return {
                    message: '',
                    variant: ''
                }
            }

            return {
                message: match.message,
                variant: 'danger'
            }
        },
        clear(key = null, bag = 'default') {
            if (key) {
                const target = formErrors[bag]

                if (!target) {
                    console.warn(`Bag ${bag} is not defined.`)
                    return
                }

                const index = target.findIndex((error) => error.key === key)

                target.splice(index, 1)

                return
            }

            formErrors[bag] = []
        },
        all(bag = 'default') {
            return formErrors[bag]
        }
    }
}
