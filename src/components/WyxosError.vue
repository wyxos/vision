<script>
import {defineComponent} from 'vue'
import FormBuilder from "../utilities/FormBuilder";
import useFormErrors from "../utilities/useFormErrors.js";

export default defineComponent({
    name: "WyxosError",
    props: {
        form: {
            type: FormBuilder,
            default: null
        },
        name: {
            type: String,
            required: true
        }
    },
    setup(){
        return {
            errors: useFormErrors()
        }
    }
})
</script>

<template>
    <p v-if="form?.getError(name).message">{{ form.getError(name).message }}</p>
    <p v-else-if="errors.get(name)?.message">{{ errors.get(name).message }}</p>
</template>