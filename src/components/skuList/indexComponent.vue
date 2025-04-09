<template>
  <el-dialog v-model="spuStore.isShow" title="spu下所有的SKU" width="1000">
    <el-table :data="skuStore.skus">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="详情" width="150">
        <template #default="{ row }">
          <p>名称：{{ row.name }}</p>
          <p>价格：{{ row.price }}元</p>
          <p>重量：{{ row.weight }}克</p>
          <p>是否上架：{{ row.status ? '上架' : '下架' }}克</p>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template #default="{ row }">
          <p
            style="
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              line-clamp: 4;
            "
          >
            {{ row.describe }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="120">
        <template #default="{ row }">
          <el-image :src="spuStore.url + row.imageInfo.url" alt="img"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="属性" width="150">
        <template #default="{ row }">
          <p v-for="r in row.attributeValues" :key="r.id">
            {{ r.attributeInfo.name }}：{{ r.name }}
          </p>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { useSpuStore } from '@/stores/modules/Spu'
import { useSkuStore } from '@/stores/modules/Sku'
const spuStore = useSpuStore()
const skuStore = useSkuStore()
</script>

<style scoped></style>
