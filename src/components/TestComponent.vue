<template>
  <div class="schedule-container">
    <div v-for="day in orderedLessons" :key="day.dayName" class="day-section">
      <h2 class="day-header">{{ day.dayName }}</h2>
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
        <tbody>
          <tr v-for="(lesson, idx) in day.lessons" :key="generateLessonKey(lesson, idx)">
            <td>{{ idx + 1 }}</td>
            <td>{{ lesson.lessonPair.start_time }}</td>
            <td>{{ lesson.lessonPair.end_time }}</td>
            <td>{{ lesson.subject.name }}</td>
            <td>{{ lesson.auditorium.name }}</td>
            <td>{{ lesson.trainingType.name }}</td>
            <td>{{ lesson.employee.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Lesson {
  id: number
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
  lesson_date: number
}

interface DayLesson {
  dayName: string
  lessons: Lesson[]
}

const props = defineProps<{ lessons: Lesson[] }>()

const getDayName = (lessonDate: number): string => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const date = new Date(lessonDate * 1000) // Convert timestamp to milliseconds
  return daysOfWeek[date.getDay()]
}

const sortByTime = (lessons: Lesson[]) => {
  return lessons.sort((a, b) => a.lessonPair.start_time.localeCompare(b.lessonPair.start_time))
}

const generateLessonKey = (lesson: Lesson, idx: number): string => {
  return `${lesson.lessonPair.start_time}-${lesson.subject.name}-${lesson.employee.name}-${lesson.auditorium.name}-${lesson.lesson_date}-${idx}`
}

const orderedLessons = computed((): DayLesson[] => {
  const lessonsByDay = props.lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    const dayName = getDayName(lesson.lesson_date)
    if (!acc[dayName]) {
      acc[dayName] = []
    }
    acc[dayName].push(lesson)
    return acc
  }, {})

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return daysOrder.map((day) => ({
    dayName: day,
    lessons: sortByTime(lessonsByDay[day] || [])
  }))
})
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
  background-color: #00bfa5;
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: bold;
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
</style>
