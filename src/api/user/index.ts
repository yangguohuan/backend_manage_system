import request from '@/utils/request'
enum API {
  LOGIN_URL = 'api_login',
  USERINFO_URL = 'user/info',
}

export const reqLogin = async (username: string, password: string) => {
  await request.post(API.LOGIN_URL, { username, password }).then((res) => {
    console.log(res)
    return res
  })
}

export const reqUserInfo = async () => {
  await request.get(API.USERINFO_URL)
}
