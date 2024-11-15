<template>
  <section
    class="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
    style="background-image: url(src/assets/images/carousel-1.jpg)"
  >
    <div class="p-12 text-center bg-white shadow-lg bg-opacity-90 rounded-3xl">
      <h1 class="mb-4 text-5xl font-extrabold text-gray-800">
        Namangan Muhandislik Qurilish Instituti
      </h1>
      <p class="mb-8 text-lg text-gray-700">O'quv jarayonini boshqarish tizimi</p>
      <router-link
        to="/schedule"
        class="px-10 py-4 text-white transition duration-300 transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105"
      >
        Dars jadvali
      </router-link>
    </div>
    <div class="absolute text-sm text-gray-100 bottom-10">
      © 2024 Namangan Muhandislik Qurilish Instituti. Barcha huquqlar himoyalangan.
    </div>
  </section>
</template>

<script setup lang="ts">
// No specific logic needed for a static view.
</script>

<style scoped>
/* Full screen background style */
html,
body {
  height: 100%;
  margin: 0;
}
</style>
