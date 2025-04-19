<script setup lang="ts">
import { ref } from "vue";
import type { Game } from "@/services/supabase";
import { verifyGamePassword } from "@/services/api";
import BackButton from "@/components/ui/BackButton.vue";
import PasswordVerificationForm from "@/components/forms/PasswordVerificationForm.vue";
import PlayerCard from "@/components/player/PlayerCard.vue";

const props = defineProps<{
  gameId: string;
}>();

const game = ref<Game | null>(null);
const origin = typeof window !== "undefined" ? window.location.origin : "";
const isVerified = ref(false);
const isLoading = ref(true);

async function fetchGame() {
  isLoading.value = true;
  try {
    const response = await fetch(`/api/games/${props.gameId}`);
    const data = await response.json();
    game.value = data.game;
  } catch (error) {
    console.error("Error fetching game:", error);
  } finally {
    isLoading.value = false;
  }
}

async function handlePasswordVerification(password: string) {
  const verified = await verifyGamePassword(props.gameId, password);
  if (verified) {
    isVerified.value = true;
    await fetchGame();
  } else {
    throw new Error("Contraseña incorrecta");
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <BackButton />

    <PasswordVerificationForm
      v-if="!isVerified"
      @verify="handlePasswordVerification"
    />

    <template v-else>
      <div v-if="isLoading">
        <div
          class="flex justify-center items-center bg-white rounded-lg shadow-md p-5"
        >
          <img
            id="loading-icon"
            src="/candy-bag.gif"
            alt="candy la mafia loading"
            class="w-12 h-12"
          />
        </div>
      </div>

      <div v-else>
        <h1 class="text-3xl font-bold mb-8">Detalles de la Partida</h1>

        <div class="grid gap-6">
          <PlayerCard
            v-for="player in game?.players"
            :key="player.id"
            :player="player"
            :origin="origin"
          />
        </div>
      </div>
    </template>
  </div>
</template>
