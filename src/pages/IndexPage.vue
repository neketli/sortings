<script setup lang="ts">
import { useMainStore } from "@/store/main";
import { useSortingsStore } from "@/store/sortings";

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
    id: "quick",
    label: "Quick sort",
    value: () => sortings.quickSort(store.array),
  },
  {
    id: "merge",
    label: "Merge sort",
    value: () => sortings.mergeSort(store.array),
  },
];

const length = ref(store.length);
const option = ref(options[0]);

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
            :min="10"
            :max="50"
            show-input
          />
          <span> Animation speed </span>
          <ElSlider v-model="store.speed" :min="1" :max="100" show-input />
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
            <ElButton class="w-full sm:w-auto !m-0" @click="option.value">
              Start
            </ElButton>
          </div>
        </div>
      </div>
      <Array :array="store.array" />
    </div>
  </section>
</template>
