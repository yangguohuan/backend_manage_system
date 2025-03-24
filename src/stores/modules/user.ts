import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import { ElNotification } from 'element-plus'
import getTime from '@/utils/time'

interface result {
  message: string
  token: string
}

const useUserStore = defineStore('user', () => {
  // 存储用户登录信息
  const userLogin = async (username: string, password: string): Promise<void> => {
    const result = (await reqLogin(username, password)) as unknown as result
    const timeMessage = getTime()

    // 退而求其次，在仓库里做运算
    // 用户登录方法
    if (result.token) {
      localStorage.setItem('TOKEN', result.token)
      localStorage.setItem('LOGIN', '1')
      ElNotification({
        type: 'success',
        message: result.message,
        title: 'Hi,' + timeMessage,
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
