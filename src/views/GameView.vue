<template>
  <div class="game-container">
    <router-link to="/">Voltar para a Home</router-link>
  </div>
</template>

<script setup lang="ts">
// Lógica do jogo virá aqui
</script>

<style scoped>
.game-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #1a0033; 
  color: white;
  box-sizing: border-box;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

a {
  color: #a855f7;
  margin-top: 2rem;
  font-size: 1.2rem;
}
</style>