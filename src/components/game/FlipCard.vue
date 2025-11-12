<template>
  <div
    class="relative w-full aspect-[5/8] cursor-pointer [perspective:1000px]"
    :class="{ 'pointer-events-none': isMatched }"
    @click="handleClick"
  >
    <!-- Inner container for the flip effect -->
    <div
      class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
      :class="{ '[transform:rotateY(180deg)]': isFlipped || isMatched }"
    >
      <!-- Back of the card -->
      <div class="absolute w-full h-full [backface-visibility:hidden]">
        <img
          src="/images/fundo-carta.jpg"
          alt="Verso da Carta"
          class="w-full h-full object-cover rounded-lg md:rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300"
        />
      </div>

      <!-- Front of the card: Final, stable Flexbox architecture -->
      <div
        class="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg md:rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700 flex flex-col"
        :class="`bg-[url('/images/${fundo}.jpg')] bg-cover`"
      >
        <!-- 1. Header -->
        <div class="p-2 bg-gradient-to-b from-black/80 to-transparent text-white flex-shrink-0">
          <div class="flex justify-between items-start">
            <h2 class="text-sm font-bold leading-tight pr-2">{{ nome }}</h2>
            <div class="flex items-center gap-1 text-yellow-400 flex-shrink-0">
              <span class="text-xs font-bold">LV</span>
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-black text-xs font-bold">{{ nivel }}</span>
            </div>
          </div>
        </div>

        <!-- 2. Image: Increased height to better fit character art -->
        <div class="h-48 w-full border-y-2 border-slate-600 bg-black/30">
          <img :src="characterImageUrl" :alt="alt" class="w-full h-full object-cover" />
        </div>

        <!-- 3. Body: Reliably takes remaining space -->
        <div class="p-2 text-white bg-gradient-to-t from-black/80 to-transparent flex-1 flex flex-col min-h-0">
          <!-- Description container that scrolls -->
          <div class="flex-1 overflow-y-auto scrollbar-thin border-t border-slate-400/50 pt-2">
            <p class="text-xs sm:text-sm italic font-serif leading-snug">
              {{ descricao }}
            </p>
          </div>
          <!-- Stats are fixed at the bottom -->
          <div class="text-right text-sm font-semibold mt-2 flex-shrink-0">
            <span>⚔️ ATK / {{ atk }}</span>
            <span class="ml-3">🛡️ DEF / {{ def }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  cardId: { type: Number, required: true },
  nome: { type: String, required: true },
  fundo: { type: String, required: true },
  nivel: { type: Number, required: true },
  imagem: { type: String, required: true },
  alt: { type: String, required: true },
  descricao: { type: String, required: true },
  atk: { type: Number, required: true },
  def: { type: Number, required: true },
  isFlipped: { type: Boolean, required: true },
  isMatched: { type: Boolean, required: true },
});

const emit = defineEmits(['flip-card']);

const characterImageUrl = computed(() => `/images/${props.imagem}`);

function handleClick() {
  if (!props.isMatched) {
    emit('flip-card', props.cardId);
  }
}
</script>

<style scoped>
/* Custom scrollbar for Webkit browsers (Chrome, Safari) */
.scrollbar-thin::-webkit-scrollbar {
  width: 5px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: rgba(136, 192, 208, 0.5);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

/* Custom scrollbar for Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(136, 192, 208, 0.5) transparent;
}
</style>
