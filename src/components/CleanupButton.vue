<script setup lang="ts">
import { ref } from "vue";
import ConfirmModal from "./ConfirmModal.vue";
import { cleanupGames } from "../services/api";

const isModalOpen = ref(false);

const emit = defineEmits<{
  (e: "cleanup-complete"): void;
}>();

async function handleCleanup() {
  try {
    const success = await cleanupGames();
    if (success) {
      emit("cleanup-complete");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  isModalOpen.value = false;
}
</script>

<template>
  <div>
    <button
      @click="isModalOpen = true"
      class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors cursor-pointer"
    >
      Clean Up All Games
    </button>

    <ConfirmModal
      :is-open="isModalOpen"
      title="Clean Up Games"
      message="Are you sure you want to delete all games and players? This action cannot be undone."
      @confirm="handleCleanup"
      @cancel="isModalOpen = false"
    />
  </div>
</template>
