<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Game } from "../services/supabase";

const games = ref<Game[]>([]);

async function fetchGames() {
  try {
    const response = await fetch("/api/games");
    const data = await response.json();
    games.value = data.games;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

onMounted(() => {
  fetchGames();
});
</script>

<template>
  <div class="grid gap-4">
    <div v-for="game in games" :key="game.id">
      <a
        :href="`/games/${game.id}`"
        class="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold">{{ game.id }}</h2>
            <p class="text-gray-600">
              Created: {{ formatDate(game.created_at) }}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>
    </div>
  </div>
</template>
