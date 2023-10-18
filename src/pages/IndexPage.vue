<script setup lang="ts">
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
</script>

<template>
  <section class="relative py-8">HelloWorld</section>
</template>
