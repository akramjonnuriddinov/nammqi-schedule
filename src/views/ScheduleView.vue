<template>
  <section class="bg-gray-50 py-10 min-h-screen">
    <div class="max-w-2xl mx-auto mb-4">
      <BackButton />
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
import BackButton from '@/components/BackButton.vue'

const apiURL = 'http://192.168.10.100:8000/api/hemis/department-list?limit=200&_structure_type=11'
const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca' // Replace with actual token

const data = ref<any>(null)
const loading = ref(true)

const fetchDepartments = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
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
