<script setup lang="ts">
import type { Item } from '~/services/order.service'

defineProps<{
  item: Item
}>()
</script>

<template>
  <div class="border-b border-gray-200 py-4 last:border-b-0">
    <div class="flex gap-4">
      <!-- Product Image -->
      <div class="border-default aspect-square w-20 shrink-0 rounded-md border">
        <NuxtImg
          v-if="item.image"
          :src="item.image"
          alt="Product"
          class="h-full w-full rounded-md object-cover"
        />
      </div>

      <!-- Product Info -->
      <div class="flex-1">
        <h3 class="font-medium">
          {{ item.name }}
        </h3>

        <!-- Variants -->
        <div
          v-if="item.size || item.color"
          class="mt-1 flex items-center gap-4 text-sm text-gray-600"
        >
          <span v-if="item.color" class="flex items-center gap-1">
            Color:
            <span
              class="inline-block h-4 w-4 rounded border"
              :style="{ backgroundColor: item.color }"
            />
          </span>

          <span v-if="item.size"> Size: {{ item.size }} </span>
        </div>

        <!-- Qty + Price -->
        <div class="mt-2 flex justify-between text-sm">
          <span>Qty: {{ item.quantity }}</span>
          <span class="font-medium"> ${{ (item.price * item.quantity).toFixed(2) }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
