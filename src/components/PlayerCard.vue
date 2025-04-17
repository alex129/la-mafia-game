<script setup lang="ts">
import type { Player } from "../services/supabase";

const props = defineProps<{
  player: Player;
  origin: string;
}>();

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert("¡Enlace copiado al portapapeles!");
  });
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div
      class="flex flex-col md:flex-row gap-4 justify-center md:justify-between items-center"
    >
      <div>
        <h2 class="text-xl font-semibold mb-2">{{ player.name }}</h2>
      </div>
      <div class="flex flex-col items-center md:items-end gap-2">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          @click="copyToClipboard(`${origin}/player/${player.id}`)"
        >
          Copiar Enlace
        </button>
        <a
          :href="`/player/${player.id}`"
          class="text-blue-600 hover:text-blue-800 text-center md:text-left"
          target="_blank"
        >
          Ver Página del Jugador
        </a>
      </div>
    </div>
  </div>
</template>
