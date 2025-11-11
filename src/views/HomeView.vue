<template>
  <div
    class="home-container"
    :class="{ 'opacity-0': fadingOut }"
  >
    <!-- Fundo Fixo para Desktop -->
    <div class="background"></div>
    <!-- Fundo para Mobile -->
    <div class="background-mobile"></div>

    <!-- Partículas -->
    <canvas ref="particlesCanvas" class="particles"></canvas>

    <!-- Conteúdo -->
    <div class="content">
      <h1 class="title">Drakonik Nexus!</h1>
      <button @click="startGame" class="start-button">Iniciar</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const particlesCanvas = ref(null);
const fadingOut = ref(false);
let iniciarSom;

onMounted(() => {
  iniciarSom = new Audio("/sounds/intro-sound.mp3");
  iniciarSom.volume = 0.6;

  const canvas = particlesCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1.2 + 0.5,
  }));

  const animate = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(160, 80, 255, 0.7)";
    ctx.beginPath();
    for (const p of particles) {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    }
    ctx.fill();
    requestAnimationFrame(animate);
  };

  animate();
});

const startGame = () => {
  if (iniciarSom) iniciarSom.play();
  fadingOut.value = true;
  setTimeout(() => router.push("/game"), 1500);
};
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end; 
  padding-bottom: 8vh;
  box-sizing: border-box; 
  transition: opacity 1s ease;
  position: relative;
}

.opacity-0 {
  opacity: 0;
}

.background {
  position: absolute;
  inset: 0;
  background-image: url("/images/tela-inicial.png");
  background-size: contain; 
  background-position: center; 
  background-repeat: no-repeat;
  transform-origin: center;
  z-index: 0;
  transition: transform 3s ease-out;
}

.background-mobile {
  display: none; 
  position: absolute;
  inset: 0;
  background-image: url('/images/tela-mobile.jpg');
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.particles {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
}

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
  background: rgba(0, 0, 0, 0.3);
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

/* Media Query para Responsividade */
@media (max-width: 768px) {
  .background {
    display: none; 
  }

  .background-mobile {
    display: block; 
  }

  .title {
    color: black;
    font-size: 2.5rem;
  }

  .home-container {
    padding-bottom: 12vh; /* Ajuste no espaçamento inferior para mobile */
  }
}
</style>