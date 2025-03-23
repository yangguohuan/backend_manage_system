import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { ElNotification } from 'element-plus'

interface result {
  message: string
  token: string
}

const useUserStore = defineStore('user', () => {
  const userLogin = async (username: string, password: string): Promise<void> => {
    const result = (await reqLogin(username, password)) as unknown as result
    if (result.token) {
      localStorage.setItem('TOKEN', result.token)
      localStorage.setItem('LOGIN', '1')
      ElNotification({
        type: 'success',
        message: result.message,
      })
    } else {
      localStorage.setItem('LOGIN', '0')
      ElNotification({
        type: 'error',
        message: result.message,
      })
    }
  }
  return { userLogin }
})

export default useUserStore
