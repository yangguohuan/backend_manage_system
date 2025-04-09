import request from '@/utils/request'
import type { SPU } from './type'
import type { peginationType } from '../pegination/type'

enum API {
  GET_SPU_LIST = '/spu_manage/api_show_spu_list',
  GET_SPU_INFO = '/spu_manage/api_show_spu_info',
  GET_SKUS = '/sku_manage/api_get_skus',
  ADD_SPU = '/spu_manage/api_add_spu',
  GET_ONE_ATTR_URL = '/spu_manage/api_get_one_attribute',
  ATTRIBUTE_ON_SPU_LIST_URL = '/spu_manage/api_attribute_on_spu_list',
  DELETE_URL = '/spu_manage/api_delete',
}

export const reqGetSpuList = async (cId: number, pageNo: number, pageSize: number) => {
  const data = await request.get(API.GET_SPU_LIST + `/${cId}/${pageNo}/${pageSize}`)
  return data
}

export const reqGetSpuInfo = async (sId: number) => {
  const data = await request.get(API.GET_SPU_INFO + `/${sId}`)
  return data
}

export const reqGetOneAttr = async (a_id: number) => {
  const data = await request.get(API.GET_ONE_ATTR_URL + `/${a_id}`)
  return data
}

export const reqAddSpu = async (spu: SPU) => {
  const data = await request.post(API.ADD_SPU, { spu })
  return data
}

export const reqDeleteSpu = async (sId: number) => {
  const data = await request.get(API.DELETE_URL + `/${sId}`)
  return data
}

export const reqAttributeOnSpuList = async (sId: number) => {
  const data = await request.get(API.ATTRIBUTE_ON_SPU_LIST_URL + `/${sId}`)
  return data.data
}

export const reqGetSkus = async (sId: number, pegination?: peginationType) => {
  const data = await request.post(API.GET_SKUS + `/${sId}`, { pegination })
  return data
}
