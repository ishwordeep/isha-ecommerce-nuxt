// composables/useProductSeo.ts
import type { ProductResponse } from '~/services/product.service'

export function useProductSeo(product: Ref<ProductResponse | null | undefined>) {
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl

  const image = computed(() => {
    if (!product.value) return ''
    const img = Array.isArray(product.value.image) ? product.value.image[0] : product.value.image
    return img || ''
  })

  const canonicalUrl = computed(() =>
    product.value?.slug ? `${siteUrl}/product/${product.value.slug}` : siteUrl
  )

  useSeoMeta({
    title: () => (product.value?.name ? `${product.value.name} | MyStore` : 'Product | MyStore'),
    description: () =>
      product.value?.description || `Buy ${product.value?.name || 'this product'} online.`,

    ogTitle: () => product.value?.name || 'Product',
    ogDescription: () => product.value?.description || 'Check out this product!',
    ogImage: () => image.value,

    twitterCard: 'summary_large_image',
    twitterTitle: () => product.value?.name || 'Product',
    twitterDescription: () => product.value?.description || 'Product details',
    twitterImage: () => image.value,
  })
}
