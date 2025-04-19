<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div
    class="mb-8 p-6 bg-[#333333] rounded-md border-2 border-[#404040] shadow-lg"
  >
    <h3 v-if="title" class="text-xl font-semibold mb-4 text-white">
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>
