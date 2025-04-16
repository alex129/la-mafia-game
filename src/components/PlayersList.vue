<script setup lang="ts">
import { UserIcon, TrashIcon } from "@heroicons/vue/24/outline";
import type { Player } from "../schemas/game";

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
      class="flex items-center justify-between p-4 bg-[#9bbc0f] rounded-none border-4 border-[#0f380f]"
    >
      <div class="flex items-center gap-2">
        <UserIcon class="w-4 h-4 text-[#306230]" />
        <p class="font-medium text-[#0f380f] text-sm">{{ player.name }}</p>
      </div>
      <button
        @click="$emit('remove', index)"
        class="text-[#306230] hover:text-[#0f380f] cursor-pointer"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
