<template>
  <div
    class="group relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:bg-[#F6F3E8] hover:shadow-md"
  >
    <!-- Product Image Skeleton (only 1 skeleton) -->
    <USkeleton class="aspect-[4/3] w-full" />

    <!-- Product Info Skeleton -->
    <div class="p-5">
      <!-- Title -->
      <USkeleton class="mb-2 h-6 w-3/4" />

      <!-- Metadata Row -->
      <div class="mb-3 flex items-center gap-2">
        <USkeleton class="h-5 w-12 rounded" />
      </div>

      <!-- Price and CTA -->
      <div class="flex items-center justify-between">
        <USkeleton class="h-8 w-16" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
