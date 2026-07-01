<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

withDefaults(defineProps<{
    title?: string
    description?: string
    itemName?: string        // nombre del elemento a eliminar (ej: nombre del usuario/evento)
    loading?: boolean        // estado de carga del botón eliminar
    error?: string | null    // mensaje de error si falla la eliminación
}>(), {
    title: '¿Eliminar elemento?',
    loading: false,
    error: null,
})

const emit = defineEmits<{
    (e: 'confirm'): void
    (e: 'cancel'): void
}>()

function handleCancel() {
    emit('cancel')
    open.value = false
}

function handleConfirm() {
    emit('confirm')
}
</script>

<template>
    <UModal v-model:open="open" :title="title" :description="description">
        <template #content>
            <div class="p-6">
                <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
                <p class="text-gray-600 mb-4">
                    Esta acción eliminará
                    <span v-if="itemName" class="font-semibold">{{ itemName }}</span>
                    permanentemente.
                </p>
                <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
                <div class="flex justify-end gap-3">
                    <UButton color="neutral" variant="outline" :disabled="loading" @click="handleCancel">
                        Cancelar
                    </UButton>
                    <UButton color="error" :loading="loading" @click="handleConfirm">
                        Eliminar
                    </UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>