<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <a
        href="/games"
        class="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Games
      </a>
    </div>

    <h1 class="text-3xl font-bold mb-8">Game Details</h1>

    <div class="grid gap-6">
      <div
        v-for="player in game?.players"
        :key="player.id"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex justify-between items-start">
          <div>
            <h2 class="text-xl font-semibold mb-2">{{ player.name }}</h2>
            <p class="text-gray-600 mb-4">Role: {{ player.role }}</p>
          </div>
          <div class="flex flex-col items-end gap-2">
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              @click="copyToClipboard(`${origin}/player/${player.id}`)"
            >
              Copy Link
            </button>
            <a
              :href="`/player/${player.id}`"
              class="text-blue-600 hover:text-blue-800"
              target="_blank"
            >
              View Player Page
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Game, Player } from "../services/supabase";

const props = defineProps<{
  gameId: string;
}>();

const game = ref<Game | null>(null);
const origin = typeof window !== 'undefined' ? window.location.origin : '';

async function fetchGame() {
  try {
    const response = await fetch(`/api/games/${props.gameId}`);
    const data = await response.json();
    game.value = data.game;
  } catch (error) {
    console.error("Error fetching game:", error);
  }
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link copied to clipboard!");
  });
}

onMounted(() => {
  fetchGame();
});
</script>
