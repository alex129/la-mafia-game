<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Game } from "../services/supabase";
import CleanupButton from "./CleanupButton.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

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
  <div>
    <div class="flex justify-end mb-4">
      <CleanupButton v-if="games.length > 0" @cleanup-complete="fetchGames" />
    </div>
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
            <ChevronRightIcon class="h-6 w-6 text-gray-400" />
          </div>
        </a>
      </div>
      <div
        v-if="games.length === 0"
        class="flex justify-center items-center bg-white rounded-lg shadow-md p-5"
      >
        <p class="text-gray-600">No games found</p>
      </div>
    </div>
  </div>
</template>
