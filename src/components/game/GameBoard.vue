<template>
  <div class="w-full max-w-5xl mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6 bg-slate-800/50 p-4 rounded-xl shadow-lg border border-slate-700">
      <div class="flex gap-6">
        <div class="text-center">
          <span class="text-sm font-semibold text-cyan-400">PONTUAÇÃO</span>
          <p class="text-3xl font-bold text-white">{{ game.score }}</p>
        </div>
        <div class="text-center">
          <span class="text-sm font-semibold text-cyan-400">MOVIMENTOS</span>
          <p class="text-3xl font-bold text-white">{{ game.moves }}</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button
          @click="game.initializeGame"
          class="px-6 py-2 bg-cyan-600 text-white font-bold rounded-lg shadow-md hover:bg-cyan-700 transition-colors duration-300"
        >
          Reiniciar
        </button>
        <router-link to="/">
          <button class="px-6 py-2 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 transition-colors duration-300">
            Início
          </button>
        </router-link>
      </div>
    </div>

    <!-- Grade do jogo: Atualizada para 4 colunas -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <FlipCard
        v-for="card in game.cards"
        :key="card.id"
        :id="card.id"
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
        @flip-card="game.flipCard"
      />
    </div>

    <!-- Modal - Game Over -->
    <div v-if="game.isGameOver" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-slate-800 p-8 rounded-2xl shadow-cyan-500/20 shadow-xl text-center border-2 border-slate-700">
        <h2 class="text-4xl font-bold text-white mb-2">Parabéns!</h2>
        <p class="text-lg text-slate-300 mb-6">Você concluiu o jogo com sucesso!</p>
        <div class="flex justify-center gap-6 mb-6">
            <div class="text-center">
                <span class="text-md font-semibold text-cyan-400">PONTUAÇÃO FINAL</span>
                <p class="text-4xl font-bold text-white">{{ game.score }}</p>
            </div>
            <div class="text-center">
                <span class="text-md font-semibold text-cyan-400">MOVIMENTOS</span>
                <p class="text-4xl font-bold text-white">{{ game.moves }}</p>
            </div>
        </div>
        <button @click="game.initializeGame" class="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300">
          Jogar Novamente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameStore } from '../../stores/game';
import FlipCard from './FlipCard.vue';

const game = useGameStore();

onMounted(() => {
  game.initializeGame();
});
</script>