<template>
  <main class="main-content min-h-screen flex items-center justify-center bg-white relative">
    <!-- Flex Container for Image and Text -->
    <div class="flex flex-col md:flex-row items-center justify-between w-full px-8 z-10">
      <!-- Left Section (Image/Animation) -->
      <div class="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <AppAnimation :options="defaultOptions" :width="500" :speed="1" />
      </div>

      <!-- Right Section (Text and Button) -->
      <div class="w-full md:w-1/2 text-center md:text-left">
        <img
          src="@/assets/images/logo-uz.png"
          alt="University Logo"
          class="mx-auto md:mx-0 mb-4 w-20 h-20"
        />
        <h1 class="text-3xl mb-4 font-extrabold text-gray-800 leading-tight">
          Namangan Muhandislik Qurilish Instituti
        </h1>
        <p class="text-gray-600 text-lg mb-6">Darslar jadvali</p>
        <router-link
          to="/schedule"
          class="home-btn bg-gradient-to-r from-teal-400 to-blue-600 text-white py-2 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
        >
          Boshlash
        </router-link>
      </div>
    </div>

    <!-- Background Hexagon Overlay -->
    <div class="absolute inset-0 bg-hex-pattern z-0"></div>
  </main>
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

fetch('http://localhost:3000/api/schedule')
  .then((response) => response.json())
  .then((data) => {
    console.log('Schedule data:', data)
    // Use the data in your frontend
  })
  .catch((error) => {
    console.error('Error fetching schedule data:', error)
  })
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
