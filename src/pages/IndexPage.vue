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

const array = createArray(30);
</script>

<template>
  <section class="relative py-8 min-h-full h-[100vh] bg-slate-800">
    <Vueform>
      <TextElement name="hello_world" label="Hello" placeholder="World" />
    </Vueform>
    <Array :array="array" />
  </section>
</template>
