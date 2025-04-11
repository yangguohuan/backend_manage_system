import request from '@/utils/request'
import type { ACL } from './type'

enum API {
  GET_PERMISSIONS_URL = '/permission_manage/api_get_permissions',
  SET_ACLS_URL = '/permission_manage/api_set_select',
  GET_ACLS_URL = '/permission_manage/api_get_acls',
  GET_ACL_URL = '/permission_manage/api_get_acl',
  ADD_ACL_URL = '/permission_manage/api_add_acl',
  DELETE_ACL_URL = '/permission_manage/api_delete_acl',
  UPDATE_ACL_URL = '/permission_manage/api_update_acl',
}

export const reqGetPermission = async (role_id: number) => {
  const data = await request.get(API.GET_PERMISSIONS_URL + `/${role_id}`)
  return data
}

export const reqSetAcls = async (ids: number[]) => {
  const data = await request.post(API.SET_ACLS_URL, { ids })
  return data
}

export const reqGetAcls = async () => {
  const data = await request.get(API.GET_ACLS_URL)
  return data
}

export const reqGetAcl = async (aid: number) => {
  const data = await request.get(API.GET_ACL_URL + `/${aid}`)
  return data
}

export const reqAddAcl = async (acl: ACL) => {
  const data = await request.post(API.ADD_ACL_URL, { acl })
  return data
}

export const reqUpdateAcl = async (acl: ACL) => {
  const data = await request.post(API.UPDATE_ACL_URL, { acl })
  return data
}

export const reqDeleteAcl = async (aid: number) => {
  const data = await request.get(API.DELETE_ACL_URL + `/${aid}`)
  return data
}
