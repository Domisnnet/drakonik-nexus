<template>
  <div
    class="flex items-center justify-center w-full"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Card Atual -->
    <div class="w-64 h-96 cursor-pointer select-none">
      <FlipCard
        v-if="currentCard"
        :key="currentCard.id"
        :id="currentCard.id"
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
        @flip-card="() => {}"
      />
      <div v-else class="text-white text-center">Carregando cartas...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';
import FlipCard from '@/components/game/FlipCard.vue';
import type { Card } from '@/types';

const gameStore = useGameStore();
const currentCardIndex = ref(0);

const currentCard = computed<Card | null>(() => {
  return gameStore.uniqueCards[currentCardIndex.value] ?? null;
});

onMounted(() => {
  if (gameStore.uniqueCards.length === 0) {
    gameStore.initializeGame();
  }
});

function nextCard() {
  if (gameStore.uniqueCards.length > 0) {
    currentCardIndex.value = (currentCardIndex.value + 1) % gameStore.uniqueCards.length;
  }
}

function previousCard() {
  if (gameStore.uniqueCards.length > 0) {
    currentCardIndex.value =
      (currentCardIndex.value - 1 + gameStore.uniqueCards.length) % gameStore.uniqueCards.length;
  }
}

// Lógica de Swipe
const touchStartX = ref(0);
const touchThreshold = 50;

function handleTouchStart(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (!touch) return;
  touchStartX.value = touch.screenX;
}

function handleTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (!touch) return;
  const touchEndX = touch.screenX;
  const deltaX = touchEndX - touchStartX.value;

  if (deltaX > touchThreshold) {
    previousCard();
  } else if (deltaX < -touchThreshold) {
    nextCard();
  }
}
</script>
