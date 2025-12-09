import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AboutResponse } from '~/services/about.service'
import AboutService from '~/services/about.service'

export const useAboutStore = defineStore('about', () => {
  const about = ref<AboutResponse | null>(null)
  const isFetching = ref(false)

  const setAbout = (data: AboutResponse) => {
    about.value = data
  }

  const clearAbout = () => {
    about.value = null
  }

  const fetchAbout = async () => {
    isFetching.value = true
    try {
      // Simulate an API call to fetch about information
      const response = await AboutService.fetchAbout()
      if (response.data?.success) {
        setAbout(response.data.data as AboutResponse)
      }
      return response
    } catch (error) {
      console.error('Failed to fetch about information:', error)
    } finally {
      isFetching.value = false
    }
  }

  return {
    about,
    setAbout,
    clearAbout,
    fetchAbout,
    isFetching,
  }
})
