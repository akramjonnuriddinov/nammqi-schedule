<template>
  <button
    @click="$router.go(-1)"
    class="inline-flex items-center justify-center px-6 py-3 font-bold text-white transition duration-300 ease-in-out transform rounded-full shadow-md bg-primary hover:bg-primary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary max-md:mb-5"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="w-5 h-5 mr-2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Orqaga
  </button>
</template>
