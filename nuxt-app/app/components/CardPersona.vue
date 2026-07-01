<script setup lang="ts">
const props = defineProps<{
    nombre: string
    apellido: string
    email: string
    accionLabel: string
    accionTo: string
}>()

const emit = defineEmits<{
    eliminar: []
}>()
</script>

<template>
    <div class="bg-background-card p-6 shadow-lg rounded-2xl">
        <h4 class="text-xl font-bold text-card-text mb-1">{{ nombre }} {{ apellido }}</h4>
        <p class="text-light-text mb-4">{{ email }}</p>

        <hr class="border-gray-200 mb-4">

        <div class="flex justify-between items-center">
            <p class="text-gray-700">{{ accionLabel }}</p>


            <button class="bg-red-100 hover:bg-red-200 text-red-500 rounded-full p-2 transition-colors"
                @click="emit('eliminar')">
                <Icon name="i-heroicons-trash" class="w-5 h-5" />
            </button>
        </div>
    </div>
</template>