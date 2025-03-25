import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('LayoutSetting', () => {
  const fold = false
  const refresh = false
  return { fold, refresh }
})

export default useLayoutSettingStore
