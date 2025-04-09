import { defineStore } from 'pinia'
import {
  reqAddSku,
  reqGetImages,
  reqChangeSkuStatus,
  reqGetSkuInfo,
  reqDeleteSku,
  reqUpdateSku,
} from '@/api/sku'
import type { SKU } from '@/api/sku/type'
import type { attributeValueType } from '@/api/attributes/type'

export const useSkuStore = defineStore('skuStore', () => {
  // 定义一个空的sku数据结构
  const sku = {
    id: 0,
    spu: 0,
    name: '',
    price: 0,
    weight: 0,
    describe: '',
    image: 0,
    imageDetail: {
      id: 0,
      name: '',
      url: '',
      spu: 0,
    },
    skuAttributes: [
      {
        id: 0,
        attribute: {
          id: 0,
          name: '',
          category: 0,
        },
        skuAttributeValues: [
          {
            id: 0,
            attributeValue: {
              id: 0,
              name: '',
              attribute: 0,
              date_added: '',
            },
          },
        ],
      },
    ],
    attributeValues: <attributeValueType[]>[],
  }
  const skus = <SKU[]>[]

  // 调用添加sku的API
  const addSku = async (sku: SKU) => {
    const data = await reqAddSku(sku)
    return data
  }

  // 获取图片数组
  const getImages = async (spu_id: number) => {
    const data = await reqGetImages(spu_id)
    return data
  }

  // 改变sku上架下架状态
  const getChangeSkuStatus = async (sku_id: number, status: number) => {
    const data = await reqChangeSkuStatus(sku_id, status)
    return data
  }

  // 改变sku上架下架状态
  const getSkuInfo = async (sku_id: number) => {
    const data = await reqGetSkuInfo(sku_id)
    return data
  }

  // 删除sku
  const deleteSku = async (sku_id: number) => {
    const data = await reqDeleteSku(sku_id)
    return data
  }

  // 更新sku
  const updateSku = async (sku: SKU) => {
    const data = await reqUpdateSku(sku)
    return data
  }

  // 暴露相关的数据和方法
  return { sku, skus, addSku, getImages, getChangeSkuStatus, getSkuInfo, deleteSku, updateSku }
})
