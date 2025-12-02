<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@latest/tailwind.min.css');
</style>
