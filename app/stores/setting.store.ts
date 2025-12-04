import { defineStore } from 'pinia'
import type { SettingResponse } from '~/services/setting.service'
import settingService from '~/services/setting.service'

export const useSettingStore = defineStore('setting', () => {
  const iSFetching = ref<boolean>(false)
  const setting = ref<SettingResponse | null>(null)

  const fetchSetting = async () => {
    iSFetching.value = true
    try {
      const response = await settingService.fetchSetting()
      if (response.data?.success) {
        setting.value = response.data?.data
      } else {
        setting.value = null
      }
    } catch (error) {
      console.error('Failed to fetch setting:', error)
    } finally {
      iSFetching.value = false
    }
  }

  return {
    iSFetching,
    setting,
    fetchSetting,
  }
})
