<template>
  <section @click="showKeyboard = false" class="min-h-screen py-10 bg-gray-50">
    <div class="container px-5 mx-auto">
      <BackButton class="max-lg:mb-5" />
      <h2
        v-if="!loading && filteredGroups.length > 0"
        class="mb-6 text-3xl font-bold text-center text-gray-800"
      >
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
      </h2>
      <h2 v-else-if="!loading" class="mb-6 text-3xl font-bold text-center text-gray-800">
        Guruh topilmadi!
      </h2>
      <span class="block mb-6 text-lg font-bold text-center text-gray-800"
        >Guruhingizni tanlang</span
      >
    </div>
    <div class="container px-5 mx-auto">
      <div
        @click.stop
        class="container mx-auto"
        :class="{
          'lg:flex gap-4': showKeyboard
        }"
      >
        <div class="mb-5" :class="{ 'w-[700px] lg:w-full max-md:w-full': showKeyboard }">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Guruhingiz nomini yozing..."
            class="w-full p-3 mb-5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @focus="showKeyboard = true"
          />
          <OnlineKeyboard
            v-if="showKeyboard"
            :visible="showKeyboard"
            :targetInput="searchQuery"
            @update:input="updateSearchQuery"
            @close="closeKeyboard"
            class="keyboard"
          />
        </div>
        <div class="w-full groups">
          <TheLoader v-if="loading" />
          <div v-else>
            <div
              v-if="filteredGroups?.length > 0"
              class="grid gap-4 groups"
              :class="{
                'grid-cols-2 max-lg:grid-cols-1': showKeyboard, // 2 columns when showKeyboard is true
                'md:grid-cols-2  lg:grid-cols-4': !showKeyboard // Default grid layout
              }"
            >
              <div
                v-for="(group, index) in filteredGroups"
                :key="group.id"
                class="flex items-center p-4 transition-transform transform bg-white border border-gray-300 rounded-md hover:scale-105"
              >
                <span
                  class="flex items-center justify-center min-w-[40px] min-h-[40px] mr-4 text-white bg-primary rounded-full"
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
                  class="w-full text-lg font-semibold text-primary hover:text-primary"
                >
                  {{ group.name }}
                </router-link>
              </div>
            </div>

            <div v-else class="max-w-2xl py-4 mx-auto text-center text-gray-600">
              Guruh topilmadi!
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'
import BackButton from '@/components/BackButton.vue'
import OnlineKeyboard from '@/components/OnlineKeyboard.vue'

const groups = ref<any[]>([]) // Initialize as an empty array
const loading = ref(true) // Set loading to true initially

const searchQuery = ref('')
const showKeyboard = ref(false)
const updateSearchQuery = (value: string) => {
  searchQuery.value = value
}

const closeKeyboard = () => {
  showKeyboard.value = false
}

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

<style scoped>
.keyboard,
.groups {
  transition: transform 0.4s ease;
  position: relative;
}

.groups {
  transform: translateX(0%);
}
</style>
