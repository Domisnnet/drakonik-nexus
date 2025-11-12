<template>
  <div
    class="w-full h-screen bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: 'url(/images/fundo-space.jpg)' }"
  >
    <router-view />
  </div>
</template>

<script setup lang="ts">
// O App.vue é o ponto de entrada principal e apenas renderiza a rota atual.
// O fundo é aplicado aqui para ser consistente em todas as páginas.
</script>
