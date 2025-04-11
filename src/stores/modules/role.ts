import { defineStore } from 'pinia'
import type { role } from '@/api/user/type'
import { reqSearchRoles, reqGetRole, reqUpdateRole } from '@/api/role'
import { reqSetAcls } from '@/api/acl/index'
import type { peginationType } from '@/api/pegination/type'

export const useRoleStore = defineStore('roleStore', () => {
  const role = <role>{}

  const getSearchRoles = async (pegination: peginationType) => {
    const data = await reqSearchRoles(pegination)
    return data
  }

  const getRole = async (role_id: number) => {
    const data = await reqGetRole(role_id)
    return data
  }

  const updateRole = async (role: role) => {
    const data = await reqUpdateRole(role)
    return data
  }

  const setAcls = async (ids: number[]) => {
    const data = await reqSetAcls(ids)
    return data
  }

  return { role, getSearchRoles, getRole, updateRole, setAcls }
})
