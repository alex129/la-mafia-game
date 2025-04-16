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
      class="w-full px-4 py-2 rounded-none border-4 border-[#0f380f] bg-[#c4cfa1] text-[#0f380f] focus:border-[#306230] focus:outline-none placeholder-[#306230] font-[Press Start 2P] text-sm"
      :class="{ 'border-[#8b945f]': error }"
    />
    <p v-if="error" class="mt-1 text-sm text-[#306230]">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
input::placeholder {
  font-size: 10px;
}
</style>
