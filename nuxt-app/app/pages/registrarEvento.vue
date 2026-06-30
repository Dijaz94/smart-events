<script setup lang="ts">
import type { Evento } from '~/types/eventos';
import {z} from 'zod'


const maxFIleSIze = 5*1024*1024
const filesAccepted = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const schema = z.object({
    titulo: z.string().min(1, "El título es obligatorio"),
    fecha: z.string().min(1, "La fecha es obligatoria"),
    hora: z.string().min(1, "La hora es obligatoria"),
    valor: z.number().min(1, "El Valor es obligatorio"),
    lugar: z.string().min(1, "El Lugar es obligatorio"),
      imagen: z
    .instanceof(File)
    .refine((file) => file.size <= maxFIleSIze, {
      message: 'La imagen no debe superar 5MB',
    })
    .refine((file) => filesAccepted.includes(file.type), {
      message: 'Formato no soportado',
    })
    .nullable()
    .optional(),
})



    const {data:eventos, pending, error, refresh} = await useFetch<Evento[]>('/api/eventos')

    const guardandoEvento = ref(false)
    const errorForm = ref('')
    const imagen = ref(null)
    const formEvento = reactive({
        titulo: '',
        fecha: '',
        hora: '',
        lugar:'',
        valor: undefined as number | undefined,
        imagen: null as File | null
    })

    function vaciarForm() {
        formEvento.titulo = ''
        formEvento.fecha = ''
        formEvento.hora = ''
        formEvento.valor = undefined
        formEvento.lugar=''
        formEvento.imagen= null
        errorForm.value = ''
    }

    async function guardarEvento() {
        guardandoEvento.value = true
        errorForm.value = ''
        const tituloEvento = formEvento.titulo
        try {
            //procesamos la imagen y nos devuelve su url
            let imagenUrl = ''

            if (formEvento.imagen) {
                const formData = new FormData() //creamos objeto que almacenara los datos de la imagen
                formData.append('imagen', formEvento.imagen) //le damos el nombre imagen y le entregamos el archivo

            const uploadResult = await $fetch<{ id: string; url: string }>('/api/upload', { //llamada al endpoint que nos retornara la url del archivo
                method: 'POST',
                body: formData,
            })
            imagenUrl = uploadResult.url //devuelve .id y .url, necesitamos solo url
            }
            else{
                imagenUrl = 'upload/eventos/default.png'//si no se ingresó imagen
            }



            // procesamos datos en json
            await $fetch('/api/eventos', {
                method: 'POST',
                body: {
                    titulo: formEvento.titulo,
                    fecha: formEvento.fecha,
                    hora: formEvento.hora,
                    lugar: formEvento.lugar,
                    valor:formEvento.valor,
                    imagen: imagenUrl
                }
            })

            vaciarForm()
            await refresh()
            useToast().add({
                title: "Proceso exitoso",
                duration: 2000,
                description: `Se ha creado exitosamente el evento '${tituloEvento}'`
            })
            refresh()
        }
    catch (err: any) {
        errorForm.value = getApiErrorMessage(err, "No se pudo guardar el regristro.")
        useToast().add({
            title: "Error al crear evento",
            description: errorForm.value,
            duration: 2000
        })

    }
    finally {
        guardandoEvento.value = false
    }

}

</script>

<template>

    
    <div class="w-full mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">
        <div max-w-7xl class="flex flex-col md:flex-row gap-10 items-start">

            <!-- Formulario lado izquierdo -->
            <aside class="w-full sm:w-80 shrink-0">
                <div class="bg-form-bg border border-form-border rounded-2xl p-6 sticky top-24">
                    <h2 class="font-semibold text-2xl mb-1">Registrar un nuevo Evento</h2>
                    <p class="text-light-text mb-6">Complete todos los campos</p>
                    <UForm :state="formEvento" class="flex flex-col gap-5" :schema="schema" @submit.prevent="guardarEvento" @error="(e) => console.log('Errores de validación:', [...e.errors])">
                        <UFormField label="Nombre del evento" name="nombre">
                            <UInput v-model="formEvento.titulo"  class="w-full" color="neutral" variant="outline"/>
                        </UFormField>
                        <UFormField label="Fecha del evento" name="fecha">
                            <UInput v-model="formEvento.fecha" type="date" class="w-full"  color="neutral" variant="outline"/>
                        </UFormField>
                        <UFormField label="Hora del evento" name="hora">
                            <UInput v-model="formEvento.hora" type="time" class="w-full" color="neutral" variant="outline"/>
                        </UFormField>
                        <UFormField label="Lugar del evento" name="lugar">
                            <UInput v-model="formEvento.lugar" class="w-full" color="neutral" variant="outline"/>
                        </UFormField>
                        <UFormField label="Valor del evento" name="valor">
                            <UInput v-model="formEvento.valor" type="number" class="w-full" color="neutral" variant="outline"/>
                        </UFormField>
                        <UFormField label="Imagen del evento" name="imagen">
                            <UFileUpload  v-model="formEvento.imagen" icon="i-lucide-image" accept="image/*" label="Ingresa la imagen del evento" description="SVG, PNG o JPG (Máximo 5MB)"/>
                        </UFormField>

                        <UButton type="submit" class="bg-action-button hover:bg-registrar-button text-white font-semibold py-2 px-4 rounded-full transition-colors" :loading="guardandoEvento">
                            Registrar evento
                        </UButton>
                    </UForm>

                    
                </div>
            </aside>
            <!-- Sección de Próximos Eventos -->
            <section class="flex-1 w-full">
                <h2 class="text-2xl font-bold text-white mb-8">Eventos Registrados</h2>

                <!-- Cards -->
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center md:place-items-start">

                    <CardEvento v-for="card in eventos" :evento="card"/>


                </div>
            </section>
        </div>
    </div>
</template>