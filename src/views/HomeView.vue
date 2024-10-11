<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
    style="
      background-image: url('https://images.pexels.com/photos/196650/pexels-photo-196650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    "
  >
    <div class="bg-white bg-opacity-90 p-12 rounded-3xl shadow-lg text-center">
      <h1 class="text-5xl font-extrabold text-gray-800 mb-4">
        Namangan Muhandislik Qurilish Instituti
      </h1>
      <p class="text-lg text-gray-700 mb-8">O'quv jarayonini boshqarish tizimi</p>
      <router-link
        to="/schedule"
        class="px-10 py-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
      >
        Dars jadvali
      </router-link>
    </div>
    <div class="absolute bottom-10 text-gray-900 text-sm">
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
