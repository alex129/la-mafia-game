<script setup lang="ts">
import { ref } from "vue";
import { GameSchema, PlayerSchema, type Player } from "../schemas/game";
import { GameService } from "../services/game";
import { PlusIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import RetroButton from "./RetroButton.vue";
import RetroInput from "./RetroInput.vue";
import RetroCard from "./RetroCard.vue";
import PlayersList from "./PlayersList.vue";

const players = ref<Player[]>([]);
const newPlayer = ref<Player>({ name: "" });
const errors = ref<string[]>([]);
const nameError = ref<string>("");
const isLoading = ref(false);
const gameCreated = ref(false);

const validatePlayer = () => {
  const result = PlayerSchema.safeParse(newPlayer.value);

  if (result.success) {
    nameError.value = "";
    return true;
  } else {
    nameError.value = "";
    result.error.errors.forEach((error) => {
      const path = error.path[0];
      if (path === "name") {
        nameError.value = error.message;
      }
    });
    return false;
  }
};

const addPlayer = () => {
  if (validatePlayer()) {
    players.value.push(newPlayer.value);
    newPlayer.value = { name: "" };
    errors.value = [];
  }
};

const removePlayer = (index: number) => {
  players.value.splice(index, 1);
};

const createGameHandler = async () => {
  try {
    const result = GameSchema.safeParse({ players: players.value });

    if (!result.success) {
      errors.value = result.error.errors.map((e) => e.message);
      return;
    }

    isLoading.value = true;
    errors.value = [];

    await GameService.createGame(result.data.players);
    gameCreated.value = true;
  } catch (error) {
    if (error instanceof Error) {
      errors.value = [error.message];
    } else {
      errors.value = ["Error al crear la partida"];
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="max-w-2xl mx-auto p-6 bg-[#808080] rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 border-4 border-[#666666]"
  >
    <h2
      class="text-2xl font-bold text-center mb-8 text-white tracking-wider flex gap-5 items-center justify-center"
    >
      <img
        src="/game-over.png"
        alt="La Mafia Game"
        class="w-8 h-8 bg-transparent"
      />
      <span>La Mafia Game</span>
    </h2>

    <RetroCard v-if="gameCreated" class="bg-[#404040]">
      <h3 class="text-xl font-semibold mb-4 text-[#00ff00]">
        ¡Partida Creada!
      </h3>
      <p class="text-white">
        Se han descargado los archivos con las misiones de cada jugador.
      </p>
    </RetroCard>

    <div v-else>
      <!-- Player Form -->
      <RetroCard title="Añadir Jugador" class="bg-[#404040]">
        <div class="space-y-4">
          <RetroInput
            v-model="newPlayer.name"
            placeholder="Nombre del jugador"
            :error="nameError"
          />
          <RetroButton @click="addPlayer" type="secondary">
            <template #icon>
              <PlusIcon class="w-4 h-4" />
            </template>
            Añadir
          </RetroButton>
        </div>
      </RetroCard>

      <!-- Global Error Messages -->
      <RetroCard v-if="errors.length" class="bg-[#404040]">
        <ul class="list-disc list-inside text-[#ff0000] text-sm">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </RetroCard>

      <!-- Players List -->
      <RetroCard title="Jugadores" class="bg-[#404040]">
        <PlayersList :players="players" @remove="removePlayer" />
      </RetroCard>

      <!-- Create Game Button -->
      <RetroButton
        @click="createGameHandler"
        :disabled="players.length < 2 || isLoading"
        :loading="isLoading"
        type="primary"
      >
        <template #icon>
          <ArrowPathIcon v-if="isLoading" class="w-4 h-4 animate-spin" />
        </template>
        {{ isLoading ? "Creando..." : "Crear Partida" }}
      </RetroButton>
    </div>
  </div>
</template>

<style scoped>
.bg-gradient-playstation {
  background: linear-gradient(145deg, #808080 0%, #666666 100%);
}

input::placeholder {
  font-size: 10px;
}
</style>
