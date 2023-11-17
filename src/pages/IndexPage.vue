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

const length = ref(store.length);

const reset = async () => {
  await sortings.stopSorting();
  store.setupArray();
};

const bubbleSort = () => {
  sortings.bubbleSort(store.array, length.value);
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
  <section class="relative p-4 min-h-full h-[100vh] bg-slate-800 text-white">
    <div class="container mx-auto">
      <h1 class="py-6 text-7xl font-bold">Sortings</h1>
      <div class="flex flex-col gap-4 text-xl mb-4">
        <div class="flex gap-4 flex-col md:flex-row">
          Количество элементов
          <ElSlider v-model="length" :min="10" :max="100" show-input />
          Скорость анимации
          <ElSlider v-model="store.speed" :min="1" :max="100" show-input />
        </div>
        <div class="flex gap-4 justify-between">
          <ElButton @click="reset"> Сброс значений </ElButton>
          <div class="flex gap-2">
            <ElButton @click="bubbleSort"> Сортировка пузырьком </ElButton>
          </div>
        </div>
      </div>
      <Array :array="store.array" />
    </div>
  </section>
</template>
