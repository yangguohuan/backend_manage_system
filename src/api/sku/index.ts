import request from '@/utils/request'
import type { SKU } from './type'

enum API {
  ADD_SKU_URL = '/sku_manage/api_add_sku',
  GET_IMAGES_URL = '/sku_manage/api_get_images',
  GET_SKU_INFO_URL = '/sku_manage/api_get_sku',
  CHANGE_SKU_STATUS = '/sku_manage/api_change_sku_status',
  DELETE_SKU_URL = '/sku_manage/api_delete_sku',
  UPDATE_SKU_URL = '/sku_manage/api_update_sku',
}

export const reqAddSku = async (sku: SKU) => {
  const data = await request.post(API.ADD_SKU_URL, { sku })
  return data
}

export const reqGetImages = async (spu_id: number) => {
  const data = await request.get(API.GET_IMAGES_URL + `/${spu_id}`)
  return data.data
}

export const reqChangeSkuStatus = async (sku_id: number, status: number) => {
  const data = await request.get(API.CHANGE_SKU_STATUS + `/${sku_id}/${status}`)
  return data
}

export const reqGetSkuInfo = async (sku_id: number) => {
  const data = await request.get(API.GET_SKU_INFO_URL + `/${sku_id}`)
  return data
}

export const reqDeleteSku = async (sku_id: number) => {
  const data = await request.get(API.DELETE_SKU_URL + `/${sku_id}`)
  return data
}

export const reqUpdateSku = async (sku: SKU) => {
  const data = await request.post(API.UPDATE_SKU_URL, { sku })
  return data
}
