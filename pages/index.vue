<template>
  <div class="w-screen h-screen bg-seaBlue overflow-x-hidden">
    <Transition v-if="!animationsStore.animations.introPlayed" name="fade" mode="in-out">
      <div v-if="showIntro === 'gif'" class="fixed top-0 left-0 w-screen h-screen z-50">
        <img :src="home" alt="" class="w-full h-full object-cover object-center" />
        <button
          class="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 max-w-[340px] aspect-[3/1] z-10 border-8 border-brown rounded-full bg-beige font-sneakers-500 text-brown text-[2.5rem]"
          @click="showIntro = 'video'"
        >
          ENTER
        </button>
      </div>
      <div v-else-if="showIntro === 'video'" class="fixed top-0 left-0 w-screen h-screen z-50">
        <video preload="true" autoplay class="w-full h-full object-cover object-center opacity-100 transition-all duration-1000" @play="fadeTimeOut" @ended="introEnded" ref="videoPlayer">
          <source :src="introVideo" type="video/webm" />
        </video>
      </div>
    </Transition>
    <div class="w-screen h-full flex flex-col lg:flex-row justify-start items-center">
      <div class="shrink-0 w-screen max-h-screen lg:w-[65%] xl:w-[75%] relative">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1279 810"
          class="w-[100%] h-[100%] !cursor-default"
          ref="mapSvg"
          @wheel="panzoomWithWhels"
        >
          <image width="1279" height="810" class="h-full w-auto shadow-[0_0_32px_32px_#384E9F_inset]" :xlink:href="map"></image>
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
        <div v-if="!zoomedOnce" class="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center" @pointerdown="zoomedOnce = true" @wheel="panzoomWithWhels">
          <Icon name="material-symbols:pan-zoom-rounded" class="text-white animate-pulse lg:hidden" size="4rem" />
          <p class="text-white hidden lg:block">Use ctrl + scroll to zoom the map</p>
        </div>
      </div>
      <div class="w-full lg:h-full lg:w-[35%] xl:w-[25%] bg-seaBlue shadow-[0_0_32px_32px_#384E9F] lg:pr-8 py-8 px-[5%] relative z-10" ref="regionsInfosDiv">
        <div class="w-full h-full overflow-auto border-8 border-brown rounded-3xl bg-beige p-4 text-center flex flex-col justify-start items-center">
          <h1 class="text-gold font-sneakers-500 text-[2.5rem] break-words">{{ currentRegion.title }}</h1>
          <div class="w-full h-[2px] bg-brown rounded-full my-4"></div>
          <p class="text-brown font-sneakers-500 text-[1.25rem] grow">
            Obojima is a brand new 250+ page campaign setting for 5E. Guide your players through breathtaking locations, encounter strange spirits, discover rare oddities, and battle wild and wondrous
            creatures. Create your own unforgettable narrative in this new, yet familiar world with an all-new collection of curious items, magical spells, and numerous player options.
          </p>
          <NuxtLink
            :to="`/region/${currentRegionKey}`"
            class="aspect-[4/1] w-1/2 lg:w-full border-8 border-brown rounded-full bg-gold font-sneakers-500 text-brown lg:text-[2rem] flex justify-center items-center mt-8"
            @click="showIntro = 'video'"
          >
            LEARN MORE
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";
import introVideo from "@/assets/videos/obojimaIntroTrimWebm.webm";
import map from "@/assets/images/obojimaMapResized.png";
import home from "@/assets/images/home.jpg";
import regionsData from "@/data/mapRegions.json";
import type { Region } from "@/types";
const animationsStore = useAnimationsStore();

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

const regionsInfosDiv = ref<HTMLDivElement>();

const introEnded = () => {
  showIntro.value = false;
  animationsStore.animations.introPlayed = true;
};

const panZoomOptions = {
  contain: "outside",
  step: 1,
  maxScale: 6,
  panOnlyWhenZoomed: true,
  handleStartEvent: () => {},
};

const zoomedOnce = ref(false);

const mapSvg = ref<HTMLDivElement>();
const panzoom = ref<PanzoomObject>();

const panzoomWithWhels = (e: WheelEvent) => {
  const { ctrlKey } = e;
  if (!ctrlKey || !panzoom.value) return;
  panzoom.value.zoomWithWheel(e);
  if (!zoomedOnce.value) zoomedOnce.value = true;
};
onMounted(() => {
  if (!mapSvg.value) return;
  panzoom.value = Panzoom(mapSvg.value, panZoomOptions);
});
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
