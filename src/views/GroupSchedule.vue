<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Joriy hafta dars jadvali</h1>
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
const weekStartTime = ref<number | null>(null)
const weekEndTime = ref<number | null>(null)
const lessons = ref<any>([])

function getCurrentWeekStartTimestamp() {
  const now = new Date()

  // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)
  const dayOfWeek = now.getDay()

  // Create a new date object set to the current time
  const startOfWeek = new Date(now)

  // Set time to midnight
  startOfWeek.setHours(0, 0, 0, 0)

  // Set date to the previous Sunday (start of the week)
  startOfWeek.setDate(now.getDate() - dayOfWeek)

  // Convert the start of the week to a Unix timestamp (in seconds)
  return Math.floor(startOfWeek.getTime() / 1000)
}

function getCurrentWeekEndTimestamp() {
  const now = new Date()

  // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)
  const dayOfWeek = now.getDay()

  // Create a new date object set to the current time
  const endOfWeek = new Date(now)

  // Set date to the next Saturday (end of the week)
  endOfWeek.setHours(23, 59, 59, 999) // Set to the last millisecond of the day
  endOfWeek.setDate(now.getDate() + (6 - dayOfWeek)) // Move to next Saturday

  // Convert the end of the week to a Unix timestamp (in seconds)
  return Math.floor(endOfWeek.getTime() / 1000)
}

weekStartTime.value = getCurrentWeekStartTimestamp()
weekEndTime.value = getCurrentWeekEndTimestamp()
// Function to fetch the current week's schedule
const fetchSchedule = async () => {
  const apiURL = `/api/rest/v1/data/schedule-list?_group=${groupId}&lesson_date_from=${weekStartTime.value}&lesson_date_to=${weekEndTime.value}`
  const adminToken = 'LYStnBw8UonOaDroQF7UlUEpZFpT2_ca' // Replace with actual token

  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    schedule.value = response.data // Assuming response.data is an array
    lessons.value = schedule.value?.data?.items
  } catch (error) {
    console.error('Error fetching schedule:', error)
  } finally {
    loading.value = false // Set loading to false after the request completes
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
