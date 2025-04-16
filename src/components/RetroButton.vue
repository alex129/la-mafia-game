<script setup lang="ts">
type ButtonType = "primary" | "secondary" | "danger";

defineProps<{
  type?: ButtonType;
  disabled?: boolean;
  loading?: boolean;
}>();

const getButtonClass = (type: ButtonType = "primary") => {
  const baseClass =
    "w-full py-2 px-4 rounded-md border-2 border-[#404040] transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2 font-[Press Start 2P] text-sm";

  const variants = {
    primary: "bg-[#0095ff] text-white hover:bg-[#0095ff]/80",
    secondary: "bg-[#00ff00] text-[#404040] hover:bg-[#00ff00]/80",
    danger: "bg-[#ff0000] text-white hover:bg-[#ff0000]/80",
  };

  return `${baseClass} ${variants[type]} disabled:bg-[#666666] disabled:text-[#999999] disabled:cursor-not-allowed`;
};
</script>

<template>
  <button :class="getButtonClass(type)" :disabled="disabled || loading">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
