<script setup lang="ts">
import { UserIcon, TrashIcon } from "@heroicons/vue/24/outline";
import type { Player } from "@/schemas/game";

defineProps<{
  players: Player[];
}>();

defineEmits<{
  (e: "remove", index: number): void;
}>();
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="(player, index) in players"
      :key="index"
      class="flex items-center justify-between p-4 bg-[#333333] rounded-md border-2 border-[#404040]"
    >
      <div class="flex items-center gap-2">
        <UserIcon class="w-4 h-4 text-[#0095ff]" />
        <p class="font-medium text-white text-sm">{{ player.name }}</p>
      </div>
      <button
        @click="$emit('remove', index)"
        class="text-[#ff0000] hover:text-[#ff0000]/80 cursor-pointer"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
