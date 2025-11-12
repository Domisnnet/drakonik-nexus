<template>
  <div
    class="relative w-64 h-96 cursor-pointer [perspective:1000px]"
    :class="{ 'pointer-events-none': isMatched }"
    @click="handleClick"
  >
    <!-- Inner container for the flip effect -->
    <div
      class="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
      :class="{ '[transform:rotateY(180deg)]': isFlipped || isMatched }"
    >
      <!-- Back of the card (Visible by default) -->
      <div class="absolute w-full h-full [backface-visibility:hidden]">
        <img
          src="/images/fundo-carta.jpg"
          alt="Verso da Carta"
          class="w-full h-full object-cover rounded-2xl shadow-lg shadow-cyan-500/30"
        />
      </div>

      <!-- Front of the card (Visible when flipped) -->
      <div
        class="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700"
        :class="`bg-[url('/images/${fundo}.jpg')] bg-cover`"
      >
        <!-- Name and Level -->
        <div class="p-2 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
          <div class="flex justify-between items-center">
            <h2 class="text-sm font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pr-2">
              {{ nome }}
            </h2>
            <div class="flex items-center gap-1 text-yellow-400 flex-shrink-0">
              <span class="text-xs font-bold">LV</span>
              <span class="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-black text-xs font-bold">
                {{ nivel }}
              </span>
            </div>
          </div>
        </div>

        <!-- Character Image -->
        <div class="w-full h-40 my-1 border-y-4 border-slate-600 bg-black/30">
          <img
            :src="characterImageUrl"
            :alt="alt"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Description and Attributes -->
        <div class="p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white h-full">
           <p class="text-[10px] italic border-t border-slate-400 pt-2 mb-2 font-serif">
            {{ descricao }}
          </p>
          <div class="text-right text-xs font-semibold">
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
  cardId: Number,
  nome: String,
  fundo: String, // e.g., 'fundo-1'
  nivel: Number,
  imagem: String, // e.g., 'mechadragon.jpg' from game.ts
  alt: String,
  descricao: String,
  atk: Number,
  def: Number,
  isFlipped: Boolean,
  isMatched: Boolean,
});

const emit = defineEmits(['flip-card']);

const characterImageUrl = computed(() => {
  if (props.imagem) {
    return `/images/${props.imagem}`;
  }
  return ''; // Default or placeholder
});

function handleClick() {
    emit('flip-card', props.cardId);
}

</script>
