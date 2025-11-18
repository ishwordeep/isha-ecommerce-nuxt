<script setup lang="ts">
interface Statement {
  icon: string
  title: string
  description: string
  gradient: string // for the icon background
}

const statements = ref<Statement[]>([
  {
    icon: 'i-heroicons-target',
    title: 'Our Mission',
    description:
      'To empower individuals to express their unique style through carefully curated fashion that combines quality, affordability, and sustainability.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: 'i-heroicons-sparkles',
    title: 'Our Vision',
    description:
      "To become the world's most trusted and loved fashion destination, setting new standards for customer experience and sustainable retail.",
    gradient: 'from-purple-500 to-purple-600',
  },
])

// Icon options (same as Core Values)
const iconOptions = [
  'i-heroicons-target',
  'i-heroicons-sparkles',
  'i-heroicons-heart',
  'i-heroicons-light-bulb',
  'i-heroicons-globe-alt',
  'i-heroicons-shield-check',
  'i-heroicons-star',
  'i-heroicons-rocket-launch',
]

const gradients = [
  { label: 'Blue', value: 'from-blue-500 to-blue-600' },
  { label: 'Purple', value: 'from-purple-500 to-purple-600' },
  { label: 'Green', value: 'from-green-500 to-green-600' },
  { label: 'Pink', value: 'from-pink-500 to-pink-600' },
  { label: 'Orange', value: 'from-orange-500 to-orange-600' },
  { label: 'Teal', value: 'from-teal-500 to-teal-600' },
]

const onSubmit = () => {
  console.log('Brand Philosophy saved →', statements.value)
}
</script>

<template>
  <UPageCard title="Brand Philosophy" class="mx-auto max-w-5xl">
    <template #description>
      Define your Mission and Vision (or any two core statements). They will appear side-by-side
      with beautiful icons.
    </template>

    <!-- Live Preview -->
    <div class="mb-10 grid gap-8 md:grid-cols-2">
      <div
        v-for="(item, i) in statements"
        :key="i"
        class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
      >
        <div class="mb-6 flex justify-center">
          <div
            :class="`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${item.gradient} shadow-lg`"
          >
            <UIcon :name="item.icon" class="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 class="mb-4 text-center text-2xl font-bold text-gray-900">
          {{ item.title }}
        </h3>
        <p class="text-center leading-relaxed text-gray-600">
          {{ item.description }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <div class="space-y-8">
      <div
        v-for="(item, index) in statements"
        :key="index"
        class="rounded-xl border bg-gray-50/50 p-6"
      >
        <h4 class="mb-6 text-lg font-semibold">Statement {{ index + 1 }}</h4>

        <!-- Icon -->
        <UFormField label="Icon" required class="mb-5">
          <USelectMenu
            v-model="item.icon"
            :items="iconOptions"
            searchable
            placeholder="Choose an icon"
          >
            <template #item="{ item: icon }">
              <UIcon :name="icon" class="mr-3 h-5 w-5" />
              {{ icon }}
            </template>
          </USelectMenu>
        </UFormField>

        <!-- Gradient -->
        <UFormField label="Icon Background Color" required class="mb-5">
          <USelectMenu v-model="item.gradient" :items="gradients" value-key="value">
            <template #item="{ item }">
              <div class="flex items-center gap-3">
                <div :class="`h-8 w-8 rounded-lg bg-linear-to-br ${item.value}`" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </USelectMenu>
        </UFormField>

        <!-- Title -->
        <UFormField label="Title" required class="mb-5">
          <UInput v-model="item.title" placeholder="Our Mission" size="lg" class="font-bold" />
        </UFormField>

        <!-- Description -->
        <UFormField label="Description" required>
          <UTextarea
            v-model="item.description"
            placeholder="To empower individuals to express their unique style..."
            autoresize
            :rows="4"
            size="lg"
          />
        </UFormField>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="mt-12 flex justify-end gap-4">
      <UButton variant="outline" size="lg">Skip</UButton>
      <UButton color="neutral" size="lg" @click="onSubmit"> Save & Next </UButton>
    </div>

    <!-- Debug -->
    <details class="mt-10 text-xs text-gray-500">
      <summary>Debug: Current statements</summary>
      <pre>{{ statements }}</pre>
    </details>
  </UPageCard>
</template>
