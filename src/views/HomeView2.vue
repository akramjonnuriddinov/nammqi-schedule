<template>
  <main class="relative flex items-center justify-center min-h-screen bg-white main-content">
    <!-- Flex Container for Image and Text -->
    <div class="z-10 flex flex-col items-center justify-between w-full px-8 md:flex-row">
      <!-- Left Section (Image/Animation) -->
      <div class="flex justify-center w-full mb-8 md:w-1/2 md:mb-0">
        <AppAnimation :options="defaultOptions" :width="500" :speed="1" />
      </div>

      <!-- Right Section (Text and Button) -->
      <div class="w-full text-center md:w-1/2 md:text-left">
        <img
          src="@/assets/images/logo-uz.png"
          alt="University Logo"
          class="w-20 h-20 mx-auto mb-4 md:mx-0"
        />
        <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-800">
          Namangan muhandislik-qurilish instituti
        </h1>
        <p class="mb-6 text-lg text-gray-600">
          Dars jadvali (Dasturiy ta'minot HEMIS - Oliy ta’lim jarayonlarini boshqarish axborot
          tizimi bilan integratsiya qilingan)
        </p>
        <router-link
          to="/schedule"
          class="px-8 py-2 text-lg text-white transition duration-300 transform rounded-full shadow-lg home-btn bg-gradient-to-r from-teal-400 to-blue-600 hover:shadow-xl hover:scale-105"
        >
          Boshlash
        </router-link>
      </div>
    </div>

    <!-- Background Hexagon Overlay -->
    <div class="absolute inset-0 z-0 bg-hex-pattern"></div>
  </main>
  <p class="absolute bottom-0 w-full py-2 text-center text-gray-500">
    &copy; Dasturiy ta'minot: Raqamli ta'lim texnologiyalar markazi tomonidan ishlab chiqilgan.
  </p>
</template>

<script setup lang="ts">
import AppAnimation from '@/components/AppAnimation.vue'
import AnimationJson from '@/assets/animation/Schedule2.json'

const defaultOptions = {
  loop: false, // Continuous loop
  autoplay: true,
  renderer: 'svg',
  animationData: AnimationJson
}
</script>

<style>
.home-btn {
  border-radius: 30px;
  font-weight: 500;
  padding: 12px 48px;
}

.main-content {
  background-image: url('@/assets/images/hexagons-background.png');
  background-position: 0 100%;
  background-size: contain;
  background-repeat: repeat-y;
}

.bg-hex-pattern {
  background-image: url('@/assets/images/hexagons-background.png');
  background-position: center;
  background-size: contain;
  background-repeat: repeat;
  opacity: 0.2;
}
</style>
