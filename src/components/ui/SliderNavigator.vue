<template>
  <div class="flex items-center justify-center gap-4 md:gap-8 w-full">
    <!-- Botão Voltar -->
    <button
      @click="previousCard"
      class="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-cyan-500/70 transition-all duration-300 shadow-lg backdrop-blur-sm border border-cyan-400/50"
    >
      <img
        src="/images/seta.png"
        alt="Anterior"
        class="w-6 h-6 md:w-8 md:h-8 invert transform rotate-180"
      />
    </button>

    <!-- Card Atual -->
    <div class="w-64 h-96">
      <FlipCard
        v-if="currentCard"
        :key="currentCard.cardId" 
        :card-id="currentCard.cardId"
        :nome="currentCard.nome"
        :fundo="currentCard.fundo"
        :nivel="currentCard.nivel"
        :imagem="currentCard.imagem"
        :alt="currentCard.alt"
        :descricao="currentCard.descricao"
        :atk="currentCard.atk"
        :def="currentCard.def"
        :is-flipped="true" 
        :is-matched="false"
      />
      <div v-else class="text-white text-center">
        Carregando cartas...
      </div>
    </div>

    <!-- Botão Avançar -->
    <button
      @click="nextCard"
      class="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-cyan-500/70 transition-all duration-300 shadow-lg backdrop-blur-sm border border-cyan-400/50"
    >
      <img
        src="/images/seta.png"
        alt="Avançar"
        class="w-6 h-6 md:w-8 md:h-8 invert"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';
import FlipCard from '@/components/game/FlipCard.vue';

const gameStore = useGameStore();

const currentCard = computed(() => gameStore.currentCard);

// Garante que os dados das cartas sejam carregados quando o componente for montado
onMounted(() => {
  if (gameStore.cards.length === 0) {
    gameStore.initializeGame();
  }
});

function nextCard() {
  gameStore.nextCard();
}

function previousCard() {
  gameStore.previousCard();
}
</script>
