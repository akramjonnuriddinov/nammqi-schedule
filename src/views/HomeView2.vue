<template>
  <main class="main-content min-h-screen flex flex-col items-center justify-center bg-white">
    <div class="relative z-10 text-center mt-10">
      <img src="@/assets/images/logo-uz.png" alt="University Logo" class="mx-auto mb-4 w-20 h-20" />
      <h1 class="text-2xl font-bold text-gray-800">Namangan Muhandislik Qurilish Instituti</h1>
      <p class="text-gray-600">Darslar jadvali</p>
    </div>

    <div class="relative z-10 mt-6">
      <router-link
        to="/schedule"
        class="home-btn bg-blue-500 text-white py-2 px-8 rounded-lg text-lg shadow-lg hover:bg-blue-600 transition"
      >
        Boshlash
      </router-link>
    </div>

    <div class="relative z-10 mt-8">
      <AppAnimation :options="defaultOptions" :width="500" :speed="1" />
    </div>
  </main>
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

<style>
.home-btn {
  border-radius: 30px;
  display: inline-block;
  font-size: 60px;
  font-weight: 600;
  margin-top: 50px;
  font-size: 24px;
  margin-top: 20px;
  padding: 10px 50px;
}

.main-content {
  background-image: url('@/assets/images/hexagons-background.png');
  background-position: 0 100%;
  background-size: contain;
  background-repeat: repeat-y;
  min-height: 100vh;
}
</style>
