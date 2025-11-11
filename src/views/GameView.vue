<template>
  <BaseLayout>
    <div class="relative flex flex-col items-center justify-center w-full h-full">
      <FlipCard />
      <SliderNavigator />
    </div>
  </BaseLayout>
</template>

<script setup>
import FlipCard from "@/components/game/FlipCard.vue";
import SliderNavigator from "@/components/ui/SliderNavigator.vue";
import BaseLayout from "@/components/layouts/BaseLayout.vue";
</script>