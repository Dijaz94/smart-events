<script setup lang="ts">
import type { InscritoAlEvento } from '~/types/inscrito'


const email = ref('')
const resultados = ref<InscritoAlEvento[]>([])
const buscando = ref(false)
const error = ref('')
const busquedaRealizada = ref(false)

const formConsulta = reactive({
    email: ''
})

async function buscarEventos() {
    if (!formConsulta.email) {
        error.value = 'Ingresa un email'
        return
    }
    buscando.value = true
    error.value = ''
    busquedaRealizada.value = true

    try {
        resultados.value = await $fetch<InscritoAlEvento[]>(`/api/registros/${encodeURIComponent(formConsulta.email)}`)
        formConsulta.email = ''
    } catch (err: any) {
        error.value = getApiErrorMessage(err, "No se pudo realizar la busqueda.")
    } finally {
        buscando.value = false
    }
}


</script>

<template>
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">

        <!-- Consulta card -->
        <section class="flex justify-center">
            <div class="max-w-xl bg-form-bg border border-form-border rounded-2xl gap-5 p-8 shadow-2xl">
                <h2 class="text-2xl font-bold text-white mb-6">Consulta tus eventos registrados</h2>

                <UForm class="space-y-5" :state="formConsulta" @submit.prevent="buscarEventos">
                    <UFormField label="Email" name="email" class="w-full ">
                        <UInput v-model="formConsulta.email" type="email" placeholder="Ej: juanperez@email.com"
                            class="w-full" color="neutral" variant="outline" />
                    </UFormField>

                    <UButton type="submit"
                        class="py-2 px-4 bg-registrar-button text-background-card hover:bg-action-button transition-colors rounded-full w-full text-center"
                        :ui="{ base: 'justify-center' }" :loading="buscando">Consultar</UButton>
                </UForm>


            </div>
        </section>

        <!--Resultados-->
        <!--Esta seccion solo deveria ser visible despues de hacer la busqueda -->
        <section v-if="busquedaRealizada" class=" mt-20">
            <h3 class="text-2xl font-bold text-white mb-8">Resultados</h3>

            <div v-if="!buscando && resultados.length === 0" class="flex justify-center w-full mt-4">
                <UAlert color="warning" variant="solid"
                    description="No se encontraron eventos registrados para este email."
                    icon="i-heroicons-information-circle" class="mb-4" />
            </div>

            <div v-if="!buscando && resultados.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <CardEvento v-for="inscripcion in resultados" :key="inscripcion.id_inscrito"
                    :evento="inscripcion.evento" />
            </div>

            <div v-if="!buscando && error" class="flex justify-center w-full mt-4">
                <UAlert color="error" variant="solid" :description="error" icon="i-heroicons-exclamation-circle"
                    class="mb-4" />
            </div>
        </section>
    </div>
</template>