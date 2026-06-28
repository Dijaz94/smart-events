<template>
    <div class="max-w-7xl mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">
            <!-- Formulario de búsqueda -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Busqueda por evento</h2>
                    <p class="text-light-text mb-6">Seleccione un evento para ver a los asistentes </p>
                    <form class="flex flex-col gap-5">
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
                            class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors">
                            Buscar
                        </button>
                    </form>
                </div>
            </aside>

            <section class="flex-1">
                <h2 class="text-2xl font-bold text-white ">Asistentes Registrados</h2>
                <p class="text-light-text mb-8">Visualice y administre los asistentes registrados</p>

                <!-- Cards de asistentes -->
                <div class=" flex flex-col gap-8">
                    <!-- Card de asistente 1 -->
                    <div class="bg-background-card rounded-2xl p-8 shadow-lg">
                        <h3 class="text-2xl font-bold text-card-text mb-1">Asistente Nombre 1</h3>
                        <p class="text-light-text mb-4">asistentenombre1@gmail.com</p>
                        <hr class="border-light-text mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-light-text font-semibold">Administrar Asistencia</span>
                            <!-- es mejor con UButton-->
                            <button aria-label="Eliminar asistente"
                                class="rounded-full bg-red-400/40 hover:bg-red-400/60 text-red-600 p-2.5 transition-colors">
                                <!-- Lucide icon: trash-2 -->
                                <!--ESTA CUESTION LARGA IGNORA, SERÁ MEJOR CON LAS COSITAS DE NUXT, ES SIMPLEMENTE UN ICONO AAAAAAHHHH-->
                                <!--Entré en locura-->
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
                </div>
            </section>

        </div>

    </div>
</template>