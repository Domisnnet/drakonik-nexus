<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { timeline } from "motion";

const transitionActive = ref(false);
let audio: HTMLAudioElement;

const triggerTransition = () => {
  transitionActive.value = true;
  timeline([[".animate-flashEnergy", { opacity: [0, 1, 0] }, { duration: 1.5 }]]);
  setTimeout(() => {
    transitionActive.value = false;
    emit("start");
  }, 1500);
};

onMounted(() => {
  audio = new Audio("/src/assets/sounds/intro-sound.mp3");
  audio.loop = true;
  audio.volume = 0.5;
  audio.play();

  document.addEventListener("global-volume-change", (e: any) => {
    if (audio) audio.volume = e.detail;
  });
  document.addEventListener("global-mute-change", (e: any) => {
    if (audio) audio.muted = e.detail;
  });
});

onBeforeUnmount(() => {
  if (audio) audio.pause();
});
</script>