<template>
  <BaseLayout>
    <h1 class="title">Arena Drakonik</h1>
    <SliderNavigator />
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/layouts/BaseLayout.vue";
import SliderNavigator from "@/components/ui/SliderNavigator.vue";
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: black;
  text-shadow: 0 0 20px rgba(128, 0, 255, 0.8);
  margin-bottom: 2rem;
}
</style>