<template>
  <div>
    <category></category>

    <el-card style="max-width: 100%; margin-top: 20px">
      <div v-show="categoryStore.divSelector == 0" style="width: 750px">
        <el-button
          type="primary"
          :icon="Plus"
          :disabled="categoryStore.thirdCategoryId == 0"
          @click="showAddArea"
        >
          添加属性
        </el-button>
        <el-table border :data="attrArray" style="margin-top: 20px">
          <el-table-column type="index" align="center" label="序号" width="120" />
          <el-table-column prop="name" type="default" align="center" label="属性名称" width="180" />
          <el-table-column type="default" align="center" label="属性值">
            <template #default="{ row }">
              <el-tag type="primary" v-for="v in row.attribute_values" :key="v.id">
                {{ v.name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column type="default" align="center" label="操作" width="180" prop="id">
            <template #default="{ row }">
              <el-button
                type="primary"
                :icon="Edit"
                @click="updateAttribute(row.id, row.name)"
                circle
              />
              <el-popconfirm
                :title="`你确定要删除${row.name}属性吗?`"
                @confirm="reqDeleteAttribute(row.id)"
                confirm-button-text="确认"
                cancel-button-text="取消"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加属性-->
      <div v-show="categoryStore.divSelector == 1" style="margin: 0 10px; width: 750px">
        <el-form :inline="true">
          <el-form-item :label="attributeAreaTitle">
            <el-input placeholder="请输入属性名称" v-model="attributeName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addAttribute" :icon="Plus">添加属性值</el-button>

        <el-table style="width: 100%; margin: 20px 0" :data="attrValueArray" border>
          <el-table-column width="100px" type="index" align="center" label="序号" />
          <el-table-column align="center" label="属性值">
            <template #default="{ row, $index }">
              <el-input
                v-show="row.readOnly"
                placeholder="请输入属性值"
                :key="$index"
                v-model="row.name"
                @blur="row.readOnly = false"
                :ref="(vc: HTMLInputElement) => (inputAttrValueArray[$index] = vc)"
                clearable
              ></el-input>
              <div
                v-show="!row.readOnly"
                @click="toEdit(row, $index)"
                style="text-align: left; padding-left: 10px"
              >
                {{ row.name || '点击输入' }}
              </div> </template
            ><!--  row.readOnly = true-->
          </el-table-column>
          <el-table-column width="150px" align="center" label="属性值操作">
            <template #default="{ row }">
              <el-button type="danger" :icon="Close" @click.prevent="deleteAttrValue(row)" circle />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :icon="EditPen" @click="save">保存</el-button>
        <el-button :icon="CloseBold" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, Plus, CloseBold, EditPen, Close } from '@element-plus/icons-vue'
import { ref, nextTick, watch } from 'vue'
import type { attrType, attributeValueType } from '@/api/attributes/type'
import type { messageType } from '@/api/index'
import { useCategoryStore } from '@/stores/modules/Category'
import { ElMessage } from 'element-plus'

// 接收仓库数据
const categoryStore = useCategoryStore()

// 获取服务器回传的属性 和 对应的属性值
const getAttr = async (a_id: number) => {
  attrArray.value = (await categoryStore.getAttribute(a_id)) as unknown as attrType[]
}

// 添加或修改属性值框的标题
let attributeAreaTitle = ref<string>('添加属性')

// 接收参数
// 属性对象数组
let attrArray = ref<attrType[]>([])
// 属性值对象数组
let attrValueArray = ref<attributeValueType[]>([])
// 属性名称
let attributeName = ref<string>('')

// 接收属性id
let attrId = ref<number>(0)

// 一个数组，属性值的实例化对象
let inputAttrValueArray = ref<HTMLInputElement[]>([])

// 显示添加属性 或 修改属性区域
const showAddArea = () => {
  attributeAreaTitle.value = '添加属性'
  attrValueArray.value.length = 0
  attributeName.value = ''
  categoryStore.divSelector = 1
}

const updateAttribute = async (id: number, name: string) => {
  attrId.value = id
  attributeName.value = name
  categoryStore.divSelector = 1
  attributeAreaTitle.value = '修改属性'
  const data = (await categoryStore.getAttributeValue(id)) as unknown as attrType[]
  attributeName.value = data[0].name as string

  attrValueArray.value = data[0].attribute_values as unknown as attributeValueType[]
}

const cancel = () => {
  categoryStore.divSelector = 0
}

// 点击确认后添加属性值函数
const addAttribute = () => {
  attrValueArray.value.push({
    name: '',
    readOnly: true,
  })
  nextTick(() => {
    inputAttrValueArray.value[attrValueArray.value.length - 1].focus()
  })
}

// 上传要添加的属性和属性值至服务器
const save = async () => {
  const result = ref<messageType>({ status: 0, message: '' })
  if (attributeAreaTitle.value !== '修改属性') {
    result.value = (await categoryStore.addAttribute(
      categoryStore.thirdCategoryId,
      attributeName.value,
      attrValueArray.value,
    )) as unknown as messageType
  } else {
    result.value = (await categoryStore.updateAttributeValue(
      attrId.value,
      attributeName.value,
      attrValueArray.value,
    )) as unknown as messageType
  }
  ElMessage.success(result.value.message)
  if (result.value.status == 200) {
    categoryStore.divSelector = 0
    getAttr(categoryStore.thirdCategoryId)
  }
}

// 删除自定义属性值
const deleteAttrValue = (item: attributeValueType) => {
  const index = attrValueArray.value.indexOf(item)
  if (index !== -1) {
    attrValueArray.value.splice(index, 1)
  }
}

// 变为编辑模式
const toEdit = (row: attributeValueType, $index: number) => {
  row.readOnly = true
  nextTick(() => {
    inputAttrValueArray.value[$index].focus()
  })
}

// 定义删除函数
const reqDeleteAttribute = async (a_id: number) => {
  const result = (await categoryStore.deleteAttribute(a_id)) as unknown as messageType
  ElMessage.success(result.message)
  getAttr(categoryStore.thirdCategoryId)
}

// 监听pinia中三级分类id变化之后执行一次属性查询
watch(
  () => categoryStore.thirdCategoryId,
  () => {
    getAttr(categoryStore.thirdCategoryId)
  },
)
</script>

<style scoped></style>
