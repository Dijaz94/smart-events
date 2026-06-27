<template>
    <div class=" min-h-screen bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <!--HERO-->
        <section
            class=" relative bg-linear-to-r from-start-transition-hero via-via-transition-hero to-end-transition-hero pt-24 pb-20">
            <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <!--Texto-->
                <div class="space-y-6">
                    <h1 class="text-5xl md:text-6xl font-bold leading-tight">Conoce los mejores eventos pensados para ti
                    </h1>
                    <p class="text-lg md:text-xl text-gray-200 max-w-lg"> Navega y regístrate en cualquiera de los
                        eventos que tenemos para la comunidad</p>
                    <UButton
                        class="px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 bg-registrar-button hover:bg-action-button transition-colors text-white">
                        Registrarse a
                        un evento</UButton>
                </div>

                <!--Imagen-->
                <div class="relative">
                    <img src="" alt="">
                </div>

            </div>
        </section>

        <!--PROXIMOS EVENTOS-->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-6">

                <h2 class="text-3xl font-bold mb-10 text-center md:text-left">Próximos Eventos</h2>

                <!--Cards-->
                <div class="grid md:grid-cols-3 gap-8 px-24">
                    <!--Card Ballet-->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl">
                        <img src="" alt="Imagen de ballet" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Ballet</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 12 Dic 2026</p>
                            <p class="text-card-text font-semibold mb-1">Viña del Mar</p>
                            <p class="text-action-button font-bold mb-1">49.990 CLP</p>
                            <p class="text-registrar-button font-semibold">Cupos: 23 Disponibles</p>

                        </div>
                    </div>
                    <!--Card Charla-->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl">
                        <img src="" alt="Imagen de charla" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Charla</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 12 Oct 2026</p>
                            <p class="text-card-text font-semibold mb-1">Villa Alemana</p>
                            <p class="text-action-button font-bold mb-1">12.500 CLP</p>
                            <p class="text-registrar-button font-semibold">Cupos: 54 Disponibles</p>

                        </div>
                    </div>
                    <!--Card Exposición-->
                    <div class="bg-background-card p-6 shadow-lg rounded-2xl">
                        <img src="" alt="Imagen de exposición" class="w-full h-56 object-cover mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">Exposición</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: 15 Sept 2026</p>
                            <p class="text-card-text font-semibold mb-1">Valparíso</p>
                            <p class="text-action-button font-bold mb-1">5.500 CLP</p>
                            <p class="text-registrar-button font-semibold">Cupos: 135 Disponibles</p>

                        </div>
                    </div>


                </div>
            </div>


        </section>


    </div>
</template>