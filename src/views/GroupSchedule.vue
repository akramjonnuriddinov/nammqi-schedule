<template>
  <div class="container p-4 mx-auto">
    <div class="flex items-center gap-5 mb-10">
      <BackButton />
      <span
        class="relative flex justify-center w-full text-5xl font-bold text-transparent bg-gradient-to-r from-blue-500 via-teal-500 to-blue-400 bg-clip-text"
      >
        Guruh: {{ lessons[0]?.group.name }}
        <span
          class="absolute h-1 transform -translate-x-1/2 left-1/2 -bottom-1 bg-gradient-to-r from-teal-500 to-blue-500"
        ></span>
      </span>
    </div>

    <h1 class="mb-4 text-2xl font-semibold text-center">
      Joriy hafta dars jadvali
      <span class="italic"> ( {{ currentWeek.start }} / {{ currentWeek.end }} ) </span>
    </h1>

    <TheLoader v-if="loading" />
    <TheTable v-else :lessons="lessons" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import TheTable from '@/components/TheTable.vue'
import TheLoader from '@/components/TheLoader.vue'
import BackButton from '@/components/BackButton.vue'

const route = useRoute()
const groupId = route.params.id
const schedule = ref<any>([])
const loading = ref(true)
const lessons = ref<any>([])

function getCurrentWeekStartTime() {
  const now = new Date()

  const currentDay = now.getDay()

  const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1

  now.setHours(0, 0, 0, 0)

  const monday = new Date(now)
  monday.setDate(now.getDate() - distanceToMonday)

  return Math.floor(monday.getTime() / 1000)
}
function getCurrentWeekEndTime() {
  const now = new Date()
  const currentDay = now.getDay()
  const distanceToSunday = currentDay === 0 ? 0 : 7 - currentDay

  now.setHours(23, 59, 59, 999)

  const sunday = new Date(now)
  sunday.setDate(now.getDate() + distanceToSunday)

  return Math.floor(sunday.getTime() / 1000)
}

const weekEndTimestamp = getCurrentWeekEndTime()
const weekStartTimestamp = getCurrentWeekStartTime()

const fetchSchedule = async () => {
  const apiURL = `https://hemisback.nammqi.uz/api/hemis/schedule-list?_group=${groupId}&lesson_date_from=${weekStartTimestamp}&lesson_date_to=${weekEndTimestamp}`
  const adminToken = ''

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

onMounted(fetchSchedule)

function getCurrentWeekStartAndEnd() {
  const today = new Date()

  const dayOfWeek = today.getDay()

  const startOfWeek = new Date(today)
  const endOfWeek = new Date(today)

  startOfWeek.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  endOfWeek.setDate(startOfWeek.getDate() + 6)

  const formatDate = (date: any) => date.toISOString().split('T')[0]

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek)
  }
}

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
