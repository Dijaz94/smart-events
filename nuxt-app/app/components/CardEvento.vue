<script setup lang="ts">
import type { Evento } from '~/types/eventos';

    const props =defineProps<{
        evento: Evento
    }>()

    const fechaFormateada = computed(()=>formatFechaCorta(props.evento.fecha))
    const horaFormateada  =computed(()=>formatHora(props.evento.fecha))
    
    
</script>

<template>
              <div class="bg-background-card p-6 shadow-lg rounded-2xl h-full w-full">
                        <img :src="evento.imagen" :alt="`Imagen de ${evento.titulo}`" class="w-full h-56 object-cover object-top mb-4 rounded-lg">
                        <div>
                            <h4 class="text-xl font-bold text-gray-900 mb-3">{{evento.titulo}}</h4>
                            <p class="text-card-text font-semibold mb-1">Fecha: {{ fechaFormateada }}</p>
                            <p class="text-card-text font-semibold mb-1">Hora: {{ horaFormateada }}</p>
                            <p class="text-card-text font-semibold mb-1">{{evento.lugar}}</p>

                            <p v-if="evento.inscrito == 1" class="text-card-text font-semibold mb-1">{{ evento.inscrito }} persona inscrita</p>
                            <p v-if="evento.inscrito != 1" class="text-card-text font-semibold mb-1">{{ evento.inscrito }} personas inscritas</p>

                            <p class="text-action-button font-bold mb-1">{{ evento.valor }} CLP</p>
                            
                        </div>
                    </div>
                    
</template>