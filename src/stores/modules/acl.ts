import { defineStore } from 'pinia'
import {
  reqGetPermission,
  reqGetAcls,
  reqGetAcl,
  reqAddAcl,
  reqDeleteAcl,
  reqUpdateAcl,
} from '@/api/acl/index'
import type { ACL } from '@/api/acl/type'

export const useAclStore = defineStore('aclStore', () => {
  const acl = <ACL>{}
  const acls = <ACL[]>[]
  const getPermission = async (role_id: number) => {
    const data = await reqGetPermission(role_id)
    return data
  }
  const getAcls = async () => {
    const data = await reqGetAcls()
    return data
  }
  const getAcl = async (aid: number) => {
    const data = await reqGetAcl(aid)
    return data
  }
  const addAcl = async (acl: ACL) => {
    const data = await reqAddAcl(acl)
    return data
  }
  const updateAcl = async (acl: ACL) => {
    const data = await reqUpdateAcl(acl)
    return data
  }
  const deleteAcl = async (aid: number) => {
    const data = await reqDeleteAcl(aid)
    return data
  }
  return { acl, acls, getPermission, getAcl, getAcls, addAcl, deleteAcl, updateAcl }
})
