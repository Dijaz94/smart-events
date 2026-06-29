<script setup lang="ts">
import type { Evento } from '~/types/eventos';

const {data:eventosProximos, pending, error} = await useFetch<Evento[]>('/api/eventos/proximos')
</script>


<template>
    <div class="w-full mx-auto min-h-screen bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <!--HERO-->
        <section
            class="  relative bg-linear-to-r from-start-transition-hero via-via-transition-hero to-end-transition-hero pt-24 pb-20">
            <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center ">
                <!--Texto-->
                <div class="space-y-6 text-center md:text-left">
                    <h1 class="text-5xl md:text-6xl font-bold leading-tight">Conoce los mejores eventos pensados para ti
                    </h1>
                    <p class="text-lg md:text-xl text-gray-200 max-w-lg"> Navega y regístrate en cualquiera de los
                        eventos que tenemos para la comunidad</p>
                        <NuxtLink to="/registrarse">
                            <UButton type="button"
                            class="px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 bg-registrar-button hover:bg-action-button transition-colors text-white">
                            Registrarse a
                            un evento</UButton>

                        </NuxtLink>
                    
                </div>

                <!--Imagen-->
                <div class="relative">
                    <img src="" alt="">
                </div>

            </div>
        </section>

        <!--PROXIMOS EVENTOS-->
        <section class="py-16 ">
            <div class="max-w-7xl mx-auto px-6">

                <h2 class="text-3xl font-bold mb-10 text-center md:text-left">Próximos Eventos</h2>

                <!--Cards-->
                <div class="grid md:grid-cols-3 gap-8 px-24 items-stretch">
                    <CardEvento v-for="card in eventosProximos" :evento="card"/>
                    


                </div>
            </div>


        </section>


    </div>
</template>