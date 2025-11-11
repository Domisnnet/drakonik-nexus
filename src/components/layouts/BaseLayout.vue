<template>
  <div
    class="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black"
  >
    <!-- Canvas de partículas -->
    <canvas
      ref="particlesCanvas"
      class="absolute inset-0 w-full h-full pointer-events-none z-0"
    ></canvas>

    <!-- Slot do conteúdo -->
    <div class="relative z-10 w-full h-full flex flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const particlesCanvas = ref(null);

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