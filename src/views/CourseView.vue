<template>
  <section class="bg-gray-50 py-10 min-h-screen">
    <!-- Go Back Button -->
    <div class="max-w-2xl mx-auto mb-4">
      <button
        @click="$router.go(-1)"
        class="inline-flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transition transform hover:scale-105 duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Orqaga
      </button>
    </div>
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Kursni tanlang</h1>
    <div>
      <div class="max-w-2xl mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(semester, index) in semesters"
            :key="semester.code"
            class="bg-white shadow-md rounded-lg p-4 flex items-center transition-transform transform hover:scale-105"
          >
            <span
              class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4"
            >
              {{ index + 1 }}
            </span>
            <router-link
              :to="{
                name: 'groups',
                params: {
                  id: semester.code,
                  sendId: sendId
                }
              }"
              class="text-lg font-semibold text-blue-500 hover:text-blue-700"
            >
              {{ semester.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)
const sendId = route.params.id

const semesters = [
  {
    code: 11,
    name: '1-kurs'
  },
  {
    code: 13,
    name: '2-kurs'
  },
  {
    code: 15,
    name: '1-kurs'
  },
  {
    code: 17,
    name: '4-kurs'
  }
]
</script>
