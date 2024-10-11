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
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Fakultetingizni tanlang</h1>
    <the-loader v-if="loading" />
    <div v-else>
      <div v-if="data" class="max-w-2xl mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(item, index) in data?.data?.items"
            :key="item.id"
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
                  id: item.id
                }
              }"
              class="text-lg font-semibold text-blue-500 hover:text-blue-700"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'

const apiURL = '/api/rest/v1/data/department-list?limit=200&_structure_type=11'
const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca' // Replace with actual token

const data = ref<any>(null)
const loading = ref(true)

const fetchDepartments = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    })
    data.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchDepartments)
</script>

<style scoped>
/* You can add additional scoped styles if needed */
</style>
