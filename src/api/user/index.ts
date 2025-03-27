import request from '@/utils/request'

enum API {
  LOGIN_URL = 'api_login',
  USERINFO_URL = 'api_user',
  LOGOUT_URL = 'api_logout',
}

export const reqLogin = async (username: string, password: string) => {
  const token = await request.post(API.LOGIN_URL, { username, password })
  return token
}

export const reqUserInfo = async () => {
  const user = await request.get(API.USERINFO_URL)
  return user
}

export const reqLogout = async () => {
  const message = await request.get(API.LOGOUT_URL)
  return message
}
