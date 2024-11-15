<template>
  <section class="min-h-screen py-10 bg-gray-50">
    <div class="max-w-2xl px-5 mx-auto mb-4">
      <BackButton />
    </div>
    <h1 class="mb-6 text-3xl font-bold text-center text-gray-800">Kursni tanlang</h1>
    <div>
      <div class="max-w-2xl px-5 mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(semester, index) in semesters"
            :key="semester.code"
            class="flex items-center p-4 transition-transform transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <span
              class="flex items-center justify-center w-10 h-10 mr-4 text-white bg-blue-500 rounded-full"
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
