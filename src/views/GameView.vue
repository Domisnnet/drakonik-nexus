<template>
  <div class="flex justify-center items-center h-screen gap-[100px]">
    <!-- Botão Voltar -->
    <button
      @click="previousCard"
      class="bg-cyan-400/20 w-[70px] h-[70px] flex items-center justify-center rounded-full border-none cursor-pointer
             shadow-[0_4px_15px_rgba(0,0,0,0.2),_inset_0_0_0_3px_rgba(255,255,255,0.8)]
             backdrop-blur-sm transition-all duration-300 ease-in-out relative z-[100]
             hover:bg-cyan-400/70 hover:shadow-[0_0_20px_rgba(0,240,255,0.8),_inset_0_0_0_3px_rgba(255,255,255,1)]"
    >
      <img
        src="/images/seta.png"
        alt="seta voltar"
        class="w-10 h-10 invert transition-transform duration-300 ease-in-out rotate-180"
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
      @click="nextCard"
      class="bg-cyan-400/20 w-[70px] h-[70px] flex items-center justify-center rounded-full border-none cursor-pointer
             shadow-[0_4px_15px_rgba(0,0,0,0.2),_inset_0_0_0_3px_rgba(255,255,255,0.8)]
             backdrop-blur-sm transition-all duration-300 ease-in-out relative z-[100]
             hover:bg-cyan-400/70 hover:shadow-[0_0_20px_rgba(0,240,255,0.8),_inset_0_0_0_3px_rgba(255,255,255,1)]"
    >
      <img
        src="/images/seta.png"
        alt="seta avançar"
        class="w-10 h-10 invert transition-transform duration-300 ease-in-out"
      />
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import FlipCard from "../components/game/FlipCard.vue";
import SliderNavigator from '@/components/game/SliderNavigator.vue';
import { useGameStore } from "../stores/game";

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