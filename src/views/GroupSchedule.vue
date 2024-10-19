<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center mb-10 gap-5">
      <BackButton />
      <span
        class="flex w-full font-bold text-5xl justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-blue-400 bg-clip-text text-transparent relative"
      >
        Guruh: {{ lessons[0]?.group.name }}
        <span
          class="absolute left-1/2 transform -translate-x-1/2 -bottom-1 h-1 bg-gradient-to-r from-teal-500 to-blue-500"
        ></span>
      </span>
    </div>

    <h1 class="text-2xl text-center font-semibold mb-4">
      Joriy hafta dars jadvali
      <span class="italic"> ( {{ currentWeek.start }} / {{ currentWeek.end }} ) </span>
    </h1>

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
import BackButton from '@/components/BackButton.vue'

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
  const apiURL = `http://192.168.10.100:8000/api/hemis/schedule-list?_group=${groupId}&lesson_date_from=${weekStartTimestamp}&lesson_date_to=${weekEndTimestamp}`
  const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca'

  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    schedule.value = response.data
    lessons.value = schedule.value?.data?.items
    console.log(lessons.value)
  } catch (error) {
    console.error('Error fetching schedule:', error)
  } finally {
    loading.value = false
  }
}

// Fetch schedule on component mount
onMounted(fetchSchedule)

// Function to get current week start and end dates
function getCurrentWeekStartAndEnd() {
  const today = new Date()

  // Get the current day of the week (0-6) where 0 is Sunday and 6 is Saturday
  const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Assuming week starts on Monday
  const startOfWeek = new Date(today)
  const endOfWeek = new Date(today)

  // Set the start of the week (Monday)
  startOfWeek.setDate(today.getDate() - ((dayOfWeek + 6) % 7)) // Adjust for Monday start

  // Set the end of the week (Sunday)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Add 6 days to start of week

  // Format dates to YYYY-MM-DD
  const formatDate = (date: any) => date.toISOString().split('T')[0]

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek)
  }
}

// Example usage
const currentWeek = getCurrentWeekStartAndEnd()
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
