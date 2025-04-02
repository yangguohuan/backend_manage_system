<template>
  <el-card style="margin: 20px 0">
    <el-button type="primary" :icon="Plus" @click="showAddSpuDiv(-1)" :disabled="isExistCategoryId">
      添加SPU
    </el-button>
    <el-table style="margin-top: 20px" :data="spuList" border>
      <el-table-column type="index" align="center" width="100" label="序号" />
      <el-table-column
        prop="title"
        align="center"
        show-overflow-tooltip
        width="200"
        label="SPU名称"
      />
      <el-table-column prop="content" align="center" show-overflow-tooltip label="SPU描述" />
      <el-table-column align="center" width="300" label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            :icon="CirclePlus"
            @click="showAddSkuDiv"
            title="添加SKU"
            circle
          />
          <el-button
            type="success"
            @click="showAddSpuDiv(row.id)"
            :icon="View"
            title="查看修改SPU详情"
            circle
          />
          <el-button type="warning" :icon="List" title="查看关联的所有SKU" circle />
          <el-button type="danger" :icon="Delete" title="删除" circle />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizeSelect"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      style="margin-top: 20px"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
    />
  </el-card>
</template>

<script setup lang="ts" name="spuList">
import { ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { spuType, responseSpuType } from '@/api/spu/type'
import { useSpuStore } from '@/stores/modules/Spu'
import { CirclePlus, View, List, Delete } from '@element-plus/icons-vue'

// 接收子组件传递的三级分类id值
let categoryId = ref<number>(0)

// 获取父组件传值，用于判断是否存在三级分类id
let isExistCategoryId = ref<boolean>(true)

// 从pinia仓库获取数据
const spuStore = useSpuStore()

// 用于判断父组件div选择
let divSelector = ref<number>(0)

// 分页器属性
// 当前页面
const currentPage = ref<number>(1)

// 一个页面包含的数量
const pageSize = ref<number>(5)

// 一个页面包含数组数量的选择器
const pageSizeSelect = ref<number[]>([5, 10])

// 包含spu总数
const total = ref<number>(0)

// 所有spu的数据，一个数组包含对象
const spuList = ref<spuType[]>([])

// 用于判断分类组件是否被禁用
const isTable = ref<boolean>(false)

// spu的详情信息
const spuInfo = ref<spuType>()
// 通过数据仓库全局方法获取spu数据
const getSpuList = async (cid: number, cPage: number, pSize: number) => {
  const data = (await spuStore.getSpuList(cid, cPage, pSize)) as unknown as responseSpuType
  currentPage.value = data.currentPage as number
  pageSize.value = data.pageSize as number
  total.value = data.totalCount as number
  spuList.value = data.data as spuType[]
}

// 获取父组件的传值，如果存在则执行查询操作
const props = defineProps(['thirdCategoryId', 'isExistThirdCategoryId'])

// 监听 props 的变化
watch(
  () => [props.thirdCategoryId, props.isExistThirdCategoryId],
  ([newThirdCategoryId, newIsExistThirdCategoryId]) => {
    if (!newIsExistThirdCategoryId) {
      categoryId.value = newThirdCategoryId
      isExistCategoryId.value = newIsExistThirdCategoryId
      getSpuList(categoryId.value, currentPage.value, pageSize.value)
    }
  },
  { immediate: true }, // 初始化时立即执行一次
)

// 获取父组件传来的函数
const emitter = defineEmits(['changeDivSelector'])

// 当单页面大小改变时，查询数据
const sizeChange = () => {
  getSpuList(categoryId.value, currentPage.value, pageSize.value)
}

// 当页码改变时，查询数据
const currentChange = () => {
  getSpuList(categoryId.value, currentPage.value, pageSize.value)
}

// 查询某个spu的详情信息
const getSpuInfo = async (sId: number) => {
  const data = (await spuStore.getSpuInfo(sId)) as unknown as responseSpuType
  spuInfo.value = data.data as spuType
  console.log(spuInfo.value)
}

// 显示添加spu的div
const showAddSpuDiv = (s_id: number) => {
  if (s_id != -1) {
    getSpuInfo(s_id)
  }
  divSelector.value = 2
  emitter('changeDivSelector', divSelector.value, isTable.value)
}

// 显示添加sku的div
const showAddSkuDiv = () => {
  divSelector.value = 3
  emitter('changeDivSelector', divSelector.value, isTable.value)
}
</script>

<style scoped></style>
