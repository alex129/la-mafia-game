<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { GameSchema, PlayerSchema, type Player } from "@/schemas/game";
import { GameService } from "@/services/game";
import { PlusIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";
import RetroButton from "@/components/ui/RetroButton.vue";
import RetroInput from "@/components/ui/RetroInput.vue";
import RetroCard from "@/components/ui/RetroCard.vue";
import PlayersList from "@/components/player/PlayersList.vue";

const players = ref<Player[]>([]);
const newPlayer = ref<Player>({ name: "" });
const errors = ref<string[]>([]);
const nameError = ref<string>("");
const passwordError = ref<string>("");
const password = ref("");
const isLoading = ref(false);
const gameCreated = ref(false);
const countdown = ref(3);
let countdownInterval: number | undefined;

const startCountdown = () => {
  countdown.value = 3;
  countdownInterval = window.setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval);
      window.location.href = "/games";
    }
  }, 1000);
};

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

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

const validatePassword = () => {
  if (password.value.length < 4) {
    passwordError.value = "La contraseña debe tener al menos 4 caracteres";
    return false;
  }
  passwordError.value = "";
  return true;
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
    if (!validatePassword()) {
      return;
    }

    const result = GameSchema.safeParse({
      players: players.value,
      password: password.value,
    });

    if (!result.success) {
      errors.value = result.error.errors.map((e) => e.message);
      return;
    }

    isLoading.value = true;
    errors.value = [];

    await GameService.createGame(result.data.players, result.data.password);
    gameCreated.value = true;
    startCountdown();
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
        class="w-8 h-8 bg-transparent animate-bounce"
      />
      <span>La Mafia Game</span>
    </h2>

    <RetroCard v-if="gameCreated" class="bg-[#404040]">
      <h3 class="text-xl font-semibold mb-4 text-[#00ff00]">
        ¡Partida Creada!
      </h3>
      <p class="text-white">
        Vamos a redirigir a la página de partidas en {{ countdown }} segundos.
      </p>
      <div class="flex justify-center items-center mt-10">
        <img
          src="/jaw.webp"
          alt="La Mafia Game"
          class="w-12 h-12 animate-bounce"
        />
      </div>
    </RetroCard>

    <div v-else>
      <RetroCard title="Contraseña de la Partida" class="bg-[#404040] mb-4">
        <div class="space-y-4">
          <RetroInput
            v-model="password"
            type="password"
            placeholder="Contraseña de la partida"
            :error="passwordError"
            autocomplete="off"
          />
        </div>
      </RetroCard>

      <RetroCard title="Añadir Jugador" class="bg-[#404040]">
        <div class="space-y-4">
          <RetroInput
            v-model="newPlayer.name"
            placeholder="Nombre del jugador"
            :error="nameError"
            @keyup.enter="addPlayer"
          />
          <RetroButton @click="addPlayer" type="secondary">
            <template #icon>
              <PlusIcon class="w-4 h-4" />
            </template>
            Añadir
          </RetroButton>
        </div>
      </RetroCard>

      <RetroCard v-if="errors.length" class="bg-[#404040]">
        <ul class="list-disc list-inside text-[#ff0000] text-sm">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </RetroCard>

      <RetroCard title="Jugadores" class="bg-[#404040]">
        <PlayersList :players="players" @remove="removePlayer" />
      </RetroCard>

      <RetroButton
        @click="createGameHandler"
        :disabled="players.length < 2 || isLoading || !password"
        :loading="isLoading"
        type="primary"
        class="w-full mt-4"
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
