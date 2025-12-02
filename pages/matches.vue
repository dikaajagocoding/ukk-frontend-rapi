<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-4xl font-bold text-gray-800 mb-2">Riwayat Pertandingan</h2>
    <p class="text-gray-600 mb-8">Semua pertandingan tim Garuda Hustler</p>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Loading...</p>
    </div>

    <div v-else>
      <!-- Stats Overview -->
      <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
          <p class="text-4xl font-bold">{{ stats.wins }}</p>
          <p class="text-green-100">Kemenangan</p>
        </div>
        <div class="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
          <p class="text-4xl font-bold">{{ stats.losses }}</p>
          <p class="text-red-100">Kekalahan</p>
        </div>
        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg p-6 shadow-lg">
          <p class="text-4xl font-bold">{{ stats.draws }}</p>
          <p class="text-yellow-100">Seri</p>
        </div>
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
          <p class="text-4xl font-bold">{{ matches.length }}</p>
          <p class="text-blue-100">Total Pertandingan</p>
        </div>
      </div>

      <!-- Matches List -->
      <div class="space-y-4">
        <div v-for="match in matches" :key="match.id" class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center justify-between flex-wrap gap-4">
            <!-- Left Side - Opponent -->
            <div class="flex-1 min-w-fit">
              <p class="text-sm text-gray-500 mb-1">Lawan</p>
              <p class="text-2xl font-bold text-gray-800">{{ match.opponent }}</p>
            </div>

            <!-- Score -->
            <div class="text-center flex-shrink-0">
              <p class="text-sm text-gray-500 mb-2">Skor</p>
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <p class="text-4xl font-bold text-orange-600">{{ match.score_us }}</p>
                  <p class="text-xs text-gray-600">Kami</p>
                </div>
                <p class="text-2xl text-gray-400">-</p>
                <div class="text-center">
                  <p class="text-4xl font-bold text-gray-600">{{ match.score_them }}</p>
                  <p class="text-xs text-gray-600">Lawan</p>
                </div>
              </div>
            </div>

            <!-- Status & Date -->
            <div class="text-right flex-1 min-w-fit">
              <p class="text-sm text-gray-500 mb-2">Hasil</p>
              <div class="mb-2">
                <span v-if="match.result === 'W'" class="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold text-lg"> MENANG</span>
                <span v-else-if="match.result === 'L'" class="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full font-bold text-lg"> KALAH</span>
                <span v-else class="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold text-lg">= SERI</span>
              </div>
              <p class="text-sm text-gray-600">{{ formatDate(match.match_date) }}</p>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="match.notes" class="mt-4 pt-4 border-t text-gray-600 text-sm">
            <strong>Catatan:</strong> {{ match.notes }}
          </div>
        </div>
      </div>

      <div v-if="matches.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-500 text-lg">Belum ada pertandingan terdaftar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

const api = useApi()

const loading = ref(true)
const matches = ref<any[]>([])

const stats = computed(() => {
  return {
    wins: matches.value.filter(m => m.result === "W").length,
    losses: matches.value.filter(m => m.result === "L").length,
    draws: matches.value.filter(m => m.result === "D").length,
  }
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

onMounted(async () => {
  try {
    matches.value = await api.getMatches()
  } catch (error) {
    console.error("Error loading matches:", error)
  } finally {
    loading.value = false
  }
})
</script>
