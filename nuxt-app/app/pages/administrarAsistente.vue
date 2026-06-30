<script setup lang="ts">
import type { Evento } from '~/types/eventos'
import type { Inscrito } from '~/types/inscrito'

// --- Selector de eventos ---
const eventos = ref<Evento[]>([])
const eventoSeleccionado = ref<{ label: string; value: number } | undefined>(undefined)

const eventoOptions = computed(() =>
    eventos.value.map((e) => ({
        label: e.titulo,
        value: e.id,
    }))
)

async function cargarEventos() {
    eventos.value = await $fetch<Evento[]>('/api/eventos')
}

// --- Asistentes del evento seleccionado ---
const asistentes = ref<Inscrito[]>([])
const cargando = ref(false)
const error = ref('')
const busquedaRealizada = ref(false)

async function buscarAsistentes() {
    const eventoId = eventoSeleccionado.value?.value

    if (!eventoId) {
        error.value = 'Selecciona un evento'
        return
    }

    cargando.value = true
    error.value = ''
    busquedaRealizada.value = true

    try {
        asistentes.value = await $fetch<Inscrito[]>(`/api/eventos/${eventoId}/inscritos`)
    } catch (err: any) {
        error.value = getApiErrorMessage(err, 'No se pudieron cargar los asistentes.')
        asistentes.value = []
    } finally {
        cargando.value = false
    }
}

// --- Eliminar asistente ---
const itemAEliminar = ref<Inscrito | null>(null)
const mostrarConfirmacion = ref(false)
const eliminando = ref(false)
const errorEliminar = ref('')

function confirmarEliminarAsistente(asistente: Inscrito) {
    itemAEliminar.value = asistente
    errorEliminar.value = ''
    mostrarConfirmacion.value = true
}

async function eliminarConfirmado() {
    if (!itemAEliminar.value) return

    eliminando.value = true
    errorEliminar.value = ''

    try {
        await $fetch(`/api/inscritos/${itemAEliminar.value.id_inscrito}`, {
            method: 'DELETE'
        })
        asistentes.value = asistentes.value.filter(
            (a) => a.id_inscrito !== itemAEliminar.value?.id_inscrito
        )
        mostrarConfirmacion.value = false
    } catch (err: any) {
        errorEliminar.value = getApiErrorMessage(err, 'No se pudo eliminar al asistente.')
    } finally {
        eliminando.value = false
    }
}

await cargarEventos()


</script>



<template>
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">
            <!-- Formulario de búsqueda -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Busqueda por evento</h2>
                    <p class="text-light-text mb-6">Seleccione un evento para ver a los asistentes </p>



                    <UFormField label="Evento" name="evento" class="mb-6">
                        <USelectMenu v-model="eventoSeleccionado" placeholder="Seleccione un evento"
                            :items="eventoOptions" class="w-full" />
                    </UFormField>

                    <UButton block :loading="cargando"
                        class="bg-action-button hover:bg-registrar-button text-white font-bold py-3 rounded-full justify-center"
                        @click="buscarAsistentes">
                        Buscar
                    </UButton>




                    <!-- 
                    <form class="flex flex-col gap-5">
                       
                        <div>
                            <label class="block font-semibold text-white mb-2">Evento</label>
                            <select
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors">
                                <option value="" class="text-light-text">Seleccione un evento</option>
                                <option value="Ballet">Ballet</option>
                                <option value="Charla">Charla</option>
                                <option value="Exposicion">Exposición</option>
                            </select>
                        </div>

                        
                        <button type="submit"
                            class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors">
                            Buscar
                        </button>
                    </form>
                     -->
                </div>
            </aside>

            <section class="flex-1">
                <h2 class="text-2xl font-bold text-white ">Asistentes Registrados</h2>
                <p class="text-light-text mb-8">Visualice y administre los asistentes registrados</p>

                <!-- Cards de asistentes -->
                <div class=" flex flex-col gap-8">
                    <div v-if="cargando" class="text-white">Cargando asistentes...</div>

                    <div v-else-if="error" class="flex justify-center w-full">
                        <UAlert color="error" variant="solid" :description="error"
                            icon="i-heroicons-exclamation-triangle" />
                    </div>

                    <div v-else-if="busquedaRealizada && asistentes.length === 0" class="flex justify-center w-full">
                        <UAlert color="warning" variant="solid"
                            description="Este evento no tiene asistentes registrados."
                            icon="i-heroicons-information-circle" />
                    </div>

                    <div v-else-if="asistentes.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CardPersona v-for="a in asistentes" :key="a.id_inscrito" :nombre="a.nombre"
                            :apellido="a.apellido" :email="a.email" accion-label="Administrar Asistencia"
                            :accion-to="`/asistentes/${a.id_inscrito}`" @eliminar="confirmarEliminarAsistente(a)" />
                    </div>

                    <!-- Modal de confirmación -->
                    <UModal v-model:open="mostrarConfirmacion">
                        <template #content>
                            <div class="p-6">
                                <h3 class="text-lg font-bold mb-2">¿Eliminar asistente?</h3>
                                <p class="text-gray-600 mb-4">
                                    Esta acción eliminará a {{ itemAEliminar?.nombre }} {{ itemAEliminar?.apellido }}
                                    permanentemente.
                                </p>
                                <p v-if="errorEliminar" class="text-red-500 text-sm mb-4">{{ errorEliminar }}</p>

                                <div class="flex justify-end gap-3">
                                    <UButton color="neutral" variant="outline" :disabled="eliminando"
                                        @click="() => { mostrarConfirmacion = false }">
                                        Cancelar
                                    </UButton>
                                    <UButton color="error" :loading="eliminando" @click="eliminarConfirmado">
                                        Eliminar
                                    </UButton>
                                </div>
                            </div>
                        </template>
                    </UModal>





                    <!-- Card de asistente 1 -->
                    <!--
                    <div class="bg-background-card rounded-2xl p-8 shadow-lg">
                        <h3 class="text-2xl font-bold text-card-text mb-1">Asistente Nombre 1</h3>
                        <p class="text-light-text mb-4">asistentenombre1@gmail.com</p>
                        <hr class="border-light-text mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-light-text font-semibold">Administrar Asistencia</span>
                            
                            <button aria-label="Eliminar asistente"
                                class="rounded-full bg-red-400/40 hover:bg-red-400/60 text-red-600 p-2.5 transition-colors">
                               
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M3 6h18" />
                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    <line x1="10" x2="10" y1="11" y2="17" />
                                    <line x1="14" x2="14" y1="11" y2="17" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    -->


                </div>
            </section>

        </div>

    </div>
</template>