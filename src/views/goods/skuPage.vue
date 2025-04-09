<template>
  <el-card>
    <el-table :data="skuStore.skus" style="width: 100%">
      <el-table-column width="100" align="center" label="序号" type="index"></el-table-column>
      <el-table-column width="100" label="名称" prop="name"></el-table-column>
      <el-table-column width="100" label="价格" prop="price"></el-table-column>
      <el-table-column width="100" label="重量" prop="weight"></el-table-column>
      <el-table-column width="200" label="图片">
        <template #default="{ row }">
          <el-image :src="spuStore.url + row.imageInfo.url" alt="img"></el-image>
        </template>
      </el-table-column>
      <el-table-column width="120" label="是否已上架">
        <template #default="{ row }">
          <el-tag v-if="row.status == 1" type="warning">已上架</el-tag>
          <el-tag v-else type="info">已下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="600" label="描述" prop="describe"></el-table-column>
      <el-table-column width="300" label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.status == 1"
            :icon="ArrowDown"
            type="primary"
            circle
            @click="uploadSku(row.id, 0)"
            :title="row.status == 1 ? '下架' : '上架'"
          ></el-button>
          <el-button
            v-else
            :icon="ArrowUp"
            type="primary"
            circle
            @click="uploadSku(row.id, 1)"
            :title="row.status == 1 ? '下架' : '上架'"
          ></el-button>
          <el-button
            title="查看并修改"
            :icon="Edit"
            type="success"
            @click="toEdit(row.id)"
            circle
          ></el-button>
          <el-button
            title="详情"
            :icon="InfoFilled"
            type="warning"
            @click="getSkuInfo(row.id)"
            circle
          ></el-button>
          <el-popconfirm :title="`你确定要删除${row.name}吗？`" @confirm="deleteSku(row.id)">
            <template #reference>
              <el-button type="danger" :icon="Delete" title="删除" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="peginationStore.pegination.pageNo"
      v-model:page-size="peginationStore.pegination.pageSize"
      :page-sizes="peginationStore.pegination.pageSizes"
      background
      layout="prev, pager, next, jumper, -> ,total, sizes"
      :total="peginationStore.pegination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px"
    />

    <el-drawer v-model="drawer">
      <template #header>
        <p>sku详情</p>
      </template>
      <template #default>
        <el-row style="margin-top: 5px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuStore.sku.name }}</el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuStore.sku.price }}</el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="6">重量</el-col>
          <el-col :span="18">{{ skuStore.sku.weight }}</el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuStore.sku.describe }}</el-col>
        </el-row>
        <el-row style="margin-top: 5px">
          <el-col :span="6">图片</el-col>
          <el-col :span="18">
            <el-image :src="spuStore.url + skuStore.sku.imageDetail.url"></el-image>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>
        <p>编辑与修改</p>
      </template>
      <template #default>
        <el-form label-width="50">
          <el-form-item label="价格">
            <el-input :value="skuStore.sku.price" v-model="skuStore.sku.price"></el-input>
          </el-form-item>
          <el-form-item label="重量">
            <el-input :value="skuStore.sku.weight" v-model="skuStore.sku.weight"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              :value="skuStore.sku.describe"
              v-model="skuStore.sku.describe"
              type="textarea"
              :rows="10"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { useSpuStore } from '@/stores/modules/Spu'
import { useSkuStore } from '@/stores/modules/Sku'
import type { SKU } from '@/api/sku/type'
import { onMounted, ref } from 'vue'
import { Edit, ArrowUp, ArrowDown, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { messageType } from '@/api'
import { usePeginationStore } from '@/stores/modules/Pegination'
import type { peginationType } from '@/api/pegination/type'

const spuStore = useSpuStore()
const skuStore = useSkuStore()
const peginationStore = usePeginationStore()

// 抽屉
const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)

// 展示所有该spu下所有sku
const showSkus = async (spu_id: number, pegination: peginationType) => {
  const data = await spuStore.getSkus(spu_id, pegination)
  skuStore.skus = data.data.data as unknown as SKU[]
  peginationStore.pegination.total = data.data.totalCount
  peginationStore.pegination.pageNo = data.data.pageNo
  peginationStore.pegination.pageSize = data.data.pageSize
}

// 上架商品
const uploadSku = async (sku_id: number, status: number) => {
  const data = (await skuStore.getChangeSkuStatus(sku_id, status)) as unknown as messageType
  showSkus(0, peginationStore.pegination as unknown as peginationType)
  ElMessage.success(data.message)
}

const handleSizeChange = async (val: number) => {
  peginationStore.pageSize = val
  showSkus(0, peginationStore.pegination as unknown as peginationType)
}
const handleCurrentChange = (val: number) => {
  peginationStore.pageNo = val
  showSkus(0, peginationStore.pegination as unknown as peginationType)
}
const deleteSku = async (sku_id: number) => {
  const data = (await skuStore.deleteSku(sku_id)) as unknown as messageType
  ElMessage.success(data.message)
  showSkus(0, peginationStore.pegination as unknown as peginationType)
}
const getSkuInfo = async (sku_id: number) => {
  //@ts-expect-error: no error
  skuStore.sku = (await skuStore.getSkuInfo(sku_id)) as unknown as SKU
  drawer.value = true
}
const toEdit = async (sku_id: number) => {
  //@ts-expect-error: no error
  skuStore.sku = (await skuStore.getSkuInfo(sku_id)) as unknown as SKU
  drawer1.value = true
}
const save = async () => {
  const data = (await skuStore.updateSku(skuStore.sku)) as unknown as messageType
  ElMessage.success(data.message)
  drawer1.value = false
  showSkus(0, peginationStore.pegination as unknown as peginationType)
}
onMounted(() => {
  showSkus(0, peginationStore.pegination as unknown as peginationType)
})
</script>

<style scoped></style>
