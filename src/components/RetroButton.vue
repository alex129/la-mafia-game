<script setup lang="ts">
defineProps<{
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
}>();

const getButtonClass = (type: string = "primary") => {
  const baseClass =
    "w-full py-2 px-4 rounded-none border-4 border-[#0f380f] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 font-[Press Start 2P] text-sm";

  const variants = {
    primary: "bg-[#8bac0f] text-[#0f380f] hover:bg-[#8bac0f]/80",
    secondary: "bg-[#306230] text-[#c4cfa1] hover:bg-[#306230]/80",
    danger: "bg-[#8b945f] text-[#0f380f] hover:bg-[#8b945f]/80",
  };

  return `${baseClass} ${variants[type]} disabled:bg-[#8b945f] disabled:text-[#306230] disabled:cursor-not-allowed`;
};
</script>

<template>
  <button :class="getButtonClass(type)" :disabled="disabled || loading">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
