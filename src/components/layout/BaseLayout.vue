<template>
    <div
      class="base-container"
      :class="{ 'opacity-0': fadingOut }"
    >
      <!-- Fundo de Dragões para Desktop -->
      <div class="desktop-background">
        <div class="dragon-left"></div>
        <div class="dragon-right"></div>
      </div>
  
      <!-- Fundo Mobile -->
      <div class="background-mobile"></div>
  
      <!-- Canvas de partículas -->
      <canvas ref="particlesCanvas" class="particles"></canvas>
  
      <!-- Slot para conteúdo dinâmico -->
      <div class="content">
        <slot />
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  
  const particlesCanvas = ref(null);
  const fadingOut = ref(false);
  
  onMounted(() => {
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
</script>
  
<style scoped>
  .base-container {
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
    background-color: #000;
  }
  
  .opacity-0 {
    opacity: 0;
  }
  
  .desktop-background {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  
  .dragon-left {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background-image: url('/images/dragon-left.png');
    background-size: cover;
    background-repeat: no-repeat;
    left: 0;
    background-position: center;
    transform: scaleX(-1);
  }
  
  .dragon-right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    background-image: url('/images/dragon-right.png');
    background-size: cover;
    background-repeat: no-repeat;
    right: 0;
    background-position: center;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  /* Responsividade */
  @media (min-width: 769px) and (max-width: 1024px) {
    .dragon-left {
      display: none;
    }
    .dragon-right {
      width: 100%;
      transform: none;
    }
  }
  
  @media (max-width: 768px) {
    .desktop-background {
      display: none;
    }
    .background-mobile {
      display: block;
    }
    .base-container {
      padding-bottom: 12vh;
    }
  }
</style>  