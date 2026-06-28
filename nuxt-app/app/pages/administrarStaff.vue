<template>
    <div class="max-w-7xl mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">
            <section class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-1">Miembros del Staff</h2>
                <p class="text-light-text mb-8">Visualice y administre a los miembros del staff</p>

                <!-- Cards de miembros del staff -->
                <div class="flex flex-col gap-8">

                    <!-- Card Staff 1 -->
                    <div class="bg-background-card rounded-2xl p-8 shadow-lg">
                        <h3 class="text-2xl font-bold text-card-text mb-1">Staff Nombre 1</h3>
                        <p class="text-light-text mb-4">staffnombre1@gmail.com</p>
                        <hr class="border-light-text mb-4">
                        <div class="flex items-center justify-between">
                            <span class="text-light-text font-semibold">Administrar Cuenta</span>

                            <!-- es mejor con UButton ESTO ES MUY FEOOO Y LARGOOOOOOO-->

                            <button aria-label="Eliminar miembro del staff"
                                class="rounded-full bg-red-400/40 hover:bg-red-400/60 text-red-600 p-2.5 transition-colors">
                                <!-- Lucide icon: trash-2 -->
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

            <!-- Formulario para agregar staff -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Registrar Nuevo Miembro del Staff</h2>
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


                        <!-- Botón -->
                        <button type="submit"
                            class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors">
                            Registrar Miembro
                        </button>
                    </form>
                </div>
            </aside>
        </div>
    </div>
</template>