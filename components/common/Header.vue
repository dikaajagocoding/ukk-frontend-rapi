<template>
  <nav class="bg-orange-600 shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
          <span class="text-3xl"></span>
          <h1 class="text-white text-2xl font-bold">Garuda Hustler</h1>
        </div>
        <div class="hidden md:flex space-x-8">
          <NuxtLink to="/" class="text-white hover:text-orange-100 font-medium transition">Home</NuxtLink>
          <NuxtLink to="/members" class="text-white hover:text-orange-100 font-medium transition">Pemain</NuxtLink>
          <NuxtLink to="/matches" class="text-white hover:text-orange-100 font-medium transition">Pertandingan</NuxtLink>
          <NuxtLink to="/gallery" class="text-white hover:text-orange-100 font-medium transition">Galeri</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
