<script setup lang="ts">
import type { Evento } from '~/types/eventos';
import {z} from 'zod'

const { data: eventos, pending, error, refresh } = await useFetch<Evento[]>('/api/eventos')


const schema = z.object({
    nombre: z.string().min(1, "Ingrese su nombre"),
    apellido: z.string().min(1, "Ingrese su apellido"),
    email: z.string().min(1, "Ingrese su email"),
        
    evento: z.object({
    label: z.string(),
    value: z.number()})
}) 

const guardandoRegistro = ref(false)
const errorForm = ref('')


const formRegistro = reactive({
    nombre: '',
    apellido: '',
    email: '',
    evento: undefined as { label: string; value: number } | undefined
})


function vaciarForm() {
    formRegistro.nombre = ''
    formRegistro.apellido = ''
    formRegistro.email = ''
    formRegistro.evento = undefined
    errorForm.value = ''
}

async function guardarRegistro() {
    guardandoRegistro.value = true
    errorForm.value = ''
    

    const evento = formRegistro.evento?.label
    try {
        await $fetch('/api/registros', {
            method: 'POST',
            body: {
                nombre: formRegistro.nombre,
                apellido: formRegistro.apellido,
                email: formRegistro.email,
                evento: formRegistro.evento?.value
            }
        })

        vaciarForm()
        await refresh()
        useToast().add({
            title: "Inscripción exitosa",
            duration: 2000,
            description: `Se ha inscrito exitosamente en '${evento}'`
        })
    }
    catch (err: any) {
        errorForm.value = getApiErrorMessage(err, "No se pudo guardar el regristro.")
        useToast().add({
            title: "Error",
            description: errorForm.value,
            duration: 2000
        })

    }
    finally {
        guardandoRegistro.value = false
    }

}

const eventoOptions = computed(() =>
    eventos.value?.map(evento => ({
        label: evento.titulo,
        value: evento.id
    })) ?? []
)



</script>
<template>
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div class="flex flex-col md:flex-row gap-10 items-start">

            <!-- Formulario lado izquierdo -->
            <aside class="w-full sm:w-80 shrink-0">


                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <div class="text-center">
                        <h2 class="font-semibold text-2xl mb-1">Registrarse a un Evento</h2>
                        <p class="text-light-text mb-6">Complete todos los campos</p>
                    </div>

                    <UForm :schema="schema" class="space-y-4"  :state="formRegistro" @submit="guardarRegistro">
                        <UFormField label="Nombre" name="nombre">
                            <UInput class="w-full" color="neutral" variant="outline" v-model="formRegistro.nombre">
                            </UInput>
                        </UFormField>

                        <UFormField label="Apellido" name="apellido" class="w-full">
                            <UInput class="w-full" color="neutral" variant="outline" v-model="formRegistro.apellido">
                            </UInput>
                        </UFormField>

                        <UFormField label="Email" name="email" class="w-full">
                            <UInput class="w-full" color="neutral" variant="outline" v-model="formRegistro.email">
                            </UInput>
                        </UFormField>

                        <UFormField label="Evento" name="evento">
                            <USelectMenu placeholder="Seleccione evento" v-model="formRegistro.evento"
                                :items="eventoOptions" class="w-full" />

                        </UFormField>
                        <div class="flex justify-center  text-center">
                            <UButton
                                class="py-2 px-4 bg-registrar-button text-background-card hover:bg-action-button transition-colors rounded-full w-full text-center"
                                :ui="{ base: 'justify-center' }" type="submit" :loading="guardandoRegistro">
                                Registrarse
                            </UButton>
                        </div>

                    </UForm>
                </div>


            </aside>

            <!-- Sección de Próximos Eventos -->
            <section class="flex-1 w-full">
                <h2 class="text-2xl font-bold text-white mb-8">Próximos Eventos</h2>

                <!-- Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start items-stretch">

                    <!-- Cards -->
                    <CardEvento v-for="card in eventos" :evento="card" />

                </div>
            </section>
        </div>
    </div>
</template>