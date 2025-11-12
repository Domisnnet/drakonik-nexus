<template>
  <div class="flex flex-col items-center justify-center w-full h-full text-center text-white p-4">
    
    <!-- Título Principal -->
    <h1 class="text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
      Drakonik Nexus
    </h1>
    <p class="max-w-2xl mb-8 text-slate-300">
      Explore a coleção de cartas abaixo e, quando estiver pronto, clique em "Iniciar Jogo" para testar sua memória.
    </p>

    <!-- Slider Navigator -->
    <div class="mb-8 w-full flex items-center justify-center">
      <SliderNavigator />
    </div>

    <!-- Botão para Iniciar o Jogo -->
    <router-link 
      to="/game"
      class="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
    >
      Iniciar Jogo
    </router-link>

  </div>
</template>

<script setup lang="ts">
import SliderNavigator from '@/components/ui/SliderNavigator.vue';
</script>
