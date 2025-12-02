<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-4xl font-bold text-gray-800 mb-2">Galeri Foto</h2>
    <p class="text-gray-600 mb-8">Dokumentasi aktivitas tim Garuda Hustler</p>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Loading...</p>
    </div>

    <div v-else>
      <!-- Gallery Grid -->
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="photo in galleries" :key="photo.id" class="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer">
          <div class="relative bg-gray-300 h-56 overflow-hidden">
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-400 to-gray-500">
              <p class="text-white text-center px-4 font-semibold">{{ photo.title }}</p>
            </div>
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-end p-4">
              <div class="text-white opacity-0 group-hover:opacity-100 transition">
                <span v-if="photo.event_type" class="inline-block bg-orange-600 px-3 py-1 rounded text-xs font-semibold mb-2">
                  {{ photo.event_type }}
                </span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="p-4">
            <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-2">{{ photo.title }}</h3>
            
            <p v-if="photo.description" class="text-gray-600 text-sm mb-3 line-clamp-2">{{ photo.description }}</p>

            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ formatDate(photo.created_at) }}</span>
              <span v-if="photo.event_type" class="text-orange-600 font-semibold">{{ photo.event_type }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="galleries.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-500 text-lg">Belum ada foto di galeri</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'

const api = useApi()

const loading = ref(true)
const galleries = ref<any[]>([])

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })
}

onMounted(async () => {
  try {
    galleries.value = await api.getGalleries()
  } catch (error) {
    console.error("Error loading galleries:", error)
  } finally {
    loading.value = false
  }
})
</script>
