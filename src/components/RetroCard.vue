<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <div class="mb-8 p-6 bg-gradient-to-r from-neutral-300 to-stone-400 rounded-md border-4 border-[#0f380f]">
    <h3 v-if="title" class="text-xl font-semibold mb-4 text-[#0f380f]">
      {{ title }}
    </h3>
    <slot></slot>
  </div>
</template>
