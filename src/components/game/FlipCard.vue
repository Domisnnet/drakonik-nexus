<template>
  <div
    class="relative w-56 h-80 cursor-pointer [perspective:1000px]"
    @click="$emit('click-event')"
  >
    <!-- Conteúdo giratório -->
    <div
      class="relative w-full h-full transition-transform duration-700"
      :class="{ '[transform:rotateY(180deg)]': cardState === 'flipped' }"
    >
      <!-- Frente da carta -->
      <div
        class="absolute w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl"
      >
      <img 
        :src="contentUrl" 
        :alt="alt" 
        class="card-image object-contain max-h-[280px] mx-auto"
      />

      </div>

      <!-- Verso da carta -->
      <div
        class="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden rounded-2xl overflow-hidden shadow-xl"
      >
        <img
          :src="fundo"
          alt="Verso"
          class="absolute w-full h-full object-cover rounded-2xl"
        />
        <div
          class="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white"
        >
          <h2 class="text-lg font-bold mb-1">{{ alt }}</h2>
          <p class="text-xs opacity-80 mb-2">{{ descricao }}</p>
          <div class="flex justify-between text-sm">
            <span>⚔️ ATK: {{ atk }}</span>
            <span>🛡️ DEF: {{ def }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  fundo: String,
  contentUrl: String,
  alt: String,
  cardState: String,
  descricao: String,
  atk: Number,
  def: Number,
});
defineEmits(["click-event"]);
</script>

<style scoped>
.backface-hidden {
  backface-visibility: hidden;
}
</style>