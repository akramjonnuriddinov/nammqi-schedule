<template>
  <div v-if="loading" class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Current Week Schedule</h1>
    <div v-if="loading" class="text-center">
      <p>Loading...</p>
    </div>
    <div v-else-if="false" v-for="item in schedule" :key="item">
      <div v-if="item">
        <ul>
          <li v-for="i in item.items" :key="i">
            {{ i }},
            <h1>{{ convertTimestampToDefaultTime(i.weekStartTime) }}</h1>
            <h1>{{ convertTimestampToDefaultTime(i.lesson_date) }}</h1>
            <h1>{{ convertTimestampToDefaultTime(i.weekEndTime) }}</h1>
          </li>
        </ul>
        <table v-if="false" v-for="i in item.items" :key="i">
          <tr>
            <td rowspan="4" class="day-header">Seshanba</td>
            <th>#</th>
            <th>Kirish</th>
            <th>Chiqish</th>
            <th>Fan nomi</th>
            <th>Xona</th>
            <th>Fan turi</th>
            <th>O‘qituvchi</th>
          </tr>

          <tr>
            <td>1</td>
            <td>08:30</td>
            <td>10:00</td>
            <td>Ergonomika</td>
            <td>{{ i.auditorium.name }}</td>
            <td>Ma'ruza</td>
            <td>SALOXIDDINOVA D. Z.</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <!-- <hr /> -->
  <div v-else class="container mx-auto max-w-7xl">
    <TestComponent :lessons="lessons" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import TestComponent from '@/components/TestComponent.vue'

const route = useRoute()
const groupId = route.params.id
const schedule = ref<any[]>([])
const loading = ref(true)
const weekStartTime = ref<number | null>(null)
const weekEndTime = ref<number | null>(null)

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

function convertTimestampToDefaultTime(timestamp: number) {
  // Convert timestamp (in seconds) to milliseconds
  const date = new Date(timestamp * 1000)

  // Extract individual components
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // Format the date string as "YYYY-MM-DD HH:mm:ss"
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

console.log(convertTimestampToDefaultTime(1728259200), 'start')
console.log(convertTimestampToDefaultTime(1728086400), 'time')
console.log(convertTimestampToDefaultTime(1728086400), 'end')

weekStartTime.value = getCurrentWeekStartTimestamp()
weekEndTime.value = getCurrentWeekEndTimestamp()
const lessons = ref([])
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
    console.log(schedule.value?.data?.items)
    lessons.value = schedule.value?.data?.items
  } catch (error) {
    console.error('Error fetching schedule:', error)
  } finally {
    loading.value = false // Set loading to false after the request completes
  }
}

// Fetch schedule on component mount
onMounted(fetchSchedule)

const lessons2 = [
  {
    id: 318682,
    subject: { id: 3135, name: 'Biznesda amaliy buxgalteriya hisobi', code: 'N' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 31,
      name: 'Buxgalteriya xisobi va audit',
      code: '310-106-17',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 148,
      name: '4/402/48',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '16', name: '6', start_time: '16:30', end_time: '17:50' },
    employee: { id: 132, name: 'UBAYDULLAYEV T. A.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728345600,
    _week: 53262
  },
  {
    id: 318681,
    subject: { id: 220, name: 'Mikroiqtisodiyot', code: 'Mikro' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 148,
      name: '4/402/48',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 433, name: 'JAMOLOVA G. J.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728345600,
    _week: 53262
  },
  {
    id: 318677,
    subject: {
      id: 2477,
      name: 'Yangi tahrirdagi O‘zbekiston Respublikasi Konstitutsiyasi\t\t',
      code: 'YANG'
    },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 19,
      name: 'Ijtimoiy fanlar',
      code: '310-102-06',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 3,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 263, name: 'DEHQONOVA S. E.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728345600,
    _week: 53262
  },
  {
    id: 318210,
    subject: { id: 3135, name: 'Biznesda amaliy buxgalteriya hisobi', code: 'N' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 31,
      name: 'Buxgalteriya xisobi va audit',
      code: '310-106-17',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 150,
      name: '4/406/24',
      auditoriumType: { code: '13', name: 'Amaliyot' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 132, name: 'UBAYDULLAYEV T. A.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728691200,
    _week: 53262
  },
  {
    id: 318209,
    subject: { id: 3135, name: 'Biznesda amaliy buxgalteriya hisobi', code: 'N' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 31,
      name: 'Buxgalteriya xisobi va audit',
      code: '310-106-17',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 470, name: 'UMURZAKOV D. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728432000,
    _week: 53262
  },
  {
    id: 318208,
    subject: {
      id: 2477,
      name: 'Yangi tahrirdagi O‘zbekiston Respublikasi Konstitutsiyasi\t\t',
      code: 'YANG'
    },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 19,
      name: 'Ijtimoiy fanlar',
      code: '310-102-06',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 3,
      active: true
    },
    auditorium: {
      code: 143,
      name: '4/302/48 M',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 263, name: 'DEHQONOVA S. E.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728604800,
    _week: 53262
  },
  {
    id: 318207,
    subject: { id: 220, name: 'Mikroiqtisodiyot', code: 'Mikro' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 145,
      name: '4/304/36 L',
      auditoriumType: { code: '12', name: 'Laboratoriya' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 433, name: 'JAMOLOVA G. J.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728691200,
    _week: 53262
  },
  {
    id: 318206,
    subject: { id: 220, name: 'Mikroiqtisodiyot', code: 'Mikro' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 1074, name: 'XO‘JAXANOV M. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728432000,
    _week: 53262
  },
  {
    id: 318205,
    subject: { id: 220, name: 'Mikroiqtisodiyot', code: 'Mikro' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '11', name: '1', start_time: '08:30', end_time: '09:50' },
    employee: { id: 1074, name: 'XO‘JAXANOV M. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728259200,
    _week: 53262
  },
  {
    id: 318204,
    subject: { id: 124, name: 'Kichik biznes va tadbirkorlik', code: 'KBT' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 149,
      name: '4/403/30 A',
      auditoriumType: { code: '13', name: 'Amaliyot' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '16', name: '6', start_time: '16:30', end_time: '17:50' },
    employee: { id: 459, name: 'IBROGIMOV SH. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728518400,
    _week: 53262
  },
  {
    id: 318203,
    subject: { id: 124, name: 'Kichik biznes va tadbirkorlik', code: 'KBT' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 125, name: 'ARIPOV O. A.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728518400,
    _week: 53262
  },
  {
    id: 318202,
    subject: { id: 4, name: 'Iqtisodiyot nazariyasi', code: 'IqNaz' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 98,
      name: '2/403/26 A',
      auditoriumType: { code: '13', name: 'Amaliyot' },
      building: { id: 2, name: "2-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '16', name: '6', start_time: '16:30', end_time: '17:50' },
    employee: { id: 390, name: 'TALOBOYEV X. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728604800,
    _week: 53262
  },
  {
    id: 318201,
    subject: { id: 4, name: 'Iqtisodiyot nazariyasi', code: 'IqNaz' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 225,
      name: '4/405/30',
      auditoriumType: { code: '13', name: 'Amaliyot' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 390, name: 'TALOBOYEV X. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728518400,
    _week: 53262
  },
  {
    id: 318200,
    subject: { id: 4, name: 'Iqtisodiyot nazariyasi', code: 'IqNaz' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 148,
      name: '4/402/48',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 390, name: 'TALOBOYEV X. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728604800,
    _week: 53262
  },
  {
    id: 318199,
    subject: { id: 4, name: 'Iqtisodiyot nazariyasi', code: 'IqNaz' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 146,
      name: '4/306/48 m',
      auditoriumType: { code: '11', name: 'Ma’ruza' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '11', name: 'Ma’ruza' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 390, name: 'TALOBOYEV X. X.' },
    weekStartTime: 1728259200,
    weekEndTime: 1728691200,
    lesson_date: 1728259200,
    _week: 53262
  },
  {
    id: 315069,
    subject: { id: 3135, name: 'Biznesda amaliy buxgalteriya hisobi', code: 'N' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 31,
      name: 'Buxgalteriya xisobi va audit',
      code: '310-106-17',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 150,
      name: '4/406/24',
      auditoriumType: { code: '13', name: 'Amaliyot' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '15', name: '5', start_time: '15:00', end_time: '16:20' },
    employee: { id: 132, name: 'UBAYDULLAYEV T. A.' },
    weekStartTime: 1727654400,
    weekEndTime: 1728086400,
    lesson_date: 1728086400,
    _week: 53261
  },
  {
    id: 310678,
    subject: { id: 220, name: 'Mikroiqtisodiyot', code: 'Mikro' },
    semester: { code: '13', name: '3-semestr' },
    educationYear: { code: '2024', name: '2024-2025', current: true },
    group: { id: 993, name: '77-sa-IQT-23', educationLang: { code: '11', name: 'O‘zbek' } },
    faculty: {
      id: 5,
      name: 'Muhandislik kommunikatsiyalari',
      code: '310-103',
      structureType: { code: '11', name: 'Fakultet' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: null,
      active: true
    },
    department: {
      id: 17,
      name: 'Iqtisodiyot',
      code: '310-106-19',
      structureType: { code: '12', name: 'Kafedra' },
      localityType: { code: '11', name: 'Mahalliy' },
      parent: 49,
      active: true
    },
    auditorium: {
      code: 145,
      name: '4/304/36 L',
      auditoriumType: { code: '12', name: 'Laboratoriya' },
      building: { id: 3, name: "4-o'quv binosi" }
    },
    trainingType: { code: '13', name: 'Amaliy' },
    lessonPair: { code: '14', name: '4', start_time: '13:30', end_time: '14:50' },
    employee: { id: 433, name: 'JAMOLOVA G. J.' },
    weekStartTime: 1727654400,
    weekEndTime: 1728086400,
    lesson_date: 1728086400,
    _week: 53261
  }
]
</script>

<style>
/*li {
  list-style: circle;
}*/

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
