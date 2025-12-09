// composables/useAboutSeo.ts
import type { AboutResponse } from '~/services/about.service'

export function useAboutSeo(about: Ref<AboutResponse | null | undefined>) {
  const runtimeConfig = useRuntimeConfig()
  const appUrl = runtimeConfig.public.appUrl
  const settingStore = useSettingStore()
  const image = computed(() => {
    if (!about) return ''
    const img = settingStore.setting?.logoUrl
    return img || ''
  })

  useSeoMeta({
    title: () =>
      about.value?.hero.mainTitle ? `${about.value?.hero.mainTitle}` : 'About Parish Jat Leo',
    description: () => about.value?.hero.subtitle || 'Welcome to Parish Jat Leo official website.',
    ogUrl: appUrl,
    ogTitle: () => about.value?.hero.mainTitle || 'Parish Jat Leo',
    ogDescription: () =>
      about.value?.hero.subtitle || 'Welcome to Parish Jat Leo official website.',
    ogImage: () => image.value,

    twitterCard: 'summary_large_image',
    twitterTitle: () => about.value?.hero.mainTitle || 'Parish Jat Leo',
    twitterDescription: () =>
      about.value?.hero.subtitle || 'Welcome to Parish Jat Leo official website.',
    twitterImage: () => image.value,
  })
}
