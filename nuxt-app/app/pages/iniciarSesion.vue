<script setup lang="ts">
import {z} from 'zod'

const schemaLogin = z.object({
    email: z.email({ message: 'Ingresa un correo válido' }),
    password: z.string().min(6, 'La contraseña debe tener 6 caracteres como mínimo')
})

const iniciandoSesion = ref(false)
const errorForm = ref('')
const formLogin = reactive({
    email: '',
    password: ''
})


const { fetch: fetchSession } = useUserSession()

async function iniciarSesion(){
    iniciandoSesion.value=true
    errorForm.value=''
 try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
                email: formLogin.email,
                password: formLogin.password
            }
        })
        await fetchSession()
        await navigateTo('/')
    }
    catch (err: any) {
        errorForm.value = getApiErrorMessage(err, 'No se pudo iniciar sesión')
    }
    finally {
        iniciandoSesion.value = false
    }
}



</script>

<template>
    <div class="min-h-screen w-full mx-auto bg-linear-to-r from-start-transition-hero via-via-transition-hero to-end-transition-hero
    flex items-center justify-center">
        <div class="w-full max-w-md px-4">
            <!--Formulario Card-->
            <div class="bg-form-bg border-2 border-form-border rounded-2xl p-8 shadow-2xl">

                <UForm @submit="iniciarSesion" :schema="schemaLogin" :state="formLogin" class="space-y-6">
                    
                    
                        <div class="text-center">
                            <h1 class="text-2xl font-bold text-white mb-2">Iniciar Sesión</h1>
                            <p class="text-gray-400">Complete todos los campos</p>
                        </div>

                        <UFormField label="Email" name="email">
                            <UInput   v-model="formLogin.email" placeholder="correo@ejemplo.cl" class="w-full rounded-2xl" color="neutral" variant="outline"></UInput>
                        </UFormField>
                        <UFormField label="Contraseña" name="password">
                            <UInput v-model="formLogin.password" type="password" placeholder="********" class="w-full rounded-2xl  " color="neutral" variant="outline"></UInput>
                        </UFormField>

                        <UButton type="submit" :loading="iniciandoSesion"
                        class="w-full py-2 rounded-full text-lg font-semibold text-white mt-4 bg-action-button hover:bg-registrar-button justify-center text-center">
                            Iniciar Sesión </UButton>
                

                </UForm>

                <div class="text-center py-8">
                    <p class="text-gray-400">*Sólo miembros del Staff</p>
                </div>


            </div>
            <ServerError v-if="errorForm != ''" titulo="Error al iniciar sesión" :mensaje=errorForm />

        </div>
    </div>
</template>