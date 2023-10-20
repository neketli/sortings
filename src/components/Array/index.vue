<script setup lang="ts">
const props = defineProps<{
  array: { id: number; value: number }[];
}>();

const { array } = toRefs(props);
const arrayContainer: Ref<HTMLDivElement | undefined> = ref();

const BAR_WIDTH = computed(
  () => (arrayContainer.value?.clientWidth || 100) / array.value.length
);
</script>

<template>
  <div
    ref="arrayContainer"
    class="array px-10 w-full flex gap-0.5 justify-center items-end"
  >
    <TransitionGroup name="array">
      <BarItem
        v-for="item in array"
        :key="item.id"
        :height="item.value"
        :width="BAR_WIDTH"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.array-enter-active,
.array-leave-active {
  transition: all 0.5s ease;
}
.array-enter-from,
.array-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
