<template>
  <div>
    <table class="table-auto w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Hafta Kuni</th>
          <th>Dars</th>
          <th>Dars vaqti</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(day, index) in orderedLessons" :key="day.dayName">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ day.dayName }}</td>
            <td v-if="day.lessons.length > 0">
              <ul class="flex flex-col gap-1">
                <li v-for="(lesson, idx) in day.lessons" :key="idx" class="flex items-center gap-5">
                  <span class="inline-block w-5 text-xl font-serif"
                    >{{ lesson.lessonPair.name }}.</span
                  >
                  {{ lesson.subject.name }}
                  <span>({{ lesson.employee.name }} \ </span>
                  <span class="font-medium"> {{ lesson.auditorium.name }})</span>
                </li>
              </ul>
            </td>
            <td v-if="day.lessons.length > 0">
              <ul class="flex flex-col gap-1">
                <li v-for="(lesson, idx) in day.lessons" :key="idx">
                  {{ lesson.lessonPair.start_time }} - {{ lesson.lessonPair.end_time }}
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    lessons: {
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    orderedLessons() {
      // Helper function to convert timestamp to day of the week
      function getDayName(lessonDate) {
        const daysOfWeek = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ]
        const date = new Date(lessonDate * 1000) // Convert timestamp to milliseconds
        return daysOfWeek[date.getDay()]
      }

      // Group lessons by weekday
      const lessonsByDay = this.lessons.reduce((acc, lesson) => {
        const dayName = getDayName(lesson.lesson_date)
        if (!acc[dayName]) {
          acc[dayName] = []
        }
        acc[dayName].push(lesson)
        return acc
      }, {})

      // Sort days in correct order excluding Sunday
      const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      // Return the lessons grouped and ordered by day
      return daysOrder.map((day) => ({
        dayName: day,
        lessons: lessonsByDay[day] || []
      }))
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
