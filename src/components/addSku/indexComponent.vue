<template>
  <el-card style="margin: 20px 0">
    <el-form label-width="100" style="width: 750px">
      <el-form-item label="SKU名称">
        <el-input v-model="skuStore.sku.name" placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input v-model="skuStore.sku.price" type="number" placeholder="价格（元）"></el-input>
      </el-form-item>
      <el-form-item label="重量（克）">
        <el-input v-model="skuStore.sku.weight" type="number" placeholder="重量（克）"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          type="textarea"
          :rows="8"
          v-model="skuStore.sku.describe"
          placeholder="SKU描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="50">
          <el-form-item v-for="attr in spuStore.attributeList" :key="attr.id" :label="attr.name">
            <el-select
              clearable
              placeholder="请选择"
              style="width: 200px"
              @change="addToSku"
              v-model="attr.valAndAttr"
            >
              <el-option
                v-for="val in attr.attribute_values"
                :key="val.id"
                :value="`${attr.id}:${val.id}`"
                :label="val.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="spuStore.spuInfo.images" style="width: 600px" ref="table">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="url" label="图片" align="center">
            <template #default="{ row }">
              <el-image
                style="width: 100px; height: 100px"
                :src="trademarkListStore.urlPrefix + row.url"
                show-progress
                fit="cover"
              />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="primary" size="small" @click="setDefaultImg(row)"
                >设为默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button @click="save" type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { useSkuStore } from '@/stores/modules/Sku'
import { useCategoryStore } from '@/stores/modules/Category'
import { useSpuStore } from '@/stores/modules/Spu'
import useTrademarkListStore from '@/stores/modules/trademarkList'
import type { messageType } from '@/api/index'
import { watch, ref } from 'vue'
import type { attributeValueType } from '@/api/attributes/type'
import type { SPUIMAGE } from '@/api/spu/type'
import { ElMessage } from 'element-plus'

// 表格对象
let table = ref()

// 创建数据pinia实例
const skuStore = useSkuStore()
const categoryStore = useCategoryStore()
const spuStore = useSpuStore()
const trademarkListStore = useTrademarkListStore()

// 将属性添加至sku
const addToSku = () => {
  skuStore.sku.attributeValues = spuStore.attributeList as attributeValueType[]
}

// 将图片设置为默认值, 这里有问题
const setDefaultImg = (row: SPUIMAGE) => {
  spuStore.spuInfo.images.forEach((item) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  skuStore.sku.imageDetail.id = row.id
  skuStore.sku.imageDetail.name = row.name
  skuStore.sku.imageDetail.url = row.url
}

// 点击取消 事件
const cancel = async () => {
  categoryStore.divSelector = 0
  clearData()
}

// 点击保存 事件
const save = async () => {
  const data = (await skuStore.addSku(skuStore.sku)) as unknown as messageType
  categoryStore.divSelector = 0
  ElMessage.success(data.message)
  clearData()
}

// 当显示添加sku界面时 加载数据
watch(
  () => categoryStore.divSelector,
  async () => {
    if (categoryStore.divSelector == 2) {
      spuStore.attributeList = await spuStore.getAttributeOnSpuList(skuStore.sku.spu)
      spuStore.spuInfo.images = await skuStore.getImages(skuStore.sku.spu)
    }
  },
)

const clearData = () => {
  skuStore.sku.name = ''
  skuStore.sku.price = '' as unknown as number
  skuStore.sku.weight = '' as unknown as number
  skuStore.sku.describe = ''
  skuStore.sku.attributeValues.length = 0
  skuStore.sku.image = '' as unknown as number
}
</script>

<style scoped></style>
