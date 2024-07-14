<template>
  <div class="w-screen h-screen bg-[#384E9F]">
    <Transition name="fade" mode="in-out">
      <img v-if="showIntro === 'gif'" :src="introGif" alt="" class="fixed top-0 left-0 w-full h-full" @click="showIntro = 'video'" />
      <video
        v-else-if="showIntro === 'video'"
        autoplay
        class="fixed top-0 left-0 h-full w-full object-cover opacity-100 transition-all duration-1000"
        @play="fadeTimeOut"
        @ended="showIntro = false"
        ref="videoPlayer"
      >
        <source :src="introVideo" type="video/webm" />
      </video>
    </Transition>
    <div class="w-full h-full flex" @click="showIntro = 'gif'">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1279 810" class="shrink-0">
        <image width="1279" height="810" class="h-full w-auto" :xlink:href="map"></image>
        <a xlink:href="29">
          <circle cx="207" cy="535" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="7">
          <circle cx="443" cy="325" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="6">
          <circle cx="458" cy="199" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="25">
          <circle cx="452" cy="110" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="28">
          <circle cx="476" cy="110" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="22">
          <circle cx="616" cy="125" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="2">
          <circle cx="496" cy="255" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="21">
          <circle cx="584" cy="235" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="23">
          <circle cx="666" cy="214" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="24">
          <circle cx="761" cy="99" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="27">
          <circle cx="753" cy="144" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="3">
          <circle cx="454" cy="423" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="4">
          <circle cx="524" cy="610" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="1">
          <circle cx="531" cy="741" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="8">
          <circle cx="589" cy="690" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="10">
          <circle cx="648" cy="542" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="11">
          <circle cx="695" cy="426" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="12">
          <circle cx="618" cy="418" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="9">
          <circle cx="577" cy="480" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="26">
          <circle cx="916" cy="117" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="17">
          <circle cx="852" cy="228" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="20">
          <circle cx="821" cy="342" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="18">
          <circle cx="916" cy="372" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="16">
          <circle cx="1073" cy="490" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="19">
          <circle cx="1104" cy="342" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="15">
          <circle cx="870" cy="526" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="14">
          <circle cx="794" cy="542" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
        <a xlink:href="13">
          <circle cx="872" cy="656" r="10" fill="transparent" opacitcy="0"></circle>
        </a>
      </svg>
      <div class="grow bg-[#384E9F] shadow-[0_0_32px_32px_#384E9F] pr-8 py-8">
        <div class="w-full h-full border-8 border-brown rounded-3xl bg-beige p-4 text-center">
          <h1 class="text-gold font-sneakers-500 text-[2.5rem]">Obojima</h1>
          <p class="text-brown font-sneakers-500 text-[1.25rem]">
            Obojima is a brand new 250+ page campaign setting for 5E. Guide your players through breathtaking locations, encounter strange spirits, discover rare oddities, and battle wild and wondrous
            creatures. Create your own unforgettable narrative in this new, yet familiar world with an all-new collection of curious items, magical spells, and numerous player options.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import introVideo from "@/assets/videos/obojimaIntroTrim.webm";
import map from "@/assets/images/obojimaMapResized.png";
import introGif from "@/assets/images/ObojimaGifCompressed.gif";

const showIntro = ref<"gif" | "video" | false>("gif");
const videoPlayer = ref<HTMLVideoElement>();
const fadeTimeOut = () => {
  console.log("fadeTimeOut");
  setTimeout(() => {
    if (videoPlayer.value) {
      videoPlayer.value.style.opacity = "0";
    }
  }, 5320);
};
watch(showIntro, (newVal) => {
  if (newVal === "video") fadeTimeOut();
});
const mutedVideo = ref(true);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter-from,
.fade-leave-to,
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>
