<script setup lang="ts">
const route = useRoute()
const isActive = (to: String) => route.path === to

const navigationItems = [
    { label: "Inicio", to: "/" },
    { label: "Registrarse", to: "/registrarse" },
    { label: "Eventos", to: "/eventos" },

]
</script>


<template>
    <!-- body -->
    <div class="min-h-screen bg-linear-to-br from-color-start-transition-bg to-color-end-transition-bg flex flex-col">
        <!-- header -->
        <header class="backdrop-blur">
            <div class="p-4 flex justify-between">
                <NuxtLink to="/">
                    <!-- Titulo -->
                    <div>
                        <p class="font-bold tracking-wide text-2xl">
                            <span class=" text-navbar-accent">S</span class="text-p-title">mart <span
                                class="text-navbar-accent">E</span>vents
                        </p>
                    </div>

                </NuxtLink>
                <!-- Páginas -->
                <div class="flex gap-3">
                    <NuxtLink v-for="item in navigationItems" :key="item.to" :to="item.to"
                        class=" py-1 px-2 text-sm font-medium " :class="isActive(item.to) ?
                            'border-y-action-button border-b-2 shadow-sm' :
                            ''">
                        {{ item.label }}

                    </NuxtLink>
                    <UButton class="bg-action-button text-p-title rounded-2xl">Iniciar sesión</UButton>
                </div>

            </div>


        </header>

        <main class="flex flex-1">
            <slot />
        </main>
        
        <!-- footer -->
        <footer class=" bg-background-footer py-8 ">
            <div class="flex flex-col items-center">
                <p class="font-bold tracking-wide text-2xl"><span class=" text-navbar-accent">S</span
                        class="text-p-title">mart <span class="text-navbar-accent">E</span>vents</p>
                <p class="text-footer-light-text">&reg 2026 Smart Events. Todos los derechos reservados</p>
            </div>
        </footer>
    </div>

</template>