<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-black/40 rounded-md shadow-lg max-w-5xl mx-auto">
      <FlipCard
        v-for="card in gameStore.cards"
        :key="card.id"
        :fundo="card.fundo"
        :card-state="card.cardState"
        :content-url="card.imagem"
        :alt="card.alt"
        :nivel="card.nivel"
        :descricao="card.descricao"
        :atk="card.atk"
        :def="card.def"
        @click-event="() => gameStore.flipCardById(card.id)"
      />
    </div>
</template>
  
<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useGameStore } from '@/stores/game'
  import FlipCard from './FlipCard.vue'
  
  const gameStore = useGameStore()
  
  onMounted(() => {
    if (gameStore.cards.length === 0) gameStore.initializeGame()
  })
</script>
  
<style scoped></style>  