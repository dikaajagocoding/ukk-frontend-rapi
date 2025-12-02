<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <CommonHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <CommonFooter />
  </div>
</template>
