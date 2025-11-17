<template>
  <div
    class="flex flex-col items-center justify-start w-full min-h-screen p-4 overflow-y-auto bg-gray-900/50"
  >
    <!-- Placar e Controles -->
    <div
      class="w-full max-w-6xl mb-4 p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-between shadow-lg sticky top-4 z-10"
    >
      <div class="flex gap-4 md:gap-6 text-white">
        <div class="text-center">
          <span class="text-xs text-cyan-300 uppercase font-semibold">Pontuação</span>
          <p class="text-xl md:text-2xl font-bold">{{ gameStore.score }}</p>
        </div>
        <div class="text-center">
          <span class="text-xs text-cyan-300 uppercase font-semibold">Movimentos</span>
          <p class="text-xl md:text-2xl font-bold">{{ gameStore.moves }}</p>
        </div>
        <div class="text-center">
          <span class="text-xs text-cyan-300 uppercase font-semibold">Tempo</span>
          <p 
            class="text-xl md:text-2xl font-bold transition-colors duration-300"
            :class="{ 'text-red-500 animate-pulse': gameStore.remainingTime <= 30 && gameStore.remainingTime > 0 }"
          >
            {{ formattedTime }}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button
          class="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors shadow-md"
          @click="restartGame"
        >
          Reiniciar
        </button>
        <router-link
          to="/"
          class="px-4 py-2 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-500 rounded-md transition-colors shadow-md"
        >
          Início
        </router-link>
      </div>
    </div>

    <GameBoard />

    <!-- Modal de Fim de Jogo (Vitória) -->
    <div
      v-if="gameStore.isGameOver && !gameStore.isTimeUp"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-slate-800 p-8 rounded-2xl shadow-cyan-500/20 shadow-xl text-center border-2 border-slate-700 w-full max-w-md"
      >
        <h2 class="text-4xl font-bold text-white mb-2">Parabéns!</h2>
        <p class="text-lg text-slate-300 mb-6">Você concluiu o jogo com sucesso!</p>
        <div class="flex justify-center gap-6 mb-6">
          <div class="text-center">
            <span class="text-md font-semibold text-cyan-400">PONTUAÇÃO FINAL</span>
            <p class="text-4xl font-bold text-white">{{ gameStore.score }}</p>
          </div>
          <div class="text-center">
            <span class="text-md font-semibold text-cyan-400">MOVIMENTOS</span>
            <p class="text-4xl font-bold text-white">{{ gameStore.moves }}</p>
          </div>
        </div>
        <button
          class="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300"
          @click="restartGame"
        >
          Jogar Novamente
        </button>
      </div>
    </div>

    <!-- Modal de Fim de Jogo (Tempo Esgotado) -->
    <div
      v-if="gameStore.isTimeUp"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-slate-800 p-8 rounded-2xl shadow-red-500/20 shadow-xl text-center border-2 border-slate-700 w-full max-w-md"
      >
        <h2 class="text-4xl font-bold text-red-400 mb-2">Tempo Esgotado!</h2>
        <p class="text-lg text-slate-300 mb-6">Não desanime, a velocidade vem com a prática.</p>
        <button
          class="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300"
          @click="restartGame"
        >
          Tentar Novamente
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import GameBoard from '@/components/game/GameBoard.vue';

const gameStore = useGameStore();

const restartGame = () => {
  gameStore.initializeGame();
};

const formattedTime = computed(() => {
  const minutes = Math.floor(gameStore.remainingTime / 60);
  const seconds = gameStore.remainingTime % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

</script>
