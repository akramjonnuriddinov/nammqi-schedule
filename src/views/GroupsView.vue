<template>
  <section class="bg-gray-50 py-10 min-h-screen">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Guruhingizni tanlang</h1>
    <BackButton />
    <!-- Search Input -->
    <div class="max-w-2xl mx-auto mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Guruhingiz nomini yozing..."
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <TheLoader v-if="loading" />

    <div v-else>
      <div v-if="filteredGroups.length > 0" class="max-w-2xl mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(group, index) in filteredGroups"
            :key="group.id"
            class="bg-white shadow-md rounded-lg p-4 flex items-center transition-transform transform hover:scale-105"
          >
            <span
              class="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4"
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
              class="text-lg font-semibold text-blue-500 hover:text-blue-700"
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'
import BackButton from '@/components/BackButton.vue'

// Reactive variables for groups data and loading state
const groups = ref<any[]>([]) // Initialize as an empty array
const loading = ref(true) // Set loading to true initially

// Search query for filtering the groups
const searchQuery = ref('')

// Get the current route to access the department ID
const route = useRoute()
const departmentId = route.params.id // Get the department ID from the route

// Function to fetch groups based on the department ID
const fetchGroups = async () => {
  const apiURL = `http://192.168.10.100:8000/api/hemis/group-list?limit=200&_department=${departmentId}` // Use the proxied API URL
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

// Computed property for filtering the groups by search query
const filteredGroups = computed(() => {
  if (!searchQuery.value) {
    return groups.value
  }
  return groups.value.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Fetch groups when the component is mounted
onMounted(fetchGroups)
</script>
