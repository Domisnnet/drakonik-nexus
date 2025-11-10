
<template>
    <div class="w-72 h-[500px] perspective-1000 cursor-pointer" @click="handleClick">
      <div class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d" :class="{ 'rotate-y-180': cardState === 'flipped' }">
        <div class="absolute inset-0 backface-hidden rounded-lg overflow-hidden" :style="backStyle"></div>
  
        <div class="absolute inset-0 backface-hidden rounded-lg flex flex-col p-3 gap-2" :class="fundo" :style="frontStyle">
          <h2 class="text-sm uppercase bg-gradient-to-r from-yellow-200 to-yellow-300 border border-yellow-700 rounded px-2 text-black text-center">{{ alt }}</h2>
  
          <div class="flex justify-end gap-1 mr-2">
            <span v-for="n in nivel" :key="n">⭐</span>
          </div>
  
          <img :src="contentUrl" :alt="alt" class="w-full max-w-[275px] self-center border-4 border-yellow-700 rounded"/>
  
          <div class="mt-2 bg-gradient-to-r from-yellow-200 to-yellow-300 border-2 border-yellow-700 text-black p-2 rounded flex flex-col flex-1 min-h-0">
            <p class="descricao overflow-y-auto text-sm flex-1">{{ descricao }}</p>
            <div class="flex justify-end gap-6 font-bold text-sm mt-2">
              <span>ATK/ {{ atk }}</span>
              <span>DEF/ {{ def }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue'
  
  const props = defineProps<{
    fundo?: string
    cardState?: 'default' | 'flipped'
    contentUrl?: string
    alt?: string
    nivel?: number
    descricao?: string
    atk?: number
    def?: number
}>()
  
  const emit = defineEmits<{
    (e: 'click-event'): void
}>()
  
  function handleClick() {
    emit('click-event')
}
  
  const backStyle = computed(() => ({
    backgroundImage: `url('/images/fundo-carta.jpg')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transform: 'rotateY(180deg) scale(1.2)'
}))
  
  const frontStyle = computed(() => ({}))
</script>
  
<style scoped>
  .perspective-1000 { perspective: 1000px; }
  .transform-style-preserve-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  
  /* Scrollbar styling */
.descricao::-webkit-scrollbar { width: 8px; }
.descricao::-webkit-scrollbar-thumb { background: #c08057; border-radius: 10px; }
</style>  