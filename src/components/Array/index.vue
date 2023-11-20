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

const getClass = ({ id }: ArrayItem) => {
  const colors = {
    active: "bg-orange-400",
    sorted: "bg-green-400",
    additional: "bg-red-400",
    default: "bg-green-200",
  };

  const status =
    (activeElements.value.includes(id) && "active") ||
    (sortedElements.value.includes(id) && "sorted") ||
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
    class="array p-2 md:px-10 w-full flex gap-1 justify-center items-end"
  >
    <BarItem
      v-for="item in array"
      :key="item.id"
      :height="item.value"
      :width="BAR_WIDTH"
      class="hover:opacity-90"
      :class="getClass(item)"
      :title="item.value"
    />
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
