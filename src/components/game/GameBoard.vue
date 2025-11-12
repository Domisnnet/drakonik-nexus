<template>
  <div
    v-if="gameStore.cards.length"
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 items-center justify-center"
  >
    <FlipCard
      v-for="card in gameStore.cards"
      :key="card.id"
      :card-id="card.id"
      :nome="card.nome"
      :fundo="card.fundo"
      :nivel="card.nivel"
      :imagem="card.imagem"
      :alt="card.alt"
      :descricao="card.descricao"
      :atk="card.atk"
      :def="card.def"
      :is-flipped="card.isFlipped"
      :is-matched="card.isMatched"
      @flip-card="gameStore.flipCard"
    />
  </div>
  <div v-else class="text-center text-white p-10">
    <p>Carregando o jogo...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameStore } from '../../stores/game';
import FlipCard from './FlipCard.vue';

const gameStore = useGameStore();

onMounted(() => {
  // Inicializa o jogo apenas se o tabuleiro estiver vazio
  if (gameStore.cards.length === 0) {
    gameStore.initializeGame();
  }
});
</script>
