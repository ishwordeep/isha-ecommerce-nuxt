import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SliderResponse } from '~/services/slider.service'

const sliderData: SliderResponse[] = [
  {
    _id: 'slider_001',
    slug: 'summer-sale-2025',
    isActive: true,
    image: 'https://picsum.photos/640/640?random=1',
    displayOrder: 1,
    createdAt: '2025-06-15T10:00:00.000Z',
    updatedAt: '2025-06-15T10:00:00.000Z',
    isButtonEnabled: true,
    button: {
      link: '/collections/summer',
      title: 'Shop Now',
      textColor: '#FFFFFF',
      bgColor: '#EF4444',
    },
    __v: 0,
  },
  {
    _id: 'slider_002',
    slug: 'new-arrivals-autumn',
    isActive: true,
    image: 'https://picsum.photos/640/640?random=2',
    displayOrder: 2,
    createdAt: '2025-09-01T08:30:00.000Z',
    updatedAt: '2025-09-01T08:30:00.000Z',
    isButtonEnabled: true,
    button: {
      link: '/new-arrivals',
      title: 'Discover',
      textColor: '#1F2937',
      bgColor: '#F59E0B',
    },
    __v: 0,
  },
  {
    _id: 'slider_003',
    slug: 'black-friday-preview',
    isActive: false,
    image: 'https://picsum.photos/640/640?random=3',
    displayOrder: 3,
    createdAt: '2025-10-20T14:15:00.000Z',
    updatedAt: '2025-10-25T09:00:00.000Z',
    isButtonEnabled: false,
    __v: 0,
  },
  {
    _id: 'slider_004',
    slug: 'winter-essentials',
    isActive: true,
    image: 'https://picsum.photos/640/640?random=4',
    displayOrder: 4,
    createdAt: '2025-11-01T06:45:00.000Z',
    updatedAt: '2025-11-01T06:45:00.000Z',
    isButtonEnabled: true,
    button: {
      link: '/winter-collection',
      title: 'Explore Winter',
      textColor: '#FFFFFF',
      bgColor: '#1D4ED8',
    },
    __v: 0,
  },
  {
    _id: 'slider_005',
    slug: 'holiday-gift-guide',
    isActive: true,
    image: 'https://picsum.photos/640/640?random=6',
    displayOrder: 5,
    createdAt: '2025-11-08T12:00:00.000Z',
    updatedAt: '2025-11-08T12:00:00.000Z',
    isButtonEnabled: true,
    button: {
      link: '/gift-guide',
      title: 'Gift Ideas',
      textColor: '#FFFFFF',
      bgColor: '#16A34A',
    },
    __v: 0,
  },
]

export const useSliderStore = defineStore('slider', () => {
  const isLoading = ref(false)
  const sliders = ref<SliderResponse[] | null>(null)
  const fetchSliders = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 5000))
      sliders.value = sliderData
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    fetchSliders,
    sliders,
  }
})
