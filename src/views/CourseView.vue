<template>
  <section class="bg-gray-50 py-10 min-h-screen">
    <div class="max-w-2xl mx-auto mb-4">
      <BackButton />
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
import BackButton from '@/components/BackButton.vue'

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
