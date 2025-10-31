<template>
  <UCollapsible class="flex w-full flex-col gap-2" default-open>
    <UButton
      class="group"
      label="Browse by Categories"
      color="neutral"
      variant="link"
      trailing-icon="i-lucide-chevron-down"
      :ui="{
        base: 'p-0',
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      }"
      block
    />

    <template #content>
      <div class="mt-4 flex flex-col space-y-6">
        <ULink
          class="line-clamp-1"
          v-for="i in 10"
          :to="`/products/category-${i}`"
          :key="i"
          viewTransition
        >
          Category {{ i }}
        </ULink>
      </div>
    </template>
  </UCollapsible>
</template>

<script setup lang="ts"></script>
