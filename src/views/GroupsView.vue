<template>
  <section class="min-h-screen py-10 bg-gray-50">
    <h1 v-if="!loading" class="mb-6 text-3xl font-bold text-center text-gray-800">
      {{ filteredGroups[0].department.name }}
      <span
        v-if="
          filteredGroups[0].department?.id == 7 ||
          filteredGroups[0].department?.id == 20 ||
          filteredGroups[0].department?.id == 21
        "
        >bo'limi</span
      >
      <span v-else>fakulteti</span>
    </h1>
    <h1 class="mb-6 text-lg font-bold text-center text-gray-800">Guruhingizni tanlang:</h1>
    <BackButton />
    <div class="max-w-2xl px-5 mx-auto mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Guruhingiz nomini yozing..."
        class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <TheLoader v-if="loading" />

    <div v-else>
      <div v-if="filteredGroups?.length > 0" class="max-w-2xl px-5 mx-auto">
        <ul class="space-y-4">
          <li
            v-for="(group, index) in filteredGroups"
            :key="group.id"
            class="flex items-center p-4 transition-transform transform bg-white rounded-lg shadow-md hover:scale-105"
          >
            <span
              class="flex items-center justify-center min-w-[40px] min-h-[40px] mr-4 text-white bg-blue-500 rounded-full"
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
              class="w-full text-lg font-semibold text-blue-500 hover:text-blue-700"
            >
              {{ group.name }}
            </router-link>
          </li>
        </ul>
      </div>

      <div v-else class="max-w-2xl py-4 mx-auto text-center text-gray-600">No groups found.</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'
import BackButton from '@/components/BackButton.vue'

const groups = ref<any[]>([]) // Initialize as an empty array
const loading = ref(true) // Set loading to true initially

const searchQuery = ref('')

const route = useRoute()
const departmentId = route.params.id // Get the department ID from the route

const fetchGroups = async () => {
  const apiURL = `https://hemisback.nammqi.uz/api/hemis/group-list?limit=200&_department=${departmentId}` // Use the proxied API URL
  const adminToken = ''

  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    if (response.data.success) {
      groups.value = response.data.data.items
    } else {
      console.error('Failed to fetch groups:', response.data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

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
