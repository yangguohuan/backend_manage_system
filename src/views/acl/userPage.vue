<template>
  <el-card style="height: 80px">
    <el-form
      :inline="true"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入用户名"
          v-model="peginationStore.pegination.keyword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 20px">
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <el-button type="danger" @click="batchDelete" :disabled="selectedRows.length === 0">
      批量删除
    </el-button>
    <el-table
      style="width: 100%; margin-top: 10px"
      :data="userStore.userList"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column width="50" type="selection" align="center"></el-table-column>
      <el-table-column width="50" type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="id" width="50" label="ID" align="center"></el-table-column>
      <el-table-column prop="username" width="160" label="用户名" align="center"></el-table-column>
      <el-table-column prop="nickname" width="160" label="昵称" align="center"></el-table-column>
      <el-table-column width="200" label="角色" align="center">
        <template #default="{ row }">
          <el-tag style="margin: 2px" type="info" v-for="r in row.roles" :key="r.id">{{
            r.rolename
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="date_added"
        width="250"
        label="创建时间"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="date_updated"
        width="250"
        label="更新时间"
        align="center"
      ></el-table-column>
      <el-table-column width="350" label="操作" fixed="right" align="center">
        <template #default="{ row }">
          <el-button-group>
            <el-button type="warning" :icon="User" @click="assignRole(row.id)" size="small">
              分配角色
            </el-button>
            <el-button type="warning" :icon="Edit" @click="editUser(row.id)" size="small">
              编辑
            </el-button>
            <el-popconfirm :title="`你确定要删除${row.username}吗？`" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="warning" :icon="Delete" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <el-pagination
      style="margin-top: 20px"
      v-model:current-page="peginationStore.pegination.pageNo"
      v-model:page-size="peginationStore.pegination.pageSize"
      :page-sizes="peginationStore.pegination.pageSizes"
      background
      layout="prev, pager, next, jumper, ->,total, sizes"
      :total="peginationStore.pegination.total"
      @size-change="getUserList"
      @current-change="getUserList"
    />
  </el-card>

  <!--添加用户的抽屉-->
  <el-drawer v-model="isAddUser">
    <template #header>
      <div>添加用户</div>
    </template>
    <template #default>
      <el-form label-width="60" style="width: 300px">
        <el-form-item label="用户名">
          <el-input v-model="userStore.userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userStore.userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userStore.userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>

  <!--编辑用户信息的抽屉-->
  <el-drawer v-model="isEditUser">
    <template #header>
      <div>编辑用户信息</div>
    </template>
    <template #default>
      <el-form label-width="100">
        <el-form-item label="修改用户名">
          <el-input
            :value="userStore.userInfo.username"
            v-model="userStore.userInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="修改昵称">
          <el-input
            :value="userStore.userInfo.nickname"
            v-model="userStore.userInfo.nickname"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">保存</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>

  <!--给用户分配角色的抽屉-->
  <el-drawer v-model="isAssignRole" title="给用户添加角色" @open="openAssignRole">
    <template #default>
      <el-form label-width="80">
        <el-form-item label="用户名">
          <el-input :value="userStore.userInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <div style="width: 100%">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
          </div>
          <el-checkbox-group v-model="userStore.userInfo.roles" @change="handleCheckedRolesChange">
            <el-checkbox v-for="r in userStore.roles" :key="r.id" :label="r.rolename" :value="r" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="saveRoles">保存</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { usePeginationStore } from '@/stores/modules/Pegination'
import type { role, user } from '@/api/user/type'
import useUserStore from '@/stores/modules/user'
import { onMounted, ref } from 'vue'
import type { peginationType } from '@/api/pegination/type'
import { ElMessage } from 'element-plus'
import type { messageType } from '@/api'
import type { CheckboxValueType } from 'element-plus'

let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)

// 存储选中的行数据
const selectedRows = ref<user[]>([])

// 监听选中变化
const handleSelectionChange = (selection: user[]) => {
  selectedRows.value = selection
}

// 批量删除
const batchDelete = () => {
  // 获取选中行的 ID 列表
  const ids = selectedRows.value.map((row) => row.id) as number[]

  // 调用删除接口（这里假设有一个 deleteUserByIds 方法）
  deleteUserByIds(ids).then(() => {
    // 过滤掉已删除的数据
    userStore.userList = userStore.userList.filter((user) => !ids.includes(user.id as number))
  })
}

// 批量删除接口
const deleteUserByIds = async (ids: number[]) => {
  const data = (await userStore.batchDelete(ids)) as unknown as messageType
  ElMessage.success(data.message)
}

const handleCheckAllChange = (val: boolean) => {
  userStore.userInfo.roles = val ? userStore.roles : []
  isIndeterminate.value = false
}

const handleCheckedRolesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === userStore.roles.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < userStore.roles.length
}

// 是否显示添加用户的抽屉
let isAddUser = ref<boolean>(false)
// 是否显示编辑用户的抽屉
let isEditUser = ref<boolean>(false)
// 给用户分配角色的抽屉
let isAssignRole = ref<boolean>(false)

const peginationStore = usePeginationStore()
const userStore = useUserStore()

const getUserList = async () => {
  const data = (await userStore.getUserList(
    peginationStore.pegination as unknown as peginationType,
  )) as unknown as peginationType
  userStore.userList = data.data as unknown as user[]
  peginationStore.pegination.pageNo = data.currentPage as unknown as number
  peginationStore.pegination.pageSize = data.pageSize as unknown as number
  peginationStore.pegination.total = data.totalCount as unknown as number
}

const getRoleList = async () => {
  const data = await userStore.getRoleList()
  userStore.roles = data as unknown as role[]
}

const deleteUser = async (user_id: number) => {
  const data = (await userStore.deleteUser(user_id)) as unknown as messageType
  ElMessage.success(data.message)
  getNewUserList()
}

// 添加用户
const addUser = () => {
  clearData()
  isAddUser.value = true
}

// 编辑用户
const editUser = async (user_id: number) => {
  userStore.userInfo = (await userStore.getUser(user_id)) as unknown as user
  isEditUser.value = true
}

// 给用户分配权限
const assignRole = async (user_id: number) => {
  userStore.userInfo = (await userStore.getUser(user_id)) as unknown as user
  isAssignRole.value = true
}

// 保存
const save = async () => {
  const data = (await userStore.addUser(userStore.userInfo)) as unknown as messageType
  ElMessage.success(data.message)
  isAddUser.value = false
  getNewUserList()
  clearData()
}

// 保存更新用户角色
const saveRoles = async () => {
  // console.log(userStore.userInfo)
  const data = (await userStore.addRoleToUser(userStore.userInfo)) as unknown as messageType
  getNewUserList()
  isAssignRole.value = false
  ElMessage.success(data.message)
}

// 更新
const update = async () => {
  const data = (await userStore.updateUser(userStore.userInfo)) as unknown as messageType
  ElMessage.success(data.message)
  getNewUserList()
  clearData()
  isEditUser.value = false
}

const clearData = () => {
  const userRoles = Array.isArray(userStore.userInfo.roles) ? userStore.userInfo.roles : [] // 判断角色是否为空，如果为空则赋值空数组
  userStore.userInfo.id = 0
  userStore.userInfo.username = ''
  userStore.userInfo.nickname = ''
  userStore.userInfo.password = ''
  userStore.userInfo.date_added = ''
  userStore.userInfo.date_updated = ''
  userStore.userInfo.role = ''
  userRoles.length = 0
}

// 搜索
const search = async () => {
  const data = (await userStore.searchUser(
    peginationStore.pegination as unknown as peginationType,
  )) as unknown as peginationType
  userStore.userList = data.data as unknown as user[]
  peginationStore.pegination.pageNo = data.currentPage as unknown as number
  peginationStore.pegination.pageSize = data.pageSize as unknown as number
  peginationStore.pegination.total = data.totalCount as unknown as number
}

// 打开分配角色的抽屉时，立即判断勾选
const openAssignRole = () => {
  // @ts-expect-error: no error
  checkAll.value = userStore.userInfo.roles.length === userStore.roles.length

  isIndeterminate.value =
    // @ts-expect-error: no error
    userStore.userInfo.roles.length > 0 && userStore.userInfo.roles.length < userStore.roles.length
}

// 重置，获取所有用户，并清空关键字搜索框
const reset = () => {
  getUserList()
  peginationStore.pegination.keyword = ''
}

// 判断为搜索出来的结果，判断在操作完成后的刷新
const getNewUserList = () => {
  if (peginationStore.pegination.keyword) {
    search()
  } else {
    getUserList()
  }
}

onMounted(() => {
  // 初始化页码
  peginationStore.pegination.pageNo = 1
  peginationStore.pegination.pageSize = 5
  getUserList()
  getRoleList()
})
</script>

<style scoped></style>
