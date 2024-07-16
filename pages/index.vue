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
      <div class="shrink-0 w-screen max-h-screen relative">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1279 810"
          class="w-screen h-screen !cursor-grab shadow-[0_0_1028px_1028px_#384E9F_inset]"
          ref="mapSvg"
          @wheel="panzoomWithWhels"
        >
          <image width="1279" height="810" class="imgShadow" :xlink:href="map"></image>
          <rect x="0" y="0" fill="transparent" width="388" height="88" class="cursor-pointer" @click="selectOrUnselectRegion('0')"></rect>
          <circle cx="207" cy="535" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('29')"></circle>
          <circle cx="443" cy="325" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('7')"></circle>
          <circle cx="458" cy="199" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('6')"></circle>
          <circle cx="452" cy="110" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('25')"></circle>
          <circle cx="476" cy="110" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('28')"></circle>
          <circle cx="616" cy="125" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('22')"></circle>
          <circle cx="496" cy="255" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('2')"></circle>
          <circle cx="584" cy="235" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('21')"></circle>
          <circle cx="666" cy="214" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('23')"></circle>
          <circle cx="761" cy="99" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('24')"></circle>
          <circle cx="753" cy="144" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('27')"></circle>
          <circle cx="453" cy="422" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('3')"></circle>
          <circle cx="524" cy="610" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('4')"></circle>
          <circle cx="531" cy="741" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('1')"></circle>
          <circle cx="590" cy="690" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('8')"></circle>
          <circle cx="648" cy="542" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('10')"></circle>
          <circle cx="695" cy="426" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('11')"></circle>
          <circle cx="618" cy="418" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('12')"></circle>
          <circle cx="577" cy="480" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('9')"></circle>
          <circle cx="916" cy="117" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('26')"></circle>
          <circle cx="852" cy="228" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('17')"></circle>
          <circle cx="821" cy="342" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('20')"></circle>
          <circle cx="916" cy="372" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('18')"></circle>
          <circle cx="1073" cy="490" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('16')"></circle>
          <circle cx="1104" cy="342" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('19')"></circle>
          <circle cx="870" cy="526" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('15')"></circle>
          <circle cx="794" cy="542" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('14')"></circle>
          <circle cx="872" cy="656" r="15" fill="transparent" class="cursor-pointer" @click="selectOrUnselectRegion('13')"></circle>
        </svg>
        <div
          v-if="!animationsStore.animations.zoomedOnce"
          class="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center cursor-grab"
          @pointerdown="animationsStore.animations.zoomedOnce = true"
          @touchstart="animationsStore.animations.zoomedOnce = true"
          @wheel="panzoomWithWhels"
        >
          <Icon name="material-symbols:pan-zoom-rounded" class="text-white animate-pulse lg:hidden" size="4rem" />
          <p class="text-white hidden lg:block">Use scroll to zoom the map</p>
        </div>
      </div>
      <Transition name="slideIn">
        <div v-if="currentRegion" class="w-full fixed bottom-0 xl:right-4 xl:h-full xl:w-[25vw] py-8 z-10 flex justify-center" ref="regionsInfosDiv">
          <div class="w-full lg:w-1/2 xl:w-full h-full overflow-auto border-8 border-brown rounded-3xl bg-beige p-4 pt-10 text-center flex flex-col justify-start items-center relative">
            <button class="absolute top-0 right-0" @click="currentRegionKey = undefined">
              <Icon name="material-symbols:close-small-outline-rounded" class="text-gold h-16 w-16" />
            </button>
            <h1 class="text-gold font-sneakers-500 text-[1.5rem] xl:text-[2.5rem] break-words">{{ currentRegion.title }}</h1>
            <div class="w-full h-[2px] bg-brown rounded-full my-4"></div>
            <p class="text-brown font-sneakers-500 text-[1.25rem] grow hidden xl:block">
              Obojima is a brand new 250+ page campaign setting for 5E. Guide your players through breathtaking locations, encounter strange spirits, discover rare oddities, and battle wild and
              wondrous creatures. Create your own unforgettable narrative in this new, yet familiar world with an all-new collection of curious items, magical spells, and numerous player options.
            </p>
            <NuxtLink
              :to="`/region/${currentRegionKey}`"
              class="aspect-[4/1] w-1/2 xl:w-full border-8 border-brown rounded-full bg-gold font-sneakers-500 text-brown lg:text-[2rem] flex justify-center items-center mt-8"
              @click="showIntro = 'video'"
            >
              LEARN MORE
            </NuxtLink>
          </div>
        </div>
      </Transition>
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

const currentRegionKey = ref<keyof typeof regionsData>();
const currentRegion = computed<Region | undefined>(() => (currentRegionKey.value ? regionsData[currentRegionKey.value] : undefined));
const selectOrUnselectRegion = (regionKey: keyof typeof regionsData) => {
  if (currentRegionKey.value === regionKey) currentRegionKey.value = undefined;
  else currentRegionKey.value = regionKey;
};

const regionsInfosDiv = ref<HTMLDivElement>();

const introEnded = () => {
  showIntro.value = false;
  animationsStore.animations.introPlayed = true;
};

const panZoomOptions = {
  contain: "outside",
  step: 1,
  // startScale: 2,
  maxScale: 6,
  handleStartEvent: () => {},
};

const mapSvg = ref<HTMLDivElement>();
const panzoom = ref<PanzoomObject>();

const panzoomWithWhels = (e: WheelEvent) => {
  // const { ctrlKey } = e;
  // if (!ctrlKey || !panzoom.value) return;
  panzoom.value?.zoomWithWheel(e);
  if (!animationsStore.animations.zoomedOnce) animationsStore.animations.zoomedOnce = true;
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
.fade-leave-to {
  opacity: 0;
}
.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 0.5s;
}

.slideIn-enter-from,
.slideIn-leave-to {
  transform: translateY(100%);
}
@media (min-width: 1024px) {
  .slideIn-enter-from,
  .slideIn-leave-to {
    transform: translateX(100%);
  }
}

.imgShadow::after {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 10px 10px rgba(246, 218, 33, 1);
}
</style>
