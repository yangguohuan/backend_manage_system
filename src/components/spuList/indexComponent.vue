<template>
  <el-card style="margin: 20px 0">
    <el-button
      type="primary"
      :icon="Plus"
      @click="showAddSpuDiv(0)"
      :disabled="categoryStore.thirdCategoryId == 0"
    >
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
            @click="showAddSkuDiv(row.id)"
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
          <el-button
            type="warning"
            :icon="List"
            title="查看关联的所有SKU"
            @click="showSkus(row.id)"
            circle
          />

          <el-popconfirm :title="`你确定要删除${row.title}吗？`" @confirm="deleteSpu(row.id)">
            <template #reference>
              <el-button type="danger" :icon="Delete" title="删除" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="peginationStore.pageNo"
      v-model:page-size="peginationStore.pageSize"
      :page-sizes="peginationStore.pageSizes"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="peginationStore.total"
      style="margin-top: 20px"
      background
      @size-change="sizeChange"
      @current-change="currentChange"
    />

    <skuList></skuList>
  </el-card>
</template>

<script setup lang="ts" name="spuList">
import { ref, watch } from 'vue'
import { Plus, CirclePlus, View, List, Delete } from '@element-plus/icons-vue'
import type { SPU } from '@/api/spu/type'
import type { SKU } from '@/api/sku/type'
import type { peginationType } from '@/api/pegination/type'
import { useSpuStore } from '@/stores/modules/Spu'
import { useSkuStore } from '@/stores/modules/Sku'
import { useCategoryStore } from '@/stores/modules/Category'
import { usePeginationStore } from '@/stores/modules/Pegination'
import { ElMessage } from 'element-plus'
import type { messageType } from '@/api/index'
import skuList from '@/components/skuList/indexComponent.vue'

// 从pinia仓库获取数据
const spuStore = useSpuStore()
const categoryStore = useCategoryStore()
const peginationStore = usePeginationStore()
const skuStore = useSkuStore()

// 所有spu的数据，一个数组包含对象
const spuList = ref<SPU[]>([])

// 通过数据仓库全局方法获取spu数据
const getSpuList = async (cid: number, cPage: number, pSize: number) => {
  const data = (await spuStore.getSpuList(cid, cPage, pSize)) as unknown as peginationType
  peginationStore.pageNo = data.currentPage as number
  peginationStore.pageSize = data.pageSize as number
  peginationStore.total = data.totalCount as number
  spuList.value = data.data as SPU[]
}

// 监听 props 的变化
watch(
  () => [categoryStore.thirdCategoryId, categoryStore.divSelector],
  () => {
    if (categoryStore.thirdCategoryId != 0) {
      // 当三级分类为0 的时候不查询数据
      getSpuList(categoryStore.thirdCategoryId, peginationStore.pageNo, peginationStore.pageSize)
    }
  },
)

// 当单页面大小改变时，查询数据
const sizeChange = () => {
  if (categoryStore.thirdCategoryId != 0) {
    // 当三级分类为0 的时候不查询数据
    getSpuList(categoryStore.thirdCategoryId, peginationStore.pageNo, peginationStore.pageSize)
  }
}

// 当页码改变时，查询数据
const currentChange = () => {
  if (categoryStore.thirdCategoryId != 0) {
    // 当三级分类为0 的时候不查询数据
    getSpuList(categoryStore.thirdCategoryId, peginationStore.pageNo, peginationStore.pageSize)
  }
}

// 删除spu
const deleteSpu = async (sId: number) => {
  const data = (await spuStore.deleteSpu(sId)) as unknown as messageType
  ElMessage.success(data.message)
  if (categoryStore.thirdCategoryId != 0) {
    getSpuList(categoryStore.thirdCategoryId, peginationStore.pageNo, peginationStore.pageSize)
  }
}

// 显示添加spu的div
const showAddSpuDiv = async (sId: number) => {
  clearData()
  categoryStore.divSelector = 1
  spuStore.spuInfo.third_category_id = categoryStore.thirdCategoryId
  if (sId != 0) {
    spuStore.spuInfo.id = sId
    const data = await spuStore.getSpuInfo(spuStore.spuInfo.id)
    // @ts-expect-error：here no error
    spuStore.spuInfo = data.data as unknown as SPU
  }
}
// 显示添加sku的div
const showAddSkuDiv = (sId: number) => {
  clearData()
  categoryStore.divSelector = 2
  skuStore.sku.spu = sId
}

// 展示所有该spu下所有sku
const showSkus = async (spu_id: number) => {
  const data = await spuStore.getSkus(spu_id)
  skuStore.skus = data.data.data as unknown as SKU[]
  spuStore.spuInfo.id = spu_id
  spuStore.isShow = true
}

// 清空数据
const clearData = () => {
  spuStore.spuInfo.title = ''
  spuStore.spuInfo.trademark = ''
  spuStore.spuInfo.content = ''
  spuStore.spuInfo.images.length = 0
  spuStore.spuInfo.attributes.length = 0
  spuStore.attributeInfo = null
  skuStore.sku.name = ''
  skuStore.sku.price = '' as unknown as number
  skuStore.sku.weight = '' as unknown as number
  skuStore.sku.describe = ''
}
</script>

<style scoped></style>
