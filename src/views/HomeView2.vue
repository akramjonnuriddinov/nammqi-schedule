<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white">
    <div class="absolute inset-0">
      <img
        src="@/assets/images/hexagons-background.png"
        alt="Background"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="relative z-10 text-center mt-10">
      <img src="@/assets/images/logo-uz.png" alt="University Logo" class="mx-auto mb-4 w-20 h-20" />
      <h1 class="text-2xl font-bold text-gray-800">Namangan Muhandislik Qurilish Instituti</h1>
      <p class="text-gray-600">Darslar jadvali</p>
    </div>

    <div class="relative z-10 mt-6">
      <router-link
        to="/schedule"
        class="bg-blue-500 text-white py-2 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-600 transition"
      >
        Boshlash
      </router-link>
    </div>

    <div class="relative z-10 mt-8">
      <AppAnimation :options="defaultOptions" :width="500" :speed="2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppAnimation from '@/components/AppAnimation.vue'
import AnimationJson from '@/assets/animation/Schedule2.json'

const defaultOptions = {
  loop: false,
  autoplay: true,
  renderer: 'svg',
  animationData: AnimationJson
}
</script>
