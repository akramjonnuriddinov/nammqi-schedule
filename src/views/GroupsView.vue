<template>
  <section class="bg-gray-50 py-10 min-h-screen">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Guruhingizni tanlang</h1>
    <TheLoader v-if="loading" />
    <div v-else>
      <div v-if="groups.length > 0" class="max-w-2xl mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(group, index) in groups"
            :key="group.id"
            class="bg-white shadow-md rounded-lg p-4 flex items-center transition-transform transform hover:scale-105"
          >
            <span
              class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4"
            >
              {{ index + 1 }}
            </span>
            <router-link
              :to="{
                name: 'group',
                params: {
                  id: group.id
                }
              }"
              class="text-lg font-semibold text-blue-600 hover:underline"
            >
              {{ group.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="max-w-2xl mx-auto text-center py-4 text-gray-600">No groups found.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'

// Reactive variables for groups data and loading state
const groups = ref<any[]>([]) // Initialize as an empty array
const loading = ref(true) // Set loading to true initially

// Get the current route to access the department ID
const route = useRoute()
const departmentId = route.params.id // Get the department ID from the route

// Function to fetch groups based on the department ID
const fetchGroups = async () => {
  const apiURL = `/api/rest/v1/data/group-list?limit=200&_department=${departmentId}` // Use the proxied API URL
  const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca' // Replace with actual token

  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    if (response.data.success) {
      groups.value = response.data.data.items // Assign the fetched groups to the groups reactive variable
    } else {
      console.error('Failed to fetch groups:', response.data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false // Set loading to false after the request completes
  }
}

// Fetch groups when the component is mounted
onMounted(fetchGroups)
</script>

<style scoped>
/* You can add additional scoped styles if needed */
</style>
