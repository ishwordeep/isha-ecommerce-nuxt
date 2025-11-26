<template>
  <div v-for="n in 3" :key="n" class="rounded-xl border border-gray-200 bg-white p-6">
    <!-- Header: ID + Status + Total -->
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="mb-2 flex flex-wrap items-center gap-3">
          <!-- Order ID -->
          <USkeleton class="h-7 w-full max-w-48 rounded-md" />

          <!-- Status Badge -->
          <USkeleton class="h-6 w-full max-w-24 rounded-full" />
        </div>

        <!-- Date + items count -->
        <USkeleton class="mb-2 h-5 w-full max-w-64 rounded-md" />
      </div>

      <div class="text-right">
        <!-- Total Amount -->
        <USkeleton class="h-9 w-full max-w-28 rounded-md" />

        <!-- View Details Button -->
        <USkeleton class="mt-3 h-9 w-full max-w-32 rounded-md" />
      </div>
    </div>

    <!-- Products Preview -->
    <div class="border-t border-t-gray-300 pt-4">
      <div class="flex flex-wrap gap-3">
        <div v-for="i in 2" :key="i" class="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <!-- Product Image (emoji placeholder size) -->
          <USkeleton class="h-12 w-12 rounded-lg" />

          <div class="space-y-2">
            <!-- Product Name -->
            <USkeleton class="h-4 max-w-32 rounded-md" />
            <!-- Qty -->
            <USkeleton class="h-4 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-4 flex flex-wrap gap-2">
      <USkeleton v-for="i in 3" :key="i" class="h-10 flex-1 rounded-lg" />
    </div>
  </div>
</template>
