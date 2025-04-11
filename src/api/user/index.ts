import request from '@/utils/request'
import type { peginationType } from '../pegination/type'
import type { role } from './type'
import type { user } from './type'

enum API {
  LOGIN_URL = 'api_login',
  LOGOUT_URL = 'api_logout',
  USER_LIST_URL = 'user_list',
  ADD_USER_URL = 'api_add_user',
  DELETE_USER_URL = 'api_delete_user',
  GET_USER_URL = 'api_get_user',
  UPDATE_USER_URL = 'api_update_user',
  ADD_ROLE_URL = 'api_add_role',
  GET_ROLES_URL = 'api_get_roles',
  GET_ROLE_LIST_URL = 'api_get_role_list',
  DELETE_ROLE_URL = 'api_delete_role',
  ADD_ROLE_TO_USER_URL = 'api_add_role_to_user',
  SEARCH_USER_URL = 'api_search_user',
  Batch_Delete_URL = 'api_users_batch_delete',
}

export const reqLogin = async (username: string, password: string) => {
  const token = await request.post(API.LOGIN_URL, { username, password })
  return token
}

export const reqGetUser = async (user_id: number) => {
  const data = await request.get(API.GET_USER_URL + `/${user_id}`)
  return data
}

export const reqLogout = async () => {
  const message = await request.get(API.LOGOUT_URL)
  return message
}

export const reqGetUserList = async (pegination: peginationType) => {
  const data = await request.post(API.USER_LIST_URL, { pegination })
  return data
}

export const reqAddUser = async (userInfo: user) => {
  const data = await request.post(API.ADD_USER_URL, { userInfo })
  return data
}

export const reqUpdateUser = async (userInfo: user) => {
  const data = await request.post(API.UPDATE_USER_URL, { userInfo })
  return data
}

export const reqDeleteUser = async (user_id: number) => {
  const data = await request.get(API.DELETE_USER_URL + `/${user_id}`)
  return data
}

export const reqAddRole = async (role: role) => {
  const data = await request.post(API.ADD_ROLE_URL, { role })
  return data
}

export const reqGetRoles = async (pegination: peginationType) => {
  const data = await request.post(API.GET_ROLES_URL, { pegination })
  return data
}

export const reqGetRoleList = async () => {
  const data = await request.get(API.GET_ROLE_LIST_URL)
  return data
}

export const reqDeleteRole = async (role_id: number) => {
  const data = await request.get(API.DELETE_ROLE_URL + `/${role_id}`)
  return data
}

export const reqAddRoleToUser = async (user: user) => {
  const data = await request.post(API.ADD_ROLE_TO_USER_URL, { user })
  return data
}
export const reqSearchUser = async (pegination: peginationType) => {
  const data = await request.post(API.SEARCH_USER_URL, { pegination })
  return data
}

export const reqBatchDelete = async (ids: number[]) => {
  const data = await request.post(API.Batch_Delete_URL, { ids })
  return data
}
