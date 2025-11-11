<template>
  <div
    class="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
  >
    <!-- Canvas ou partículas globais (TEMPORARIAMENTE DESATIVADO PARA TESTE) -->
    <!-- <canvas ref="particlesCanvas" class="absolute inset-0 z-0 pointer-events-none"></canvas> -->

    <!-- Slot principal -->
    <main class="w-full h-full flex items-center justify-center">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

// Lógica do canvas desativada para o teste
// const particlesCanvas = ref(null);

// onMounted(() => {
//   const canvas = particlesCanvas.value;
//   if (!canvas) return;
//   const ctx = canvas.getContext("2d");

//   const resize = () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   };
//   resize();
//   window.addEventListener("resize", resize);

//   const particles = Array.from({ length: 80 }, () => ({
//     x: Math.random() * canvas.width,
//     y: Math.random() * canvas.height,
//     r: Math.random() * 2 + 1,
//     d: Math.random() * 1.2 + 0.5,
//   }));

//   const animate = () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "rgba(160, 80, 255, 0.6)";
//     ctx.beginPath();
//     for (const p of particles) {
//       ctx.moveTo(p.x, p.y);
//       ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//       p.y += p.d;
//       if (p.y > canvas.height) {
//         p.y = 0;
//         p.x = Math.random() * canvas.width;
//       }
//     }
//     ctx.fill();
//     requestAnimationFrame(animate);
//   };

//   animate();
// });
</script>