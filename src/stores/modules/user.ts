import { defineStore } from 'pinia'
import {
  reqLogin,
  reqLogout,
  reqGetUserList,
  reqAddUser,
  reqDeleteUser,
  reqGetUser,
  reqUpdateUser,
  reqAddRole,
  reqGetRoles,
  reqDeleteRole,
  reqGetRoleList,
  reqAddRoleToUser,
  reqSearchUser,
  reqBatchDelete,
} from '@/api/user'
import { ElNotification } from 'element-plus'
import getTime from '@/utils/time'
import type { user } from '@/api/user/type'
import type { peginationType } from '@/api/pegination/type'
import type { role } from '@/api/user/type'

interface result {
  message: string
  token: string
}

const useUserStore = defineStore('user', () => {
  const userInfo = <user>{}
  const userList = <user[]>[]
  const roleInfo = <role>{}
  const roles = <role[]>[]
  const addUser = async (user: user) => {
    const data = await reqAddUser(user)
    return data
  }
  const addRole = async (role: role) => {
    const data = await reqAddRole(role)
    return data
  }
  const getRoles = async (pegination: peginationType) => {
    const data = await reqGetRoles(pegination)
    return data
  }
  const getRoleList = async () => {
    const data = await reqGetRoleList()
    return data
  }
  const updateUser = async (user: user) => {
    const data = await reqUpdateUser(user)
    return data
  }
  const deleteUser = async (user_id: number) => {
    const data = await reqDeleteUser(user_id)
    return data
  }
  const getUserList = async (pegination: peginationType) => {
    const data = await reqGetUserList(pegination)
    return data
  }
  const getUser = async (user_id: number) => {
    const data = await reqGetUser(user_id)
    return data
  }
  const addRoleToUser = async (user: user) => {
    const data = await reqAddRoleToUser(user)
    return data
  }
  const searchUser = async (pegination: peginationType) => {
    const data = await reqSearchUser(pegination)
    return data
  }
  // 批量删除
  const batchDelete = async (ids: number[]) => {
    const data = await reqBatchDelete(ids)
    return data
  }
  // 存储用户登录信息
  const userLogin = async (username: string, password: string): Promise<void> => {
    const result = (await reqLogin(username, password)) as unknown as result
    const timeMessage = getTime()

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
  const userLogout = async () => {
    const data = await reqLogout()
    return data
  }
  const deleteRole = async (role_id: number) => {
    const data = await reqDeleteRole(role_id)
    return data
  }
  return {
    roleInfo,
    userInfo,
    userList,
    roles,
    addRole,
    userLogin,
    getUserList,
    addUser,
    deleteUser,
    getUser,
    updateUser,
    userLogout,
    getRoles,
    deleteRole,
    getRoleList,
    addRoleToUser,
    searchUser,
    batchDelete,
  }
})

export default useUserStore
