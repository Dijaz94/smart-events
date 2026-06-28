<script setup lang="ts">
import type { Evento } from '~/types/eventos';

    const {data:eventosProximos, pending, error} = await useFetch<Evento[]>('/api/eventos/proximos')
console.log(eventosProximos.value)
</script>
<template>
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">

            <!-- Formulario lado izquierdo -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Registrarse a un Evento</h2>
                    <p class="text-light-text mb-6">Complete todos los campos</p>

                    <form class="flex flex-col gap-5">
                        <!-- Nombre -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Nombre</label>
                            <input type="text" placeholder="Ej: Juan"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Apellido -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Apellido</label>
                            <input type="text" placeholder="Ej: Perez"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Email</label>
                            <input type="email" placeholder="Ej: juanperez@email.com"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Selección de evento -->
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

                        <!-- Botón -->
                        <button type="submit"
                            class="bg-registrar-button hover:bg-action-button text-white font-semibold py-2 px-4 rounded-full transition-colors">
                            Registrarse
                        </button>
                    </form>
                </div>
            </aside>

            <!-- Sección de Próximos Eventos -->
            <section class="flex-1 w-full">
                <h2 class="text-2xl font-bold text-white mb-8">Próximos Eventos</h2>

                <!-- Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start items-stretch">

                    <!-- Cards -->
                    <CardEvento v-for="card in eventosProximos" :evento="card"/>

                </div>
            </section>
        </div>
    </div>
</template>