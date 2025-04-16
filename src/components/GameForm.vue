<script setup lang="ts">
import { ref, computed } from "vue";
import { GameSchema, PlayerSchema, type Player } from "../schemas/game";
import { GameService } from "../services/game";
const players = ref<Player[]>([]);
const newPlayer = ref<Player>({ name: "", email: "" });
const errors = ref<string[]>([]);
const nameError = ref<string>("");
const emailError = ref<string>("");
const isLoading = ref(false);
const gameCreated = ref(false);

const validatePlayer = () => {
  const result = PlayerSchema.safeParse(newPlayer.value);

  if (result.success) {
    nameError.value = "";
    emailError.value = "";
    return true;
  } else {
    // Reset errors
    nameError.value = "";
    emailError.value = "";

    // Map errors to specific fields
    result.error.errors.forEach((error) => {
      const path = error.path[0];
      if (path === "name") {
        nameError.value = error.message;
      } else if (path === "email") {
        emailError.value = error.message;
      }
    });

    return false;
  }
};

const addPlayer = () => {
  if (validatePlayer()) {
    players.value.push(newPlayer.value);
    newPlayer.value = { name: "", email: "" };
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
    class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
  >
    <h2 class="text-3xl font-bold text-center mb-8 text-purple-600">
      🎮 La Mafia Game
    </h2>

    <div v-if="gameCreated" class="mb-8 p-6 bg-green-50 rounded-lg text-center">
      <h3 class="text-xl font-semibold mb-4 text-green-700">
        ¡Partida Creada!
      </h3>
      <p class="text-green-600">
        Se han enviado los emails a todos los jugadores con sus objetivos y
        acciones.
      </p>
    </div>

    <div v-else>
      <!-- Player Form -->
      <div class="mb-8 p-6 bg-purple-50 rounded-lg">
        <h3 class="text-xl font-semibold mb-4 text-purple-700">
          Añadir Jugador
        </h3>
        <div class="space-y-4">
          <div>
            <input
              v-model="newPlayer.name"
              type="text"
              placeholder="Nombre del jugador"
              class="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
              :class="{ 'border-red-500': nameError }"
            />
            <p v-if="nameError" class="mt-1 text-sm text-red-600">
              {{ nameError }}
            </p>
          </div>
          <div>
            <input
              v-model="newPlayer.email"
              type="email"
              placeholder="Email del jugador"
              class="w-full px-4 py-2 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
              :class="{ 'border-red-500': emailError }"
            />
            <p v-if="emailError" class="mt-1 text-sm text-red-600">
              {{ emailError }}
            </p>
          </div>
          <button
            @click="addPlayer"
            class="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
          >
            Añadir Jugador
          </button>
        </div>
      </div>

      <!-- Global Error Messages -->
      <div v-if="errors.length" class="mb-4 p-4 bg-red-100 rounded-lg">
        <ul class="list-disc list-inside text-red-600">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Players List -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold mb-4 text-purple-700">Jugadores</h3>
        <div class="space-y-2">
          <div
            v-for="(player, index) in players"
            :key="index"
            class="flex items-center justify-between p-4 bg-purple-50 rounded-lg"
          >
            <div>
              <p class="font-medium text-purple-800">{{ player.name }}</p>
              <p class="text-sm text-purple-600">{{ player.email }}</p>
            </div>
            <button
              @click="removePlayer(index)"
              class="text-red-500 hover:text-red-700 cursor-pointer"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Create Game Button -->
      <button
        @click="createGameHandler"
        :disabled="players.length < 2 || isLoading"
        class="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
      >
        <span v-if="isLoading">Creando partida...</span>
        <span v-else>Crear Partida</span>
      </button>
    </div>
  </div>
</template>
