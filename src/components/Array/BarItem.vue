<script setup lang="ts">
const props = defineProps<{
  height: number;
  width: number;
}>();

const { height, width } = toRefs(props);
</script>

<template>
  <div
    class="bg-green-400 bar-item hover:bg-opacity-90"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>
