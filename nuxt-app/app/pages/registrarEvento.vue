<script setup lang="ts">


</script>

<template>
    <div class="max-w-7xl mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">

            <!-- Formulario lado izquierdo -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Registrar un nuevo Evento</h2>
                    <p class="text-light-text mb-6">Complete todos los campos</p>

                    <form class="flex flex-col gap-5">
                        <!-- Nombre del evento -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Nombre del Evento</label>
                            <input type="text" placeholder="Ej: Concierto de Verano"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Fecha del evento -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Fecha del Evento</label>
                            <input type="date"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Lugar del evento -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Lugar del Evento</label>
                            <input type="text" placeholder="Ej: Viña del Mar"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Valor del evento -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Valor del Evento</label>
                            <input type="text" placeholder="Ej: 10000"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Cupos disponibles -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Cupos Disponibles</label>
                            <input type="text" placeholder="Ej: 100"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Imagen del evento -->
                        <div>
                            <label class="block font-semibold text-white mb-2">Imagen del Evento</label>
                            <input type="file" accept="image/*"
                                class="w-full bg-black border border-input-border rounded-xl px-6 py-2 text-white placeholder-light-text transition-colors" />
                        </div>

                        <!-- Botón -->
                        <button type="submit"
                            class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors">
                            Registrar
                        </button>
                    </form>
                </div>
            </aside>
            <!-- Sección de Próximos Eventos -->
            <section class="flex-1 w-full">
                <h2 class="text-2xl font-bold text-white mb-8">Eventos Registrados</h2>

                <!-- Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start">

                    <!-- Card Ballet -->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl w-full max-w-sm md:max-w-none">
                        <img src="" alt="Imagen de ballet" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Ballet</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 12 Dic 2026</p>
                            <p class="text-card-text font-semibold mb-1">Viña del Mar</p>
                            <p class="text-action-button font-bold mb-1">49.990 CLP</p>
                            <div class="flex items-center justify-between mt-4">
                                <p class="text-registrar-button font-semibold">Cupos: 23 Disponibles</p>
                                <button>🗑️</button> <!--El botón es un chiste pero se arregla con el UButton-->
                            </div>
                        </div>
                    </div>

                    <!-- Card Charla -->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl w-full max-w-sm md:max-w-none">
                        <img src="" alt="Imagen de charla" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Charla</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 12 Oct 2026</p>
                            <p class="text-card-text font-semibold mb-1">Villa Alemana</p>
                            <p class="text-action-button font-bold mb-1">12.500 CLP</p>
                            <div class="flex items-center justify-between mt-4">
                                <p class="text-registrar-button font-semibold">Cupos: 54 Disponibles</p>
                                <button>🗑️</button>
                            </div>
                        </div>
                    </div>

                    <!-- Card Exposición -->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl w-full max-w-sm md:max-w-none">
                        <img src="" alt="Imagen de exposición" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Exposición</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 15 Sept 2026</p>
                            <p class="text-card-text font-semibold mb-1">Valparíso</p>
                            <p class="text-action-button font-bold mb-1">5.500 CLP</p>
                            <div class="flex items-center justify-between mt-4">
                                <p class="text-registrar-button font-semibold">Cupos: 135 Disponibles</p>
                                <button>🗑️</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>