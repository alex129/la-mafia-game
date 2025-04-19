<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  verify: [password: string]
}>();

const password = ref("");
const isVerifying = ref(false);
const error = ref("");

async function handleVerify() {
  if (!password.value) {
    error.value = "Por favor, introduce la contraseña";
    return;
  }

  try {
    isVerifying.value = true;
    error.value = "";
    emit('verify', password.value);
  } catch (err) {
    console.error("Error verifying password:", err);
    error.value = "Error al verificar la contraseña";
  } finally {
    isVerifying.value = false;
  }
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Introduce la Contraseña</h2>
      <div class="space-y-4">
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña de la partida"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="handleVerify"
        />
        <button
          @click="handleVerify"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          :disabled="isVerifying"
        >
          {{ isVerifying ? "Verificando..." : "Verificar Contraseña" }}
        </button>
        <p v-if="error" class="text-red-600 text-sm error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
