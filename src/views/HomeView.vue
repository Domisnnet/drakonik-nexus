<template>
  <BaseLayout>
    <h1 class="title">Drakonik Nexus!</h1>
    <button @click="startGame" class="start-button">Iniciar</button>
  </BaseLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "@/layouts/BaseLayout.vue";

const router = useRouter();
const fadingOut = ref(false);
let iniciarSom;

const startGame = () => {
  iniciarSom = new Audio("/sounds/intro-sound.mp3");
  iniciarSom.volume = 0.6;
  iniciarSom.play();
  fadingOut.value = true;
  setTimeout(() => router.push("/game"), 1500);
};
</script>

<style scoped>
.title {
  font-size: 3rem;
  font-weight: 800;
  color: black;
  text-shadow: 0 0 20px rgba(128, 0, 255, 0.8);
  margin-bottom: 2rem;
  animation: fade-in 1.5s ease-out forwards;
}

.start-button {
  padding: 0.8rem 2rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  border: 2px solid #a855f7;
  border-radius: 0.75rem;
  background: rgba(0, 0, 0, 0.885);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(128, 0, 255, 0.6);
}
.start-button:hover {
  background-color: #6b21a8;
}

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
</style>