<script setup lang="ts">
import { z } from 'zod'
import type { Usuario } from '~/types/usuario'
const { data: usuarios, pending, error, refresh } = await useFetch<Usuario[]>('/api/usuario')


const guardando = ref(false)
const errorForm = ref('')

const schema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    apellido: z.string().min(1, 'El apellido es obligatorio'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const formNuevoStaff = reactive({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
})

function vaciarForm() {
    formNuevoStaff.nombre = ''
    formNuevoStaff.apellido = ''
    formNuevoStaff.email = ''
    formNuevoStaff.password = ''
    errorForm.value = ''
}


async function registrarMiembro() {
    guardando.value = true
    errorForm.value = ''

    try {
        await $fetch('/api/usuario', {
            method: 'POST',
            body: {
                nombre: formNuevoStaff.nombre,
                apellido: formNuevoStaff.apellido,
                email: formNuevoStaff.email,
                password: formNuevoStaff.password,
                rol: 'staff',
            },

        })
        vaciarForm()
        await refresh()
        useToast().add({
            title: 'Miembro registrado',
            description: `Se registró a ${formNuevoStaff.nombre} correctamente.`,
            duration: 2000,
        })
    } catch (err: any) {
        errorForm.value = getApiErrorMessage(err, 'No se pudo registrar el miembro.')
        useToast().add({
            title: 'Error al registrar',
            description: errorForm.value,
            duration: 2000,
        })
    } finally {
        guardando.value = false
    }
}

// Borrar miembro del staff

const staffBorrar = ref<Usuario | null>(null)
const mostrarConfirmacion = ref(false)
const eliminando = ref(false)
const errorEliminar = ref('')

function confirmarEliminarMiembro(usuario: Usuario) {
    staffBorrar.value = usuario
    errorEliminar.value = ''
    mostrarConfirmacion.value = true
}

function cancelarEliminar() {
    mostrarConfirmacion.value = false
}

async function eliminarConfirmado() {
    if (!staffBorrar.value) return

    eliminando.value = true
    errorEliminar.value = ''

    try {
        await $fetch(`/api/usuario/${encodeURIComponent(staffBorrar.value.email)}`, {
            method: 'DELETE',
        })
        await refresh()
        mostrarConfirmacion.value = false
        useToast().add({
            title: 'Miembro eliminado',
            description: `Se eliminó a ${staffBorrar.value.nombre} correctamente.`,
            duration: 2000,
        })
    } catch (err: any) {
        errorEliminar.value = getApiErrorMessage(err, 'No se pudo eliminar el miembro.')
    } finally {
        eliminando.value = false
    }
}

</script>


<template>
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">
            <section class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-1">Miembros del Staff</h2>
                <p class="text-light-text mb-8">Visualice y administre a los miembros del staff</p>

                <div class="flex flex-col gap-4">
                    <CardPersona v-for="usuario in usuarios" :key="usuario.email" :nombre="usuario.nombre"
                        :apellido="usuario.apellido" :email="usuario.email" accion-label="Administrar Cuenta"
                        :accion-to="`/usuario/${encodeURIComponent(usuario.email)}`"
                        @eliminar="confirmarEliminarMiembro(usuario)" />
                </div>



            </section>

            <!-- Formulario para agregar staff -->
            <aside class="w-full md:w-96 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Registrar Nuevo Miembro del Staff</h2>
                    <p class="text-light-text mb-6">Complete todos los campos</p>

                    <UForm :state="formNuevoStaff" :schema="schema" class="flex flex-col gap-5"
                        @submit.prevent="registrarMiembro">
                        <UFormField label="Nombre" name="nombre">
                            <UInput v-model="formNuevoStaff.nombre" placeholder="Ej: Juan" class="w-full"
                                color="neutral" variant="outline" />
                        </UFormField>
                        <UFormField label="Apellido" name="apellido">
                            <UInput v-model="formNuevoStaff.apellido" placeholder="Ej: Perez" class="w-full"
                                color="neutral" variant="outline" />
                        </UFormField>
                        <UFormField label="Email" name="email">
                            <UInput v-model="formNuevoStaff.email" type="email" placeholder="Ej: juanperez@email.com"
                                class="w-full" color="neutral" variant="outline" />
                        </UFormField>
                        <UFormField label="Contraseña" name="password">
                            <UInput v-model="formNuevoStaff.password" type="password" placeholder="Mínimo 6 caracteres"
                                class="w-full" color="neutral" variant="outline" />
                        </UFormField>

                        <p v-if="errorForm" class="text-red-400 text-sm">{{ errorForm }}</p>

                        <UButton type="submit"
                            class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors w-full "
                            :loading="guardando" :ui="{ base: 'justify-center' }">
                            Registrar Miembro
                        </UButton>
                    </UForm>
                </div>
            </aside>
        </div>
    </div>

    <UModal v-model:open="mostrarConfirmacion">
        <template #content>
            <div class="p-6">
                <h3 class="text-lg font-bold mb-2">¿Eliminar miembro?</h3>
                <p class="text-gray-600 mb-4">
                    Esta acción eliminará a
                    <span class="font-semibold">{{ staffBorrar?.nombre }} {{ staffBorrar?.apellido }}</span>

                </p>
                <p v-if="errorEliminar" class="text-red-500 text-sm mb-4">{{ errorEliminar }}</p>
                <div class="flex justify-end gap-3">
                    <UButton color="neutral" variant="outline" :disabled="eliminando" @click="cancelarEliminar">
                        Cancelar
                    </UButton>
                    <UButton color="error" :loading="eliminando" @click="eliminarConfirmado">
                        Eliminar
                    </UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>