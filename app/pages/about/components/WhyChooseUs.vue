<template>
  <div
    class="my-12 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12 text-center text-white"
  >
    <h2 class="mb-6 text-4xl font-bold">Why Choose Fashion Store?</h2>
    <p class="mx-auto mb-12 max-w-3xl text-xl text-blue-100">
      We're more than just an online store. We're your fashion partner, committed to your style
      journey.
    </p>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
        <div
          class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
        >
          <UIcon name="i-lucide-trending-up" class="h-6 w-6" />
        </div>
        <h3 class="mb-3 text-xl font-bold">Trending Collections</h3>
        <p class="text-blue-100">
          Stay ahead with our curated selection of the latest fashion trends
        </p>
      </div>
      <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
        <div
          class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
        >
          <UIcon name="i-heroicons-users" class="h-6 w-6" />
        </div>
        <h3 class="mb-3 text-xl font-bold">Community Driven</h3>
        <p class="text-blue-100">Join a community of 50,000+ fashion enthusiasts worldwide</p>
      </div>
      <div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
        <div
          class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20"
        >
          <UIcon name="i-heroicons-globe-alt" class="h-6 w-6" />
        </div>
        <h3 class="mb-3 text-xl font-bold">Global Reach</h3>
        <p class="text-blue-100">Fast shipping to 25+ countries with local support</p>
      </div>
    </div>
    <UButton
      size="xl"
      class="dark mt-12"
      color="neutral"
      label="Start Shopping Now"
      to="/products"
      viewTransition
    />
  </div>
</template>
