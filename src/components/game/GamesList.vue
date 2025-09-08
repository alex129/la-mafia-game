<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { GameContract } from "@domain/game/contracts/GameContract";
import CleanupButton from "@/components/ui/CleanupButton.vue";
import { ChevronRightIcon, PlusIcon } from "@heroicons/vue/24/outline";

const games = ref<GameContract[]>([]);
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
    <div
      class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4"
    >
      <a
        href="/"
        class="w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusIcon class="h-5 w-5 mr-2" />
        New Game
      </a>
      <CleanupButton v-if="games.length > 0" @cleanup-complete="fetchGames" />
    </div>
    <div class="grid gap-4">
      <div v-for="game in games" :key="game.id">
        <a
          :href="`/games/${game.id}`"
          class="block p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-center">
            <div class="flex flex-col gap-1 sm:gap-2">
              <h2 class="text-lg sm:text-xl font-semibold break-all">
                {{ game.id }}
              </h2>
              <p class="text-sm sm:text-base text-gray-600">
                Created: {{ formatDate(game.created_at) }} at
                {{ new Date(game.created_at).toLocaleTimeString() }}
              </p>
            </div>
            <ChevronRightIcon
              class="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 flex-shrink-0"
            />
          </div>
        </a>
      </div>
      <div
        v-if="games.length === 0"
        class="flex justify-center items-center bg-white rounded-lg shadow-md p-4 sm:p-5"
      >
        <p class="text-gray-600">No games found</p>
      </div>
    </div>
  </div>
</template>
