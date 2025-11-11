<template>
  <div class="flex items-center justify-center gap-20 h-full">
    <!-- Botão Voltar -->
    <button
      class="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-cyan-500/20 hover:bg-cyan-400/70 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_0_0_3px_rgba(255,255,255,0.8)] backdrop-blur-md"
      @click="previousCard"
    >
      <img
        src="/images/seta.png"
        alt="seta voltar"
        class="w-10 h-10 invert rotate-180 transition-transform duration-300"
      />
    </button>

    <!-- Card Atual -->
    <FlipCard
      v-if="currentCard"
      :card-id="currentCard.cardId"
      :fundo="currentCard.fundo"
      :is-matched="currentCard.isMatched"
      :card-state="currentCard.cardState"
      :content-url="currentCard.contentUrl"
      :alt="currentCard.alt"
      :nivel="currentCard.nivel"
      :descricao="currentCard.descricao"
      :atk="currentCard.atk"
      :def="currentCard.def"
      @click-event="handleFlip"
    />

    <!-- Botão Avançar -->
    <button
      class="w-[70px] h-[70px] flex items-center justify-center rounded-full bg-cyan-500/20 hover:bg-cyan-400/70 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2),inset_0_0_0_3px_rgba(255,255,255,0.8)] backdrop-blur-md"
      @click="nextCard"
    >
      <img
        src="/images/seta.png"
        alt="seta avançar"
        class="w-10 h-10 invert transition-transform duration-300"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import FlipCard from "@/components/game/FlipCard.vue";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();

onMounted(() => {
  gameStore.initializeGame();
});

const currentCard = computed(() => gameStore.currentCard);

function handleFlip() {
  gameStore.flipCard(currentCard.value.cardId);
}

function nextCard() {
  gameStore.nextCard();
}

function previousCard() {
  gameStore.previousCard();
}
</script>