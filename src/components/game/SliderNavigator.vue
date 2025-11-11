<template>
    <div class="absolute inset-0 bg-[url('/images/energia-bg.png')] bg-cover bg-center opacity-20 animate-pulse">
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-indigo-950 to-black gap-10 p-4 relative overflow-hidden"
    >
      <!-- Botão Voltar -->
      <button
        class="bg-cyan-400/20 hover:bg-cyan-400/70 transition-all duration-300 rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.5)] backdrop-blur-md"
        @click="previousCard"
      >
        <img src='/images/seta.png' alt='Voltar' class="w-8 h-8 rotate-180 invert" />
      </button>
  
      <!-- CARD CENTRAL -->
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
        class="bg-cyan-400/20 hover:bg-cyan-400/70 transition-all duration-300 rounded-full w-14 h-14 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.5)] backdrop-blur-md"
        @click="nextCard"
      >
        <img src='/images/seta.png' alt='Avançar' class="w-8 h-8 invert" />
      </button>
    </div>
</template>
  
  
<script setup>
  import { computed, onMounted } from 'vue'
  import { useGameStore } from '@/stores/game'
  import FlipCard from '@/components/game/FlipCard.vue'
  
  const gameStore = useGameStore()
  
  onMounted(() => {
    gameStore.initializeGame()
  })
  
  const currentCard = computed(() => gameStore.currentCard)
  
  function handleFlip() {
    if (currentCard.value) {
      gameStore.flipCard(currentCard.value.cardId)
    }
  }
  
  function nextCard() {
    gameStore.nextCard()
  }
  
  function previousCard() {
    gameStore.previousCard()
  }
</script>  