<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Player } from "@services/supabase";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { GameService } from "@services/game";
import { config } from "@/config";

const props = defineProps<{
  playerId: string;
}>();

const player = ref<Player | null>(null);
const isRegenerating = ref(false);
const error = ref<string | null>(null);
const regenerateActionTimes = computed(
  () => player.value?.regenerate_action_times ?? 0
);
const regenerateActionTimesRemaining = computed(
  () => config.MAX_REGENERATE_ACTION_TIMES - regenerateActionTimes.value
);

async function fetchPlayer() {
  try {
    const response = await fetch(`/api/players/${props.playerId}`);
    const data = await response.json();
    player.value = data.player;
  } catch (error) {
    console.error("Error fetching player:", error);
  }
}

async function regenerateAction() {
  if (
    regenerateActionTimes.value >= config.MAX_REGENERATE_ACTION_TIMES ||
    isRegenerating.value
  )
    return;

  try {
    isRegenerating.value = true;
    error.value = null;
    const newAction = await GameService.generateAction();
    const response = await fetch(
      `/api/players/${props.playerId}/update-action`,
      {
        method: "POST",
        body: JSON.stringify({ newAction }),
      }
    );
    if (response.ok) {
      fetchPlayer();
    }
  } catch (err) {
    console.error("Error regenerating action:", err);
    error.value = "Error regenerating action";
  } finally {
    isRegenerating.value = false;
  }
}

onMounted(() => {
  fetchPlayer();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div
      v-show="player"
      class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
    >
      <h1 class="text-3xl font-bold mb-8">{{ player?.name }}'s Role</h1>

      <div class="space-y-6">
        <div>
          <h2 class="text-xl font-semibold mb-2">Your Target</h2>
          <p class="text-gray-700">{{ player?.target }}</p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Your Action</h2>
          <p class="text-gray-700">{{ player?.action }}</p>
          <div class="mt-8 flex flex-col gap-4">
            <div class="flex flex-col items-center gap-4">
              <button
                @click="regenerateAction"
                :disabled="
                  regenerateActionTimes >= config.MAX_REGENERATE_ACTION_TIMES ||
                  isRegenerating
                "
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
              >
                <ArrowPathIcon v-if="!isRegenerating" class="h-5 w-5" />
                <ArrowPathIcon v-else class="h-5 w-5 animate-spin" />
                Regenerate Action
              </button>
              <span class="text-sm text-gray-500">
                {{ regenerateActionTimesRemaining }}
                attempts remaining
              </span>
            </div>
            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
