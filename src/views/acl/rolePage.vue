<template>
  <el-card style="height: 80px">
    <el-form
      :inline="true"
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <el-form-item label="角色名">
        <el-input
          placeholder="请输入角色名"
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
    <el-button type="primary" @click="showRole">添加角色</el-button>
    <el-table border style="width: 950px; margin-top: 5px" :data="userStore.roles">
      <el-table-column width="100" align="center" label="序号" type="index"></el-table-column>
      <el-table-column prop="rolename" width="100" label="角色名"></el-table-column>
      <el-table-column prop="date_added" width="200" label="创建时间"></el-table-column>
      <el-table-column prop="date_updated" width="200" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="assignPermission(row.id)"
            :icon="Paperclip"
          >
            分配权限
          </el-button>
          <el-button type="warning" size="small" :icon="Edit" @click="toEdit(row.id)">
            编辑
          </el-button>
          <el-popconfirm :title="`你确定要删除${row.rolename}吗？`" @confirm="deleteRole(row.id)">
            <template #reference>
              <el-button type="danger" :icon="Delete" title="删除" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--分页器-->
    <el-pagination
      style="width: 800px; margin-top: 20px"
      v-model:current-page="peginationStore.pegination.pageNo"
      v-model:page-size="peginationStore.pegination.pageSize"
      :page-sizes="peginationStore.pegination.pageSizes"
      background
      layout="prev, pager, next, jumper, ->,total, sizes"
      :total="peginationStore.pegination.total"
      @size-change="pageSizeChange"
      @current-change="getRoles"
    />
  </el-card>

  <el-dialog v-model="isShowRole" title="添加新角色" width="500" center>
    <el-form label-width="80">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="userStore.roleInfo.rolename"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelAddRole">取消</el-button>
        <el-button type="primary" @click="addRole"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <!--编辑更新角色信息-->
  <el-dialog v-model="isShowRole1" title="编辑角色信息" width="500" center>
    <el-form label-width="80">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="roleStore.role.rolename"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelAddRole">取消</el-button>
        <el-button type="primary" @click="updateRole"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 分配权限 -->
  <el-drawer v-model="drawer" title="分配权限" :with-header="false">
    <h3>分配权限</h3>
    <el-tree
      ref="tree"
      style="max-width: 600px; margin-top: 20px"
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :default-checked-keys="selectArr"
    />
    <template #footer>
      <el-button type="primary" size="small" @click="setAcls">保存</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { role } from '@/api/user/type'
import { usePeginationStore } from '@/stores/modules/Pegination'
import { useRoleStore } from '@/stores/modules/role'
import useUserStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import type { messageType } from '@/api'
import type { peginationType } from '@/api/pegination/type'
import { Paperclip, Edit, Delete } from '@element-plus/icons-vue'
import { useAclStore } from '@/stores/modules/acl'
import type { ACL } from '@/api/acl/type'

const peginationStore = usePeginationStore()
const userStore = useUserStore()
const roleStore = useRoleStore()
const aclStore = useAclStore()

peginationStore.pegination.pageNo = 1
peginationStore.pegination.pageSize = 5
peginationStore.pegination.total = 0

// 角色ID
let subAclId = ref<number>()

// 树形控件，权限分配
let tree = ref()
const defaultProps = {
  children: 'children',
  label: 'label',
}

let data = reactive<ACL[]>([])

// 数组，存储权限id
let selectArr = ref<number[]>([])

// 是否展示角色添加
const isShowRole = ref<boolean>(false)
const isShowRole1 = ref<boolean>(false)

// 分配角色的抽屉
const drawer = ref<boolean>(false)

// 添加角色
const showRole = () => {
  isShowRole.value = true
}

// 获取所有角色信息
const getRoles = async () => {
  const data = (await userStore.getRoles(
    peginationStore.pegination as unknown as peginationType,
  )) as unknown as peginationType
  peginationStore.pegination.pageNo = data.pageNo as number
  peginationStore.pegination.pageSize = data.pageSize as number
  peginationStore.pegination.total = data.totalCount as number
  userStore.roles = data.data as role[]
}

// 取消
const cancelAddRole = () => {
  isShowRole.value = false
  isShowRole1.value = false
}

// 确认
const addRole = async () => {
  const data = (await userStore.addRole(userStore.roleInfo)) as unknown as messageType
  isShowRole.value = false
  userStore.roleInfo.rolename = ''
  getRoleList()
  ElMessage.success(data.message)
}

// 更新
const updateRole = async () => {
  const data = (await roleStore.updateRole(roleStore.role)) as unknown as messageType
  ElMessage.success(data.message)
  getRoleList()
  isShowRole1.value = false
}

// 删除角色
const deleteRole = async (role_id: number) => {
  const data = (await userStore.deleteRole(role_id)) as unknown as messageType
  ElMessage.success(data.message)
  getRoleList()
}

// 分配权限
const assignPermission = (role_id: number) => {
  subAclId.value = role_id
  getAcls(role_id)
  drawer.value = true
  getRoleList()
}

// 编辑更新角色名
const toEdit = async (role_id: number) => {
  roleStore.role = (await roleStore.getRole(role_id)) as unknown as role
  isShowRole1.value = true
}

// 搜索
const search = async () => {
  const data = (await roleStore.getSearchRoles(
    peginationStore.pegination as unknown as peginationType,
  )) as unknown as peginationType
  peginationStore.pegination.pageNo = data.pageNo as number
  peginationStore.pegination.pageSize = data.pageSize as number
  peginationStore.pegination.total = data.totalCount as number
  userStore.roles = data.data as role[]
}

// 判断为搜索出来的结果，判断在操作完成后的刷新
const getRoleList = () => {
  if (peginationStore.pegination.keyword) {
    search()
  } else {
    getRoles()
  }
}

// 重置
const reset = () => {
  peginationStore.pegination.keyword = ''
  getRoles()
}

const getAcls = async (role_id: number) => {
  // selectArr.value.length = 0
  const result = (await aclStore.getPermission(role_id)) as unknown as messageType
  data = result.acls as ACL[]
  selectArr.value = result.selectAcls as number[]
  // console.log(result)
}

// 当页码改变时
const pageSizeChange = () => {
  peginationStore.pegination.pageNo = 1
  getRoles()
}

// 设置选择的权限
const setAcls = async () => {
  const arr = tree.value.getCheckedNodes()
  const arr_ids = arr.map((node: ACL) => node.id)
  arr_ids.push(subAclId.value)
  const data = (await roleStore.setAcls(arr_ids)) as unknown as messageType
  // console.log(data)
  ElMessage.success(data.message)
  drawer.value = false
}

onMounted(() => {
  getRoles()
})
</script>

<style scoped></style>
