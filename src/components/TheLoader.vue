<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="loader-container">
      <div class="loader">
        <div class="book"></div>
        <div class="book"></div>
        <div class="book"></div>
      </div>
      <p class="loading-text">Yuklanmoqda...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No specific logic needed for a static loader.
</script>

<style scoped>
.loader-container {
  text-align: center;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
}

.book {
  width: 50px;
  height: 70px;
  background-color: #4a90e2; /* University-themed color */
  border-radius: 5px;
  animation: bounce 0.6s infinite alternate;
}

.book:nth-child(2) {
  animation-delay: 0.2s;
}

.book:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-20px);
  }
}

.loading-text {
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333; /* Dark text for contrast */
  font-weight: bold;
}
</style>
