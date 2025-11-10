<template>
  <div class="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-b from-[#0d001a] to-black text-white">
    <!-- Fundo animado -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black animate-pulse"></div>
      <div class="absolute w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(128,0,255,0.15)_0%,transparent_70%)] animate-spin-slow"></div>
    </div>

    <!-- Personagem emergindo das sombras -->
    <img
      src="/images/tela-inicial.jpg"
      alt="Personagem Drakonik Nexus!"
      class="absolute bottom-0 object-contain w-full max-w-5xl opacity-0 animate-characterFade"
    />

    <!-- Título -->
    <h1 class="text-6xl md:text-7xl font-bold tracking-widest z-10 animate-titlePulse drop-shadow-[0_0_20px_rgba(128,0,255,0.6)]">
      DRAKONIK NEXUS!
    </h1>

    <!-- Menu -->
    <div class="flex flex-col items-center gap-4 mt-10 z-10 animate-menuFade">
      <button class="menu-btn">Iniciar</button>
      <button class="menu-btn">Cartas</button>
      <button class="menu-btn">Configurações</button>
      <button class="menu-btn">Sobre</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nenhuma lógica JS por enquanto — apenas visual
</script>

<style scoped>
/* Fundo girando lentamente */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 60s linear infinite;
}

/* Personagem surgindo das sombras */
@keyframes characterFade {
  0% {
    opacity: 0;
    transform: scale(1.05);
    filter: blur(10px);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
    filter: blur(0);
  }
}
.animate-characterFade {
  animation: characterFade 2.5s ease-out 1s forwards;
}

/* Título com brilho pulsante */
@keyframes titlePulse {
  0%, 100% {
    text-shadow: 0 0 25px rgba(128, 0, 255, 0.7), 0 0 45px rgba(128, 0, 255, 0.4);
  }
  50% {
    text-shadow: 0 0 45px rgba(200, 100, 255, 1), 0 0 70px rgba(128, 0, 255, 0.8);
  }
}
.animate-titlePulse {
  animation: titlePulse 3s ease-in-out infinite;
}

/* Menu aparecendo com atraso */
@keyframes menuFade {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-menuFade {
  animation: menuFade 1.5s ease-out 3s forwards;
}

/* Botões do menu */
.menu-btn {
  @apply px-8 py-3 border-2 border-purple-500/70 text-lg tracking-widest rounded-xl bg-transparent text-white transition-all duration-500;
}
.menu-btn:hover {
  @apply border-purple-400 bg-purple-600/20 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-105;
}
</style>