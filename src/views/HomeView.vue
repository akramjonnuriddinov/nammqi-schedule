<template>
  <section
    class="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
    style="
      background-image: url('https://images.unsplash.com/photo-1595489154995-75e074c8ef20?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
