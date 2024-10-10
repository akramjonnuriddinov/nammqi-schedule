<template>
  <section>
    <h1 class="bg-slate-800 text-3xl text-center text-white py-5 w-full">
      Fakultetingizni tanlang
    </h1>
    <div v-if="loading" class="container mx-auto max-w-6xl text-3xl py-4">Loading...</div>
    <div v-else>
      <div v-if="data" class="container mx-auto max-w-6xl">
        <!-- {{ data?.data?.items }} -->
        <ul class="flex flex-col gap-5 py-10 text-lg">
          <li
            v-for="(data, index) in data?.data?.items"
            :key="data.id"
            class="bg-slate-900 rounded-md flex items-center text-white"
          >
            <span class="p-5 bg-slate-800 rounded-tl-md rounded-bl-md block w-[5%]">
              {{ index + 1 }}</span
            >
            <router-link
              :to="{
                name: 'groups',
                params: {
                  id: data.id
                }
              }"
              class="px-4 hover:text-gray-400 transition-colors"
            >
              {{ data.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

// Use the proxied API URL
const apiURL = '/api/rest/v1/data/department-list?limit=200&_structure_type=11'
const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca' // Replace with actual token

// Reactive variables for data and loading state
const data = ref<any>(null)
const loading = ref(true) // Set loading to true initially

// Send request to the proxied Backend API
axios
  .get(apiURL, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  })
  .then((response) => {
    data.value = response.data
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
  .finally(() => {
    loading.value = false // Set loading to false after the request completes
  })
</script>
