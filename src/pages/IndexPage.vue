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

const bubbleSort = () => {
  sortings.bubbleSort(store.array, length.value);

  console.log(store.array);
};

watch(length, store.setupLength);

onMounted(() => {
  store.setupArray();
});
</script>

<template>
  <section class="relative p-4 min-h-full h-[100vh] bg-slate-800">
    <div class="container mx-auto">
      <div class="flex flex-col gap-2 text-xl text-white mb-4">
        Количество элементов
        <ElSlider v-model="length" :min="10" :max="100" show-input />
        <div class="flex gap-4 justify-between">
          <ElButton @click="store.setupArray"> Сброс значений </ElButton>
          <div class="flex gap-2">
            <ElButton @click="bubbleSort"> Сортировка пузырьком </ElButton>
          </div>
        </div>
      </div>
      <Array :array="store.array" />
    </div>
  </section>
</template>
