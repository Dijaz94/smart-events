<template>
    <div class="min-h-screen bg-linear-to-r from-start-transition-hero via-via-transition-hero to-end-transition-hero
    flex items-center justify-center">
        <div class="w-full max-w-md px-4">
            <!--Formulario Card-->
            <div class="bg-form-bg border-2 border-form-border rounded-2xl p-8 shadow-2xl">
                <div class="text-center mb-6">
                    <h1 class="text-2xl font-bold text-white mb-2">Iniciar Sesión</h1>
                    <p class="text-gray-400">Complete todos los campos</p>


                </div>
                <form class="flex flex-col gap-5">
                    <!--Email-->
                    <div>
                        <label class="block text-base font-semibold text-white mb-2">Email</label>
                        <input type="email" placeholder="Ej:juanperez@email.com"
                            class="w-full bg-black border border-input-border rounded-2xl px-6 py-2 text-white placeholder-light-text outline-none transition-colors" />
                    </div>
                    <!--Contraseña-->
                    <div>
                        <label class="block text-base font-semibold text-white mb-2">Contraseña</label>
                        <input type="password" placeholder="**********"
                            class="w-full bg-black border border-input-border rounded-2xl px-6 py-2 text-white placeholder-light-text outline-none transition-colors" />
                    </div>

                    <UButton type="submit"
                        class="w-full py-2 rounded-full text-lg font-semibold text-white mt-4 bg-action-button hover:bg-registrar-button justify-center text-center">
                        Iniciar Sesión</UButton>
                </form>

                <div class="text-center py-8">
                    <p class="text-gray-400">*Sólo miembros del Staff</p>
                </div>


            </div>
        </div>
    </div>
</template>