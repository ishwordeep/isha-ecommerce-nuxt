import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SliderResponse } from '~/services/slider.service'
import SliderService from '~/services/slider.service'

export const useSliderStore = defineStore('slider', () => {
  const isLoading = ref(false)
  const sliders = ref<SliderResponse[] | null>(null)
  const fetchSliders = async () => {
    isLoading.value = true
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000))

      const response = await SliderService.fetchSliders()
      if (response.data?.success && response.data?.data) {
        sliders.value = response.data.data
      }
    } catch (error) {
      // Handle error if needed
      console.log(error)
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
