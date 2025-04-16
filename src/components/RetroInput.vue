<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder?: string;
  error?: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div>
    <input
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="placeholder"
      class="w-full px-4 py-2 rounded-md border-2 border-[#404040] bg-[#333333] text-white focus:border-[#0095ff] focus:outline-none placeholder-[#808080] font-[Press Start 2P] text-sm"
      :class="{ 'border-[#ff0000]': error }"
    />
    <p v-if="error" class="mt-1 text-sm text-[#ff0000]">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
input::placeholder {
  font-size: 10px;
}
</style>
