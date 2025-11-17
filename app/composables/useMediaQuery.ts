// composables/useMediaQuery.ts
export const useMediaQuery = (query: string) => {
  const matches = ref(false)

  onMounted(() => {
    const media = window.matchMedia(query)
    matches.value = media.matches

    const handler = (e: MediaQueryListEvent) => {
      matches.value = e.matches
    }
    media.addEventListener('change', handler)

    onScopeDispose(() => {
      media.removeEventListener('change', handler)
    })
  })

  return matches
}
