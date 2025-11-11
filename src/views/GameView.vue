<template>
  <div
    class="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
  >
    <!-- EFEITO DE ENERGIA GIRANDO (igual HomeView.vue) -->
    <div class="absolute inset-0 animate-rotateBg opacity-40">
      <div
        class="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.3)_0%,rgba(0,0,0,0.2)_70%,transparent_100%)] blur-3xl"> </div>
      </div>

    <!-- CONTEÚDO DO JOGO -->
    <div
      class="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 md:px-12"
    >
      <!-- TÍTULO -->
      <h1
        class="text-4xl md:text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
      >
        Drakonik Nexus!
      </h1>

      <!-- SLIDER DE CARTAS -->
      <SliderNavigator />

      <!-- BOTÃO DE VOLTAR AO MENU -->
      <div class="mt-10">
        <router-link
          to="/"
          class="px-6 py-3 bg-transparent border-2 border-purple-500 rounded-xl text-lg font-semibold text-purple-300 hover:bg-purple-500 hover:text-white transition-all duration-300"
        >
          Voltar ao Início
        </router-link>
      </div>
    </div>

    <!-- PARTÍCULAS FLUTUANTES (opcional, estilo Home) -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="n in 20"
        :key="n"
        class="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
        :style="{
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import SliderNavigator from '@/components/ui/SliderNavigator.vue'
</script>

<style>
@keyframes rotateBg {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.05);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
.animate-rotateBg {
  animation: rotateBg 40s linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.8;
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>