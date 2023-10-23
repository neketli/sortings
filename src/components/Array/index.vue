<script setup lang="ts">
import { useSortingsStore } from "@/store/sortings";
import { ArrayItem } from "@/types";

const props = defineProps<{
  array: { id: number; value: number }[];
}>();

const { array } = toRefs(props);
const arrayContainer: Ref<HTMLDivElement | undefined> = ref();

const store = useSortingsStore();

const sortedElements = computed(() => store.sortedElements);
const activeElements = computed(() => store.activeElements);
const additionalElements = computed(() => store.additionalElements);

const getColor = ({ id }: ArrayItem) => {
  const colors = {
    active: "orange-400",
    sorted: "green-400",
    additional: "red-400",
    default: "green-200",
  };

  const status =
    (sortedElements.value.includes(id) && "sorted") ||
    (activeElements.value.includes(id) && "active") ||
    (additionalElements.value.includes(id) && "additional") ||
    "default";

  return colors[status];
};

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
        :key="item.value"
        :height="item.value"
        :width="BAR_WIDTH"
        :color="getColor(item)"
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
