<template>
  <div class="relative flex min-h-screen w-full flex-col bg-gray-50">
    <UiNavbar />
    <main class="mx-auto h-full w-full max-w-[1440px] flex-1 px-4 py-4 sm:px-6 lg:px-8">
      <slot />
    </main>
    <UiFooter />
  </div>
</template>

<script setup lang="ts"></script>
