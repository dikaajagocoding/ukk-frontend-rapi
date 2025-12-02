<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg text-white p-8 mb-12">
      <h2 class="text-4xl font-bold mb-4">Selamat Datang di Garuda Hustler</h2>
      <p class="text-lg">Unit Basket SMK NEGERI 1 GARUT - Membangun Generasi Pemenang</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Loading data...</p>
    </div>

    <!-- Featured Section -->
    <div v-else class="grid md:grid-cols-3 gap-8 mb-12">
      <!-- Featured Players -->
      <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Pemain Unggulan</h3>
        <div class="space-y-4">
          <div v-for="member in members.slice(0, 6)" :key="member.id" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                #{{ member.jersey_number }}
              </div>
              <div>
                <p class="font-semibold text-gray-800">{{ member.player_name }}</p>
                <p class="text-sm text-gray-500">{{ member.position }}</p>
              </div>
            </div>
          </div>
          <div v-if="members.length === 0" class="text-gray-500">Belum ada pemain</div>
        </div>
        <NuxtLink to="/members" class="inline-block mt-4 text-orange-600 hover:text-orange-700 font-semibold">
          Lihat Semua Pemain
        </NuxtLink>
      </div>

      <!-- Latest Matches -->
      <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Pertandingan Terbaru</h3>
        <div class="space-y-4">
          <div v-for="match in matches.slice(0, 5)" :key="match.id" class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <p class="font-semibold text-gray-800">{{ match.opponent }}</p>
            <p class="text-lg font-bold text-orange-600 mt-2">
              {{ match.score_us }} - {{ match.score_them }}
            </p>
            <p class="text-sm text-gray-500 mt-1">
              {{ formatDate(match.match_date) }}
            </p>
            <div class="mt-2">
              <span v-if="match.result === 'W'" class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Menang</span>
              <span v-else-if="match.result === 'L'" class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">Kalah</span>
              <span v-else class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Seri</span>
            </div>
          </div>
          <div v-if="matches.length === 0" class="text-gray-500">Belum ada pertandingan</div>
        </div>
        <NuxtLink to="/matches" class="inline-block mt-4 text-orange-600 hover:text-orange-700 font-semibold">
          Lihat Semua Pertandingan
        </NuxtLink>
      </div>

      <!-- Photo Gallery Preview -->
      <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Galeri</h3>
        <div class="grid grid-cols-2 gap-3">
          <div v-for="photo in galleries.slice(0, 4)" :key="photo.id" class="bg-gray-300 h-32 rounded-lg overflow-hidden hover:shadow-lg transition flex items-center justify-center">
            <p class="text-gray-600 text-center text-sm font-semibold px-2">{{ photo.title }}</p>
          </div>
        </div>
        <div v-if="galleries.length === 0" class="text-gray-500 mt-3">Belum ada foto</div>
        <NuxtLink to="/gallery" class="inline-block mt-4 text-orange-600 hover:text-orange-700 font-semibold">
          Lihat Galeri Lengkap
        </NuxtLink>
      </div>
    </div>

    <!-- Stats Section -->
    <div v-if="!loading" class="bg-white rounded-lg shadow-lg p-8">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">Statistik</h3>
      <div class="grid md:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-4xl font-bold text-orange-600">{{ members.length }}</p>
          <p class="text-gray-600">Total Pemain</p>
        </div>
        <div class="text-center">
          <p class="text-4xl font-bold text-green-600">{{ stats.wins }}</p>
          <p class="text-gray-600">Kemenangan</p>
        </div>
        <div class="text-center">
          <p class="text-4xl font-bold text-red-600">{{ stats.losses }}</p>
          <p class="text-gray-600">Kekalahan</p>
        </div>
        <div class="text-center">
          <p class="text-4xl font-bold text-yellow-600">{{ galleries.length }}</p>
          <p class="text-gray-600">Foto</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

// definePageMeta({
//   layout: 'default'
// })

const api = useApi()

const loading = ref(true)
const members = ref<any[]>([])
const matches = ref<any[]>([])
const galleries = ref<any[]>([])

const stats = computed(() => {
  return {
    wins: matches.value.filter(m => m.result === 'W').length,
    losses: matches.value.filter(m => m.result === 'L').length,
  }
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    const [membersData, matchesData, galleriesData] = await Promise.all([
      api.getMembers(),
      api.getMatches(),
      api.getGalleries()
    ])
    members.value = membersData
    matches.value = matchesData
    galleries.value = galleriesData
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
})
</script>
