<script setup lang="ts">
const props = defineProps<{
  height: number;
  width: number;
  color?: string;
}>();

const { height, width, color } = toRefs(props);
</script>

<template>
  <div
    class="bar-item hover:bg-opacity-90"
    :class="[`bg-${color}`]"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>
