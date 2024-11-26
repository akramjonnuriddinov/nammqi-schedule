<template>
  <div class="schedule-container">
    <div v-for="day in orderedLessons" :key="day.dayName" class="day-section">
      <h2 class="text-center day-header">{{ day.dayName }}</h2>
      <table class="lesson-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Kirish</th>
            <th>Chiqish</th>
            <th>Fan nomi</th>
            <th>Xona</th>
            <th>Fan turi</th>
            <th>O‘qituvchi</th>
          </tr>
        </thead>
        <tbody v-if="lessons.length != 0">
          <tr v-for="(lesson, idx) in day.lessons" :key="lesson.id">
            <!-- Unique key from lesson ID -->
            <td>{{ idx + 1 }}</td>
            <td>{{ lesson.lessonPair.start_time }}</td>
            <td>{{ lesson.lessonPair.end_time }}</td>
            <td>{{ lesson.subject.name }}</td>
            <td>{{ formatInput(lesson.auditorium.name) }}</td>
            <td>{{ lesson.trainingType.name }}</td>
            <td>{{ lesson.employee.name }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <!-- Unique key from lesson ID -->
            <td>1</td>
            <td>00:00</td>
            <td>00:00</td>
            <td>Dars jadvali mavjud emas</td>
            <td>Yo'q</td>
            <td>Yo'q</td>
            <td>Yo'q</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Lesson {
  id: number // Unique ID for each lesson
  subject: {
    id: number
    name: string
    code: string
  }
  auditorium: {
    name: string
  }
  lessonPair: {
    start_time: string
    end_time: string
  }
  employee: {
    name: string
  }
  trainingType: {
    name: string
  }
  lesson_date: number // Unix timestamp
}

interface DayLesson {
  dayName: string
  lessons: Lesson[]
}

const props = defineProps<{ lessons: Lesson[] }>()

// Get day name from Unix timestamp
const getDayName = (lessonDate: number): string => {
  const daysOfWeek = [
    'Yakshanba', // Sunday
    'Dushanba', // Monday
    'Seshanba', // Tuesday
    'Chorshanba', // Wednesday
    'Payshanba', // Thursday
    'Juma', // Friday
    'Shanba' // Saturday
  ]
  const date = new Date(lessonDate * 1000) // Convert to milliseconds
  return daysOfWeek[date.getDay()]
}

// Sort lessons by time
const sortByTime = (lessons: Lesson[]) => {
  return lessons.sort((a, b) => a.lessonPair.start_time.localeCompare(b.lessonPair.start_time))
}

// Group lessons by day, without removing or merging any data
const orderedLessons = computed((): DayLesson[] => {
  const lessonsByDay = props.lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    const dayName = getDayName(lesson.lesson_date)
    if (!acc[dayName]) {
      acc[dayName] = []
    }
    acc[dayName].push(lesson)
    return acc
  }, {})

  const daysOrder = [
    'Dushanba',
    'Seshanba',
    'Chorshanba',
    'Payshanba',
    'Juma',
    'Shanba'
    // 'Yakshanba'
  ]

  return daysOrder.map((day) => ({
    dayName: day,
    lessons: sortByTime(lessonsByDay[day] || [])
  }))
})

function formatInput(input: any) {
  // Split the input by spaces and handle the components
  const parts = input.split(' ')
  const numbers = parts[0].split('/')
  const type = parts[1]?.toUpperCase() // Ensure the type is always capitalized

  // Destructure the numbers array
  const [bino, xona, students] = numbers

  // Map the type to the corresponding word
  let typeText = ''
  if (type === 'A') {
    typeText = 'Amaliyot'
  } else if (type === 'M') {
    typeText = 'Maruza'
  } else if (type === 'm') {
    typeText = 'Maruza' // lowercase 'm' should also map to Maruza
  }

  // Return the formatted string
  return `${bino}-bino, ${xona}-xona, sig'imi: ${students}, ${typeText}`
}
</script>

<style scoped>
.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
}

.day-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}

.day-header {
  @apply bg-primary;
  color: white;
  text-align: center;
  padding: 10px 5px;
  font-size: 20px;
  font-weight: 500;
}

.lesson-table {
  width: 100%;
  border-collapse: collapse;
}

.lesson-table th,
.lesson-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.lesson-table th {
  background-color: #f4f4f4;
}

.lesson-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.lesson-table {
  width: 100%;
  table-layout: fixed; /* Ensures columns have fixed widths */
  border-collapse: collapse;
  font-weight: 500;
}

.lesson-table th,
.lesson-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

/* Set specific column widths */
.lesson-table th:nth-child(1),
.lesson-table td:nth-child(1) {
  width: 5%; /* Set width for the # column */
  text-align: center;
}

.lesson-table th:nth-child(2),
.lesson-table td:nth-child(2),
.lesson-table th:nth-child(3),
.lesson-table td:nth-child(3) {
  width: 10%; /* Width for Kirish and Chiqish */
  text-align: center;
}

.lesson-table th:nth-child(4),
.lesson-table td:nth-child(4) {
  width: 35%; /* Width for Fan nomi */
}

.lesson-table th:nth-child(5),
.lesson-table td:nth-child(5) {
  width: 18%; /* Width for Xona */
}

.lesson-table th:nth-child(6),
.lesson-table td:nth-child(6) {
  text-align: center;
  width: 12%; /* Width for Fan turi */
}

.lesson-table th:nth-child(7),
.lesson-table td:nth-child(7) {
  width: 20%; /* Width for O‘qituvchi */
}

.lesson-table th {
  background-color: #f4f4f4;
}

.lesson-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* General Mobile Optimization */
@media (max-width: 980px) {
  .lesson-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap; /* Allow horizontal scrolling */
  }
  .schedule-container {
    margin: 10px;
  }

  .day-section {
    flex-direction: column; /* Stack content vertically */
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .day-header {
    font-size: 16px;
    padding: 8px;
    writing-mode: initial;
  }

  .lesson-table {
    font-size: 12px; /* Reduce font size for smaller screens */
  }

  .lesson-table th,
  .lesson-table td {
    padding: 5px;
  }

  .lesson-table th:nth-child(1),
  .lesson-table td:nth-child(1) {
    width: 8%; /* Adjust # column */
  }

  .lesson-table th:nth-child(4),
  .lesson-table td:nth-child(4) {
    width: auto; /* Let Fan nomi take more space */
  }
}

/* Extra Small Screens (e.g., phones under 480px) */
@media (max-width: 480px) {
  .lesson-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap; /* Allow horizontal scrolling */
  }

  .lesson-table th,
  .lesson-table td {
    text-align: left; /* Align text for better readability */
    font-size: 10px; /* Further reduce font size */
  }

  .day-header {
    font-size: 14px;
  }

  .lesson-table th:nth-child(2),
  .lesson-table td:nth-child(2) /* Kirish */ {
    display: none;
  }
}
</style>
