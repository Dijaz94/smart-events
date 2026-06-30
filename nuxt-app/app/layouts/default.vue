<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Usuario } from '~/types/usuario'

const route = useRoute()
const isActive = (to: String) => route.path === to

const { user, clear } = useUserSession()

const datosUsuario = user.value as Usuario | null

const iniciales = computed(() =>
    `${datosUsuario?.nombre?.[0] ?? ''}${datosUsuario?.apellido?.[0] ?? ''}`.toUpperCase()
)

const navigationItems = computed(() => [
    { label: "Inicio", to: "/" },
    { label: "Registrarse", to: "/registrarse" },
    { label: "Eventos", to: "/eventos" },
    ...(user.value ? [{ label: "Registrar evento", to: "/registrarEvento" }, { label: "Administrar asistenes", to: "/administrarAsistente" }, { label: "Administrar Staff", to: "/administrarStaff" }] : [])

])


const userMenuItems = computed<DropdownMenuItem[][]>(() => [[
    { label: `Usuario: ${datosUsuario?.nombre} ${datosUsuario?.apellido}`, type: 'label', icon: 'i-lucide-user' },
    { label: `Email: ${datosUsuario?.email}`, type: 'label', icon: 'mdi:at' },
    { label: `Rol: ${datosUsuario?.rol}`, type: 'label', icon: 'eos-icons:cluster-role' }
], [
    {
        label: 'Cerrar sesión',
        icon: 'i-lucide-log-out',
        onSelect: cerrarSesion
    }
]])

async function cerrarSesion() {
    await clear()
    await navigateTo("/")
}
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
                        class=" py-1 px-2 text-sm font-medium" :class="isActive(item.to) ?
                            'border-y-action-button border-b-2 shadow-sm' :
                            ''">
                        {{ item.label }}

                    </NuxtLink>

                    <UButton v-if="!user" @click="navigateTo('/iniciarSesion')"
                        class="bg-action-button text-p-title rounded-2xl hover:bg-registrar-button">Iniciar sesión
                    </UButton>





                </div>
                <div v-if="user" class="flex gap-4 ">


                    <UDropdownMenu :items="userMenuItems" :content="{ align: 'end', sideOffset: 12 }"
                        :ui="{ content: 'min-w-48', item: 'cursor-pointer' }">
                        <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-registrar-button text-sm font-bold text-white transition-transform hover:scale-120"
                            role="button" tabindex="0" aria-label="Abrir menú de usuario">
                            {{ iniciales }}
                        </div>
                    </UDropdownMenu>
                    <UButton @click="cerrarSesion" class="bg-action-button text-p-title rounded-2xl">Cerrar sesión
                    </UButton>
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