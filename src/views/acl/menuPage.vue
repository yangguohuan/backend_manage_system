<template>
  <el-card>
    <el-table :data="aclStore.acls" style="width: 100%; margin-bottom: 20px" row-key="id" border>
      <el-table-column prop="label" label="权限名称" sortable />
      <el-table-column prop="tag" label="权限值" sortable />
      <el-table-column prop="date_updated" label="更新时间" sortable />
      <el-table-column label="操作" sortable>
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 2"
              @click="addMenu(row.id)"
              >添加菜单</el-button
            >
            <el-button
              type="primary"
              size="small"
              :disabled="row.level == 1"
              @click="toEdit(row.id)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :title="`你确定要删除${row.label}吗？`"
              @confirm="toDelete(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" :disabled="row.level == 1">删除</el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!--添加菜单-->
  <el-dialog v-model="menuDialog" title="添加菜单" width="500" destroy-on-close center>
    <el-form style="width: 350px" label-width="100">
      <el-form-item label="权限名称">
        <el-input type="text" v-model="aclStore.acl.label"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input type="text" v-model="aclStore.acl.tag"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="menuDialog = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </template>
  </el-dialog>

  <!--修改菜单-->
  <el-dialog v-model="menuDialog1" title="修改菜单" width="500" destroy-on-close center>
    <el-form style="width: 350px" label-width="100">
      <el-form-item label="权限名称">
        <el-input type="text" v-model="aclStore.acl.label"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input type="text" v-model="aclStore.acl.tag"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="menuDialog1 = false">取消</el-button>
        <el-button type="primary" @click="change">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useAclStore } from '@/stores/modules/acl'
import { onMounted, ref } from 'vue'
import type { ACL } from '@/api/acl/type'
import { ElMessage } from 'element-plus'
import type { messageType } from '@/api'

const aclStore = useAclStore()

const getAcls = async () => {
  aclStore.acls = (await aclStore.getAcls()) as unknown as ACL[]
}

// 定义添加和编辑的对话款
let menuDialog = ref<boolean>(false)
let menuDialog1 = ref<boolean>(false)

// 添加菜单
const addMenu = (aid: number) => {
  clearData()
  menuDialog.value = true
  aclStore.acl.id = aid
}

// 编辑菜单
const toEdit = async (aid: number) => {
  menuDialog1.value = true
  aclStore.acl = (await aclStore.getAcl(aid)) as unknown as ACL
}

// 删除菜单
const toDelete = async (aid: number) => {
  const data = (await aclStore.deleteAcl(aid)) as unknown as messageType
  ElMessage.success(data.message)
  getAcls()
}

// 保存
const save = async () => {
  const a = aclStore.acl.label
  const b = aclStore.acl.tag
  if (a && b) {
    try {
      const data = (await aclStore.addAcl(aclStore.acl)) as unknown as messageType
      ElMessage.success(data.message)
    } catch (error) {
      ElMessage.error('保存失败')
      console.log(error)
    }
  } else {
    ElMessage.error('属性值和属性名称均不能为空')
  }
  menuDialog.value = false
  getAcls()
  clearData()
}

// 修改
const change = async () => {
  const data = (await aclStore.updateAcl(aclStore.acl)) as unknown as messageType
  ElMessage.success(data.message)
  menuDialog1.value = false
  getAcls()
}

const clearData = () => {
  aclStore.acl.label = ''
  aclStore.acl.tag = ''
}

onMounted(() => {
  getAcls()
})
</script>

<style scoped></style>
