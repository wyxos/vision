<script>
    import {WyxosForm, FormBuilder, WyxosButton, WyxosInput} from '../../src/main.js'

    export default {
        components: {
            WyxosForm,
            WyxosInput,
            WyxosButton
        },
        setup(){
            return {
                errors: FormBuilder.create({
                    path: '',
                    errorBag: 'form'
                })
            }
        },
        methods: {
            submit(){
                class ValidationError extends Error {
                    constructor (message, data) {
                        super(message)

                        Object.assign(this, data)
                    }
                }

                this.errors.advancedSubmit(() => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new ValidationError('Validation error', {
                            response: {
                                status: 422,
                                data: {
                                    errors: {
                                        email: ['The email field is required.']
                                    }
                                }
                            }
                        }))
                    }, 1000)
                }))
            }
        }
    }
</script>

<template>
    <div class="container">
        <h1 class="title is-3">Demo App</h1>
        <wyxos-form :form="errors" @submit="submit()">
            <wyxos-input name="email" label="Email" :bag="errors.bag"></wyxos-input>

            <wyxos-button native-type="submit">Submit</wyxos-button>
        </wyxos-form>
    </div>
</template>
