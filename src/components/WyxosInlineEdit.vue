<script setup>

import { ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number, null],
        required: true
    },
    update: {
        type: Function,
        required: true
    },
    processing: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue'])

const query = ref(props.modelValue)

const enableEdit = ref(false)

const onCancel = () => {
    enableEdit.value = false

    query.value = props.modelValue
}

const onUpdate = () => {
    return props.update(query.value)
        .then(() => {
            emits('update:modelValue', query.value)
            enableEdit.value = false
        })
}
</script>

<template>
    <div class="quick-edit">
        <slot v-if="!enableEdit" name="value">
            <span class="value">{{ modelValue }}</span>
        </slot>
        <slot v-if="enableEdit"  name="field" :query="query">
            <input v-if="enableEdit" v-model="query" :type="typeof modelValue === 'number' ? 'number' : 'text'" :readonly="processing">
        </slot>
        <slot name="actions" :enable-edit="enableEdit" :on-cancel="onCancel" :on-update="onUpdate">
            <button v-if="!enableEdit" class="edit" @click="enableEdit = true">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button v-if="enableEdit" class="cancel" :disabled="processing" @click="onCancel()">
                <i class="fas fa-times"></i>
            </button>
            <button v-if="enableEdit" class="save" :disabled="processing" @click="onUpdate()">
                <i v-if="!processing" class="fas fa-check"></i>
                <i v-if="processing" class="fas fa-spinner fa-spin"></i>
            </button>
        </slot>
    </div>
</template>
