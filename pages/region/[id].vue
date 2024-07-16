<template>
  <div class="w-full min-h-screen bg-gold flex flex-col justify-start items-center">
    <NuxtLink to="/" class="fixed top-4 left-4 z-10">
      <Icon name="material-symbols:arrow-back-rounded" class="text-white drop-shadow-[0px_0px_2px_black]" size="4rem" mode="svg" />
    </NuxtLink>
    <header class="w-full h-screen relative">
      <img src="~/assets/images/regions/shrooms.png" alt="" class="w-full h-full object-cover object-center" />
      <h1 class="absolute bottom-0 w-full text-[4rem] font-sneakers-500 text-white text-center bg-gold shadow-[0_-32px_32px_32px_#DAA052]">{{ currentRegion.title }}</h1>
    </header>
    <main class="w-full p-8 flex flex-col items-center text-white gap-8">
      <div class="w-full lg:w-1/3 flex flex-col gap-4 text-justify">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro quidem ab minus sed voluptas reiciendis laboriosam, possimus excepturi quaerat odio. Nihil, non minus doloremque impedit,
          debitis quo voluptas facilis, ipsum asperiores laborum velit quia et. Ipsum voluptas porro nihil minus cupiditate facere nam, praesentium expedita soluta nemo sint obcaecati voluptatum.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro quidem ab minus sed voluptas reiciendis laboriosam, possimus excepturi quaerat odio. Nihil, non minus doloremque impedit,
          debitis quo voluptas facilis, ipsum asperiores laborum velit quia et. Ipsum voluptas porro nihil minus cupiditate facere nam, praesentium expedita soluta nemo sint obcaecati voluptatum.
        </p>
      </div>

      <div class="w-full flex flex-col items-center">
        <h2 class="text-[4vh] font-sneakers-500 text-white text-center lg:mb-32">DISCOVER THE CHARACTERS</h2>
        <div class="flex flex-col w-2/3 items-start gap-4 lg:gap-0">
          <div v-for="character in currentRegion.characters" class="w-full lg:w-2/3 flex flex-col lg:flex-row items-center lg:even:self-end lg:even:flex-row-reverse lg:-mt-32">
            <img :src="character.image" alt="" class="w-full lg:w-auto lg:h-[400px]" />
            <div class="text-justify lg:text-start">
              <h3 class="font-sneakers-500 text-[2rem] text-center lg:text-start">{{ character.name }}</h3>
              <p>{{ character.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import regionsData from "@/data/mapRegions.json";
import type { Region } from "@/types";

const route = useRoute();
const regionId: string = route.params.id as string;

const currentRegion = computed<Region>(() => {
  if (!Object.keys(regionsData).includes(regionId)) {
    throw createError({
      statusCode: 404,
      statusMessage: "This region does not exist yet !",
    });
  }
  return regionsData["4"];
  return regionsData[regionId as keyof typeof regionsData];
});
</script>

<style scoped></style>
