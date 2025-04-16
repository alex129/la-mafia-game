<script setup lang="ts">
import { ref, computed } from "vue";
import { GameSchema, PlayerSchema, type Player } from "../schemas/game";
import { GameService } from "../services/game";
import {
  UserPlusIcon,
  TrashIcon,
  UserIcon,
  PlusIcon,
  ArrowPathIcon,
} from "@heroicons/vue/24/outline";

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
    // Reset errors
    nameError.value = "";

    // Map errors to specific fields
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
    class="max-w-2xl mx-auto p-6 bg-[#18100d] rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 border border-[#ddc5c1]"
  >
    <h2 class="text-3xl font-bold text-center mb-8 text-[#bc0a0f]">
      🎮 La Mafia Game
    </h2>

    <div
      v-if="gameCreated"
      class="mb-8 p-6 bg-[#18100d] rounded-lg text-center border border-[#059dc6]"
    >
      <h3 class="text-xl font-semibold mb-4 text-[#059dc6]">
        ¡Partida Creada!
      </h3>
      <p class="text-[#ddc5c1]">
        Se han descargado los archivos con las misiones de cada jugador.
      </p>
    </div>

    <div v-else>
      <!-- Player Form -->
      <div class="mb-8 p-6 bg-[#18100d] rounded-lg border border-[#ddc5c1]">
        <h3 class="text-xl font-semibold mb-4 text-[#bc0a0f]">
          Añadir Jugador
        </h3>
        <div class="space-y-4">
          <div>
            <input
              v-model="newPlayer.name"
              type="text"
              placeholder="Nombre del jugador"
              class="w-full px-4 py-2 rounded-lg border-2 border-[#ddc5c1] bg-[#18100d] text-[#ddc5c1] focus:border-[#059dc6] focus:outline-none placeholder-[#ddc5c1]/50"
              :class="{ 'border-[#bc0a0f]': nameError }"
            />
            <p v-if="nameError" class="mt-1 text-sm text-[#bc0a0f]">
              {{ nameError }}
            </p>
          </div>
          <button
            @click="addPlayer"
            class="w-full bg-[#bc0a0f] text-[#ddc5c1] py-2 px-4 rounded-lg hover:bg-[#bc0a0f]/80 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlusIcon class="w-5 h-5" />
            Añadir Jugador
          </button>
        </div>
      </div>

      <!-- Global Error Messages -->
      <div
        v-if="errors.length"
        class="mb-4 p-4 bg-[#bc0a0f]/20 rounded-lg border border-[#bc0a0f]"
      >
        <ul class="list-disc list-inside text-[#bc0a0f]">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Players List -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4 text-[#bc0a0f]">Jugadores</h3>
        <div class="space-y-2">
          <div
            v-for="(player, index) in players"
            :key="index"
            class="flex items-center justify-between p-4 bg-[#18100d] rounded-lg border border-[#ddc5c1]"
          >
            <div class="flex items-center gap-2">
              <UserIcon class="w-5 h-5 text-[#059dc6]" />
              <p class="font-medium text-[#ddc5c1]">{{ player.name }}</p>
            </div>
            <button
              @click="removePlayer(index)"
              class="text-[#bc0a0f] hover:text-[#bc0a0f]/80 cursor-pointer"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Create Game Button -->
      <button
        @click="createGameHandler"
        :disabled="players.length < 2 || isLoading"
        class="w-full bg-[#059dc6] text-[#ddc5c1] py-3 px-6 rounded-lg text-lg font-semibold hover:bg-[#059dc6]/80 transition-colors duration-200 disabled:bg-[#18100d] disabled:border disabled:border-[#ddc5c1] disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        <ArrowPathIcon v-if="isLoading" class="w-5 h-5 animate-spin" />
        <span v-if="isLoading">Creando partida...</span>
        <span v-else>Crear Partida</span>
      </button>
    </div>
  </div>
</template>
