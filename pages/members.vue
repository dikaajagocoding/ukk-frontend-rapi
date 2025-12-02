<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-4xl font-bold text-gray-800 mb-2">Daftar Pemain</h2>
    <p class="text-gray-600 mb-8">Tim Garuda Hustler SMK NEGERI 1 GARUT</p>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Loading...</p>
    </div>

    <div v-else>
      <!-- Filter by Position -->
      <div class="mb-6 flex gap-2 flex-wrap">
        <button 
          @click="selectedPosition = null"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition',
            selectedPosition === null ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          ]">
          Semua
        </button>
        <button 
          v-for="pos in positions" 
          :key="pos"
          @click="selectedPosition = pos"
          :class="[
            'px-4 py-2 rounded-lg font-semibold transition',
            selectedPosition === pos ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          ]">
          {{ pos }}
        </button>
      </div>

      <!-- Members Grid -->
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="member in filteredMembers" :key="member.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 h-32 flex items-center justify-center">
            <div class="text-6xl font-bold text-white">
              #{{ String(member.jersey_number).padStart(2, "0") }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800">{{ member.player_name }}</h3>
            <div class="mt-3 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Posisi</span>
                <span class="font-semibold text-orange-600">{{ member.position }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm">Bergabung</span>
                <span class="text-sm text-gray-700">{{ formatDate(member.joined_date) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredMembers.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-500 text-lg">Tidak ada pemain dengan posisi {{ selectedPosition }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

const api = useApi()

const loading = ref(true)
const members = ref<any[]>([])
const selectedPosition = ref<string | null>(null)
const positions = ["PG", "SG", "SF", "PF", "C"]

const filteredMembers = computed(() => {
  if (!selectedPosition.value) return members.value
  return members.value.filter(m => m.position === selectedPosition.value)
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

onMounted(async () => {
  try {
    members.value = await api.getMembers()
  } catch (error) {
    console.error("Error loading members:", error)
  } finally {
    loading.value = false
  }
})
</script>
