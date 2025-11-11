<template>
  <div
    class="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
  >
    <!-- Efeito giratório do fundo -->
    <div class="absolute inset-0 animate-rotateBg opacity-40">
      <div
        class="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]"
      ></div>
    </div>

    <!-- Cabeçalho -->
    <header
      class="z-10 text-center mb-8 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]"
    >
      <h1
        class="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-700 bg-clip-text text-transparent"
      >
        Drakonik Nexus!
      </h1>
      <p class="text-sm uppercase tracking-widest text-indigo-300 mt-2">
        Duel Arena
      </p>
    </header>

    <!-- Slider de cartas -->
    <div class="z-10 relative flex items-center justify-center w-full px-6">
      <!-- Botão esquerda -->
      <button
        class="absolute left-6 md:left-12 text-indigo-400 hover:text-white transition-transform hover:scale-125 text-4xl"
        @click="prevCard"
      >
        ‹
      </button>

      <!-- Card principal -->
      <FlipCard
        v-if="currentCard"
        :fundo="currentCard.fundo"
        :content-url="currentCard.contentUrl"
        :alt="currentCard.alt"
        :descricao="currentCard.descricao"
        :atk="currentCard.atk"
        :def="currentCard.def"
        :card-state="currentCard.cardState"
        @click-event="gameStore.handleCardClick(currentCard.id)"
        class="transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
      />

      <!-- Botão direita -->
      <button
        class="absolute right-6 md:right-12 text-indigo-400 hover:text-white transition-transform hover:scale-125 text-4xl"
        @click="nextCard"
      >
        ›
      </button>
    </div>

    <!-- Rodapé -->
    <footer class="z-10 mt-8 flex flex-col items-center">
      <button
        class="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-500 hover:to-purple-600 transition-all"
        @click="gameStore.resetGame"
      >
        Reiniciar Jogo
      </button>
      <p class="text-xs text-indigo-400 mt-2 tracking-widest uppercase">
        {{ currentIndex + 1 }} / {{ gameStore.cards.length }}
      </p>
    </footer>

    <!-- Partículas -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="i in 25"
        :key="i"
        class="absolute bg-blue-400/30 rounded-full animate-pulseParticle"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          animationDelay: `${Math.random() * 4}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import FlipCard from "@/components/FlipCard.vue";

const gameStore = useGameStore();
const currentIndex = ref(0);

onMounted(() => {
  if (gameStore.cards.length === 0) {
    gameStore.initializeGame();
  }
});

const currentCard = computed(() => gameStore.cards[currentIndex.value]);

function nextCard() {
  if (gameStore.cards.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % gameStore.cards.length;
  }
}

function prevCard() {
  if (gameStore.cards.length > 0) {
    currentIndex.value =
      (currentIndex.value - 1 + gameStore.cards.length) %
      gameStore.cards.length;
  }
}
</script>

<style scoped>
@keyframes rotateBg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-rotateBg {
  animation: rotateBg 30s linear infinite;
}

@keyframes pulseParticle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.6);
  }
}
.animate-pulseParticle {
  animation: pulseParticle 3s ease-in-out infinite;
}
</style>