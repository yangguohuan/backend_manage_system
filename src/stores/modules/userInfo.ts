import { defineStore } from 'pinia'
import { reqLogout, reqUserInfo } from '@/api/user'
import type { user } from '@/api/user/type'

const useUserInfoStore = defineStore('userInfo', () => {
  const user = async () => {
    const userInfo = (await reqUserInfo()) as unknown as user
    localStorage.setItem('username', userInfo.username)
    localStorage.setItem('email', userInfo.email)
    localStorage.setItem('signature', userInfo.signature)
    const user_type = String(userInfo.user_type)
    localStorage.setItem('user_type', user_type)
    localStorage.setItem('data_added', userInfo.data_added)
    return userInfo
  }
  const logout = async () => {
    const logoutMethod = await reqLogout()
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('signature')
    localStorage.removeItem('user_type')
    localStorage.removeItem('data_added')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('LOGIN')
    return logoutMethod
  }
  return { user, logout }
})

export default useUserInfoStore
