<template>
  <div class="w-full min-h-screen bg-gold flex flex-col justify-start items-center">
    <header class="w-full">
      <img src="~/assets/images/regions/shrooms.png" alt="" class="w-full h-[85vh] object-cover" />
      <div class="w-full shadow-[0_0_32px_32px_#DAA052]">
        <div class="w-full h-[15vh]">
          <h1 class="text-[8vh] font-sneakers-500 text-white text-center">{{ currentRegion.title }}</h1>
        </div>
      </div>
    </header>
    <main class="w-full p-8 flex flex-col items-center text-white gap-8">
      <div class="w-1/3 flex flex-col gap-4 text-justify">
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
        <h2 class="text-[4vh] font-sneakers-500 text-white text-center">DISCOVER THE CHARACTERS</h2>
        <div class="flex flex-col gap-0 w-2/3 items-start">
          <div v-for="character in currentRegion.characters" class="w-2/3 flex items-center even:self-end even:flex-row-reverse">
            <img :src="character.image" alt="" class="h-[300px]" />
            <div>
              <h3 class="font-sneakers-500 text-[2rem]">{{ character.name }}</h3>
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
  return regionsData[regionId as keyof typeof regionsData];
});
</script>

<style scoped></style>
