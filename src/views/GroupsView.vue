<template>
  <section>
    <h1 class="bg-slate-800 text-3xl text-center text-white py-5 w-full">Guruhingizni tanlang</h1>
    <div v-if="loading" class="container mx-auto max-w-6xl text-3xl py-4">Loading...</div>
    <div v-else>
      <div v-if="groups.length > 0" class="container mx-auto max-w-6xl">
        <ul class="flex flex-col gap-5 py-10 text-lg">
          <li
            v-for="(group, index) in groups"
            :key="group.id"
            class="bg-slate-900 rounded-md flex items-center text-white"
          >
            <span class="p-5 bg-slate-800 rounded-tl-md rounded-bl-md block">
              {{ index + 1 }}. {{ group.id }}</span
            >
            <router-link
              :to="{
                name: 'group',
                params: {
                  id: group.id
                }
              }"
              class="px-4 hover:text-gray-400 transition-colors"
            >
              {{ group.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else class="container mx-auto max-w-6xl text-center py-4">No groups found.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

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
/* Add any component-specific styles here */
</style>
