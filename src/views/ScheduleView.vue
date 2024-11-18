<template>
  <section class="min-h-screen py-10 bg-gray-50">
    <div class="container px-5 mx-auto mb-8">
      <BackButton />
      <h2 class="mb-6 text-3xl font-bold text-center text-gray-800">
        Fakultet va bo'limlar ro'yxati
      </h2>
      <span class="block mb-6 text-lg font-bold text-center text-gray-800"
        >Fakultet yoki bo'limingizni tanlang</span
      >
    </div>
    <the-loader v-if="loading" />
    <div v-else>
      <div v-if="departments" class="container px-5 mx-auto">
        <ul class="grid grid-cols-2 gap-6">
          <li
            v-for="item in departments"
            :key="item.id"
            class="flex items-center p-4 transition-transform transform bg-white border border-gray-300 rounded-lg hover:scale-105"
          >
            <div class="flex items-center gap-4">
              <img class="rounded-full w-14 h-14" :src="useImage(item.img_url)" :alt="item.name" />
              <router-link
                :to="{
                  name: 'groups',
                  params: {
                    id: item.id
                  }
                }"
                class="w-full h-full text-lg font-semibold hover:text-primary"
              >
                {{ item.name }}
                <span v-if="item.id == 7 || item.id == 20 || item.id == 21">bo'limi</span>
                <span v-else>fakulteti</span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import TheLoader from '@/components/TheLoader.vue'
import BackButton from '@/components/BackButton.vue'
import { useImage } from '@/composables/useImage'

const apiURL = 'https://hemisback.nammqi.uz/api/hemis/department-list?limit=200&_structure_type=11'
const adminToken = ''

const departments = [
  {
    id: 5,
    name: 'Muhandislik kommunikatsiyalari',
    code: '310-103',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/muhandislik.jpg'
  },
  {
    id: 6,
    name: 'Sanoatni axborotlashtirish',
    code: '310-104',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/sanoat.jpg'
  },
  {
    id: 3,
    name: 'Mashinasozlik',
    code: '310-102',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/mashinasozlik.jpg'
  },
  {
    id: 2,
    name: 'Energetika va mehnat muxofazasi',
    code: '310-105',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/energetika.jpg'
  },
  {
    id: 49,
    name: 'Iqtisodiyot va boshqaruv',
    code: '310-106',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/iqtisodiyot.jpg'
  },
  {
    id: 4,
    name: 'Transport',
    code: '310-107',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/transport.jpg'
  },
  {
    id: 1,
    name: 'Qurilish',
    code: '310-101',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/logo-uz.png'
  },
  {
    id: 20,
    name: "Sirtqi ta'lim",
    code: '310-108',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/logo-uz.png'
  },
  {
    id: 7,
    name: 'Magistratura',
    code: '310-109',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '11', name: 'Mahalliy' },
    parent: null,
    active: true,
    img_url: 'faculties/logo-uz.png'
  },
  {
    id: 21,
    name: "Qoʻshma ta'lim dasturlarini muvofiqlashtirish",
    code: '310-110',
    structureType: { code: '11', name: 'Fakultet' },
    localityType: { code: '12', name: 'Qo‘shma' },
    parent: null,
    active: true,
    img_url: 'faculties/logo-uz.png'
  }
]

const data = ref<any>(null)
const loading = ref(false)

const fetchDepartments = async () => {
  try {
    const response = await axios.get(apiURL, {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
    data.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

// onMounted(fetchDepartments)
</script>
