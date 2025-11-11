<template>
  <BaseLayout>
    <div
      class="relative flex flex-col items-center justify-end h-full w-full pb-[8vh] text-center overflow-hidden"
    >
      <!-- Fundo de Dragões (apenas Home) -->
      <div class="absolute inset-0 z-0 hidden md:flex">
        <div
          class="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-left.png')] bg-cover bg-center bg-no-repeat transform -scale-x-100 opacity-90"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-right.png')] bg-cover bg-center bg-no-repeat opacity-90"
        ></div>
      </div>

      <!-- Fundo Mobile -->
      <div
        class="absolute inset-0 z-0 md:hidden bg-[url('/images/tela-mobile.jpg')] bg-cover bg-center bg-no-repeat"
      ></div>

      <!-- Conteúdo -->
      <div class="relative z-10 animate-fade-in flex flex-col items-center">
        <h1
          class="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(128,0,255,0.8)] mb-8"
        >
          Drakonik Nexus!
        </h1>
        <button
          @click="startGame"
          class="px-8 py-3 text-xl font-semibold text-white border-2 border-purple-500 rounded-xl bg-black/80 shadow-[0_0_10px_rgba(128,0,255,0.6)] transition hover:bg-purple-800 hover:shadow-[0_0_20px_rgba(128,0,255,0.9)]"
        >
          Iniciar
        </button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseLayout from "@/components/layouts/BaseLayout.vue";

const router = useRouter();

const startGame = () => {
  const iniciarSom = new Audio("/sounds/intro-sound.mp3");
  iniciarSom.volume = 0.6;
  iniciarSom.play();
  setTimeout(() => router.push("/game"), 1500);
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}
</style>