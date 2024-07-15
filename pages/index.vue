<template>
  <div class="w-screen h-screen bg-seaBlue">
    <Transition name="fade" mode="in-out">
      <!-- <video v-if="showIntro === 'gif'" autoplay class="fixed top-0 left-0 h-full w-full object-cover opacity-100 transition-all duration-1000" @click="showIntro = 'video'" loop muted preload="true">
        <source :src="introLoop" type="video/webm" />
      </video> -->
      <div v-if="showIntro === 'gif'" class="fixed top-0 left-0 w-full h-full">
        <img :src="home" alt="" class="w-full h-full object-cover" />
        <button
          class="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[120px] z-10 border-8 border-brown rounded-full bg-beige font-sneakers-500 text-brown text-[2.5rem]"
          @click="showIntro = 'video'"
        >
          ENTER
        </button>
      </div>
      <video
        v-else-if="showIntro === 'video'"
        preload="true"
        autoplay
        class="fixed top-0 left-0 h-full w-full object-cover opacity-100 transition-all duration-1000"
        @play="fadeTimeOut"
        @ended="showIntro = false"
        ref="videoPlayer"
      >
        <source :src="introVideo" type="video/webm" />
      </video>
    </Transition>
    <div class="w-screen h-full flex">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1279 810" class="shrink-0">
        <image width="1279" height="810" class="h-full w-auto" :xlink:href="map"></image>
        <rect x="0" y="0" fill="transparent" width="388" height="88" class="cursor-pointer" @click="currentRegionKey = '0'"></rect>
        <circle cx="207" cy="535" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '29'"></circle>
        <circle cx="443" cy="325" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '7'"></circle>
        <circle cx="458" cy="199" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '6'"></circle>
        <circle cx="452" cy="110" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '25'"></circle>
        <circle cx="476" cy="110" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '28'"></circle>
        <circle cx="616" cy="125" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '22'"></circle>
        <circle cx="496" cy="255" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '2'"></circle>
        <circle cx="584" cy="235" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '21'"></circle>
        <circle cx="666" cy="214" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '23'"></circle>
        <circle cx="761" cy="99" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '24'"></circle>
        <circle cx="753" cy="144" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '27'"></circle>
        <circle cx="453" cy="422" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '3'"></circle>
        <circle cx="524" cy="610" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '4'"></circle>
        <circle cx="531" cy="741" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '1'"></circle>
        <circle cx="590" cy="690" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '8'"></circle>
        <circle cx="648" cy="542" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '10'"></circle>
        <circle cx="695" cy="426" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '11'"></circle>
        <circle cx="618" cy="418" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '12'"></circle>
        <circle cx="577" cy="480" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '9'"></circle>
        <circle cx="916" cy="117" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '26'"></circle>
        <circle cx="852" cy="228" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '17'"></circle>
        <circle cx="821" cy="342" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '20'"></circle>
        <circle cx="916" cy="372" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '18'"></circle>
        <circle cx="1073" cy="490" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '16'"></circle>
        <circle cx="1104" cy="342" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '19'"></circle>
        <circle cx="870" cy="526" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '15'"></circle>
        <circle cx="794" cy="542" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '14'"></circle>
        <circle cx="872" cy="656" r="10" fill="transparent" class="cursor-pointer" @click="currentRegionKey = '13'"></circle>
      </svg>
      <div class="grow max-w-[24%] bg-[#384E9F] shadow-[0_0_32px_32px_#384E9F] pr-8 py-8">
        <div class="w-full h-full border-8 border-brown rounded-3xl bg-beige p-4 text-center flex flex-col justify-start items-center">
          <h1 class="text-gold font-sneakers-500 text-[2.5rem] break-words">{{ currentRegion.title }}</h1>
          <div class="w-full h-[2px] bg-brown rounded-full my-4"></div>
          <p class="text-brown font-sneakers-500 text-[1.25rem] grow">
            Obojima is a brand new 250+ page campaign setting for 5E. Guide your players through breathtaking locations, encounter strange spirits, discover rare oddities, and battle wild and wondrous
            creatures. Create your own unforgettable narrative in this new, yet familiar world with an all-new collection of curious items, magical spells, and numerous player options.
          </p>
          <NuxtLink :to="`/region/${currentRegionKey}`" class="w-full h-[80px] border-8 border-brown rounded-full bg-gold font-sneakers-500 text-brown text-[2.5rem]" @click="showIntro = 'video'">
            LEARN MORE
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import introVideo from "@/assets/videos/obojimaIntroTrimWebm.webm";
import map from "@/assets/images/obojimaMapResized.png";
import home from "@/assets/images/home.jpg";
import regionsData from "@/data/mapRegions.json";
import type { Region } from "@/types.ts";

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

const currentRegionKey = ref<keyof typeof regionsData>("0");
const currentRegion = computed<Region>(() => regionsData[currentRegionKey.value]);
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
