<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Game } from "../services/supabase";
import CleanupButton from "./CleanupButton.vue";
import { ChevronRightIcon } from "@heroicons/vue/24/outline";

const games = ref<Game[]>([]);
const isLoading = ref(true);

async function fetchGames() {
  isLoading.value = true;
  try {
    const response = await fetch("/api/games");
    const data = await response.json();
    games.value = data.games;
  } catch (error) {
    console.error("Error fetching games:", error);
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

onMounted(() => {
  setTimeout(() => {
    fetchGames();
  }, 500);
});
</script>

<template>
  <div v-if="isLoading">
    <div
      class="flex justify-center items-center bg-white rounded-lg shadow-md p-5"
    >
      <img
        src="/candy-bag.gif"
        alt="candy la mafia loading"
        class="w-12 h-12"
      />
    </div>
  </div>
  <div v-else>
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
            <div class="flex flex-col gap-2">
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
