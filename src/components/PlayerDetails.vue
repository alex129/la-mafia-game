<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold mb-8">{{ player?.name }}'s Role</h1>

      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold mb-2">Your Role</h2>
          <p class="text-gray-700">{{ player?.role }}</p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Your Action</h2>
          <p class="text-gray-700">{{ player?.action }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Player } from "../services/supabase";

const props = defineProps<{
  playerId: string;
}>();

const player = ref<Player | null>(null);

async function fetchPlayer() {
  try {
    const response = await fetch(`/api/players/${props.playerId}`);
    const data = await response.json();
    player.value = data.player;
  } catch (error) {
    console.error("Error fetching player:", error);
  }
}

onMounted(() => {
  fetchPlayer();
});
</script>
