import { defineStore } from 'pinia'
import {
  reqGetSpuList,
  reqGetSpuInfo,
  reqAddSpu,
  reqGetOneAttr,
  reqDeleteSpu,
  reqAttributeOnSpuList,
  reqGetSkus,
} from '@/api/spu/index'
import type { SPU, ATTRONSPU } from '@/api/spu/type'
import type { trademarkType } from '@/api/products/type'
import type { attrType } from '@/api/attributes/type'
import type { peginationType } from '@/api/pegination/type'

export const useSpuStore = defineStore('spuStore', () => {
  const isShow = false
  const trademarkList = [] as trademarkType[]
  const attributeList = [
    { id: 0, name: '', category: 0, attribute_values: [], valAndAttr: '' },
  ] as attrType[]
  const attributeOnSpuList = [] as ATTRONSPU[]
  // 初始化一个spu实例
  const spuInfo = {
    id: 0,
    third_category_id: 0,
    trademark: '',
    title: '',
    content: '',
    images: [
      {
        id: 0,
        name: '',
        url: '',
        spu: 0,
      },
    ],
    attributes: [
      {
        id: 0,
        attribute: 0,
        spu: 0,
        attribute_details: {
          id: 0,
          name: '',
          category: 0,
          attribute_values: [
            {
              id: 0,
              name: '',
              attribute: 0,
            },
          ],
        },
      },
    ],
    trademark_details: { id: 0, mark_name: '', mark_image: '' },
  }
  // 初始化一个attributeOnSpu实例
  const attributeOnSpu = {
    id: 0,
    spu: 0,
    attribute: 0,
    attribute_details: [],
    image_url: [],
    trademark_details: [],
    date_added: '',
  }
  // 初始化一个品牌实例
  const trademarkInfo = {
    id: 0,
    mark_name: '',
    mark_image: '',
    image_url: '',
    date_added: '',
  }

  // 初始化一个属性对象
  const attributeInfo = null

  // 初始化一个属性对象
  const attributeValueInfo = null

  const uploadUrl = 'http://127.0.0.1:8000/activity_manage/api_upload'
  const url = 'http://127.0.0.1:8000/static'
  const getSpuList = async (cId: number, pageNo: number, pageSize: number) => {
    const data = await reqGetSpuList(cId, pageNo, pageSize)
    return data
  }
  const getSpuInfo = async (sId: number) => {
    const data = await reqGetSpuInfo(sId)
    return data
  }
  const addSpu = async (spu: SPU) => {
    const data = await reqAddSpu(spu)
    return data
  }

  const getOneAttr = async (aId: number) => {
    const data = await reqGetOneAttr(aId)
    return data
  }

  const deleteSpu = async (sId: number) => {
    const data = await reqDeleteSpu(sId)
    return data
  }

  const getAttributeOnSpuList = async (sId: number) => {
    const data = await reqAttributeOnSpuList(sId)
    return data
  }

  const getSkus = async (sId: number, pegination?: peginationType) => {
    const data = await reqGetSkus(sId, pegination)
    return data
  }
  return {
    isShow,
    spuInfo,
    url,
    trademarkList,
    uploadUrl,
    attributeOnSpu,
    trademarkInfo,
    attributeInfo,
    attributeValueInfo,
    attributeList,
    attributeOnSpuList,
    getSpuList,
    getSpuInfo,
    addSpu,
    getOneAttr,
    deleteSpu,
    getAttributeOnSpuList,
    getSkus,
  }
})
