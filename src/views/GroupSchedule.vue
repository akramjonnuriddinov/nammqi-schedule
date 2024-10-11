<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Joriy hafta dars jadvali</h1>

    <!-- "Go Back" Button -->
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Orqaga
    </button>

    <!-- Loader or Content -->
    <TheLoader v-if="loading" />
    <TestComponent v-else :lessons="lessons" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import TestComponent from '@/components/TestComponent.vue'
import TheLoader from '@/components/TheLoader.vue'

const route = useRoute()
const groupId = route.params.id
const schedule = ref<any>([])
const loading = ref(true)
const lessons = ref<any>([])

function getCurrentWeekStartTime() {
  const now = new Date()

  // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
  const currentDay = now.getDay()

  // Calculate how many days to subtract to get back to Monday
  const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1

  // Set the time to midnight (00:00:00) on the current day
  now.setHours(0, 0, 0, 0)

  // Subtract the necessary number of days to get to Monday
  const monday = new Date(now)
  monday.setDate(now.getDate() - distanceToMonday)

  // Return Unix timestamp in seconds (by dividing milliseconds by 1000)
  return Math.floor(monday.getTime() / 1000)
}
function getCurrentWeekEndTime() {
  const now = new Date()
  // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const currentDay = now.getDay()
  // Calculate how many days to add to get to the upcoming Sunday
  const distanceToSunday = currentDay === 0 ? 0 : 7 - currentDay

  // Set the time to 23:59:59 on the current day
  now.setHours(23, 59, 59, 999)

  // Add the necessary number of days to get to Sunday
  const sunday = new Date(now)
  sunday.setDate(now.getDate() + distanceToSunday)

  // Return Unix timestamp in seconds (by dividing milliseconds by 1000)
  return Math.floor(sunday.getTime() / 1000)
}

const weekEndTimestamp = getCurrentWeekEndTime()
const weekStartTimestamp = getCurrentWeekStartTime()

const fetchSchedule = async () => {
  const apiURL = `/api/rest/v1/data/schedule-list?_group=${groupId}&lesson_date_from=${weekStartTimestamp}&lesson_date_to=${weekEndTimestamp}`
  const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca'

  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    schedule.value = response.data
    lessons.value = schedule.value?.data?.items
  } catch (error) {
    console.error('Error fetching schedule:', error)
  } finally {
    loading.value = false
  }
}

// Fetch schedule on component mount
onMounted(fetchSchedule)
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
.day-header {
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  writing-mode: vertical-rl;
}
.session-title {
  font-weight: bold;
  text-align: center;
  background-color: #00bfc1;
  color: white;
  padding: 10px;
}
tr {
  border-bottom: 1px solid #ddd;
}
</style>
