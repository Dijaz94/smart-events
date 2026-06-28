<script setup lang="ts">

</script>

<template>
    <div class="max-w-7xl mx-auto px-6 py-16 bg-linear-to-r from-start-transition-bg to-end-transition-bg">

        <!-- Consulta card -->
        <section class="flex justify-center">
            <div class="w-full max-w-xl bg-form-bg border border-form-border rounded-2xl gap-5 p-8 shadow-2xl">
                <h2 class="text-2xl font-bold text-white mb-6">Consulta tus eventos registrados</h2>

                <label class=" block text-white font-semibold mb-4">Email</label>
                <input type="email" placeholder="Ej: juanperez@email.com"
                    class="w-full bg-black border border-input-border text-white placeholder-light-text rounded-lg px-4 py-3 mb-6 ">

                <button
                    class="w-full bg-registrar-button hover:bg-action-button text-white font-bold py-3 rounded-full transition-colors">
                    Consultar
                </button>
            </div>
        </section>

        <!--Resultados-->
        <!--Esta seccion solo deveria ser visible despues de hacer la busqueda -->
        <section class=" mt-20">
            <h3 class="text-2xl font-bold text-white mb-8">Resultados</h3>
        </section>
    </div>
</template>