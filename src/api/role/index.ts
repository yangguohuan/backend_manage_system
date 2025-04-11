import request from '@/utils/request'
import type { peginationType } from '../pegination/type'
import type { role } from '../user/type'

enum API {
  SEARCH_ROLES_URL = '/role_manage/api_search_roles',
  GET_ROLE_URL = '/role_manage/api_get_role',
  UPDATE_ROLE_URL = '/role_manage/api_update_role',
}

export const reqSearchRoles = async (pegination: peginationType) => {
  const data = await request.post(API.SEARCH_ROLES_URL, { pegination })
  return data
}

export const reqGetRole = async (role_id: number) => {
  const data = await request.get(API.GET_ROLE_URL + `/${role_id}`)
  return data
}

export const reqUpdateRole = async (role: role) => {
  const data = await request.post(API.UPDATE_ROLE_URL, { role })
  return data
}
