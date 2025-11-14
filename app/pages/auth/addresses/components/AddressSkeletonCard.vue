<!-- components/AddressCardSkeleton.vue -->
<template>
  <UCard>
    <div class="relative space-y-3">
      <!-- Title + Badge placeholder -->
      <div class="flex items-center justify-between">
        <USkeleton class="h-5 w-32" />
        <USkeleton class="h-6 w-16 rounded-full" />
      </div>

      <!-- Address lines -->
      <div class="space-y-2">
        <USkeleton class="h-4 w-1/5" />
        <USkeleton class="h-4 w-2/5" />
        <USkeleton class="h-4 w-1/5" />
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <USkeleton class="h-10 flex-1 rounded-md" />
        <USkeleton class="h-10 flex-1 rounded-md" />
      </div>
    </template>
  </UCard>
</template>
