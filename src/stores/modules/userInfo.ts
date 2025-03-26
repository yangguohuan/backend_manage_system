import { defineStore } from 'pinia'
import { reqUserInfo } from '@/api/user'

export const useUserInfoStore = defineStore('userInfo', () => {
  const user = async () => {
    const userInfo = await reqUserInfo()
    console.log(userInfo)
  }

  return { user }
})
