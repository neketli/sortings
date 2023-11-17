<script setup lang="ts">
const props = defineProps<{
  height: number;
  width: number;
}>();

const { height, width } = toRefs(props);
</script>

<template>
  <div
    class="bar-item"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>
