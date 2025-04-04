<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { useSortingsStore } from "@/store/sortings";
import { ElDrawer } from "element-plus";

const route = useRoute();
const store = useMainStore();
const sortings = useSortingsStore();

useHead({
  title: route.meta.title,
  meta: [
    {
      property: "og:title",
      content: route.meta.title,
    },
    {
      name: "twitter:title",
      content: route.meta.title,
    },
  ],
});

const options = [
  {
    id: "bubble",
    label: "Bubble sort",
    value: () => sortings.bubbleSort(store.array),
  },
  {
    id: "gnome",
    label: "Gnome sort",
    value: () => sortings.gnomeSort(store.array),
  },
  {
    id: "shaker",
    label: "Shaker sort",
    value: () => sortings.shakerSort(store.array),
  },
  {
    id: "quick",
    label: "Quick sort",
    value: () => sortings.quickSort(store.array),
  },
  {
    id: "merge",
    label: "Merge sort",
    value: () => sortings.mergeSort(store.array),
  },
  {
    id: "selection",
    label: "Selection sort",
    value: () => sortings.selectionSort(store.array),
  },
  {
    id: "insertion",
    label: "Insertion sort",
    value: () => sortings.insertionSort(store.array),
  },
  {
    id: "radix",
    label: "Radix sort",
    value: () => sortings.radixSort(store.array),
  },

  {
    id: "bogo",
    label: "Bogo sort",
    value: () => sortings.bogoSort(store.array),
  },
];

const length = ref(store.length);
const option = ref(options[0]);
const drawer = ref(false);

const reset = async () => {
  await sortings.stopSorting();
  store.setupArray();
};

watch(length, () => {
  sortings.$reset();
  store.setupLength(length.value);
});

onMounted(() => {
  store.setupArray();
});
</script>

<template>
  <section class="relative p-4 md:px-8 min-h-[100vh] bg-slate-800 text-white">
    <div class="container mx-auto">
      <h1 class="py-6 text-6xl font-bold">Sortings</h1>
      <div class="w-full flex flex-wrap justify-center gap-4 text-xl mb-4 p-2">
        <div class="w-full flex gap-2 flex-col max-w-xl">
          <span> Array length </span>
          <ElSlider
            v-model="length"
            :disabled="sortings.isActive"
            :min="5"
            :max="50"
            show-input
          />
          <span> Animation speed </span>
          <ElSlider
            v-model="store.speed"
            :min="0.5"
            :max="10"
            :step="0.5"
            show-input
          />
        </div>
        <div class="w-full flex justify-center flex-col sm:flex-row gap-4">
          <ElSelect
            v-model="option"
            :disabled="sortings.isActive"
            class="w-full sm:w-auto"
          >
            <ElOption
              v-for="item in options"
              :key="item.id"
              :label="item.label"
              :value="item"
            />
          </ElSelect>
          <div class="flex flex-wrap gap-2">
            <ElButton class="w-full sm:w-auto" @click="reset"> Reset </ElButton>
            <ElButton
              class="w-full sm:w-auto !m-0"
              :disabled="sortings.isActive"
              @click="option.value"
            >
              Start
            </ElButton>
            <ElButton
              class="w-full sm:w-auto !m-0"
              @click="drawer = true"
            >
              How it works?
            </ElButton>
          </div>
        </div>
      </div>
      <Array :array="store.array" />

      <ElDrawer v-model="drawer" append-to-body size="90%" direction="btt">
        <h2 class="text-xl mb-4 font-bold">{{ option.label }}</h2>
        <SortingDescription :type="option.id" />
      </ElDrawer>
    </div>
  </section>
</template>
