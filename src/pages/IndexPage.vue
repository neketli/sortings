<script setup lang="ts">
import { createArray } from "@/utils";

const route = useRoute();

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

const arrayLength = ref(10);
const array = ref(createArray(arrayLength.value));

const setupArray = () => {
  array.value = createArray(arrayLength.value);
};

watch(arrayLength, setupArray);
</script>

<template>
  <section class="relative p-4 min-h-full h-[100vh] bg-slate-800">
    <div class="container mx-auto">
      <div class="text-xl text-white mb-4">
        Количество элементов
        <ElSlider v-model="arrayLength" :min="10" :max="100" showInput />
        <ElButton @click="setupArray"> Сброс значений </ElButton>
      </div>
      <Array :array="array" />
    </div>
  </section>
</template>
