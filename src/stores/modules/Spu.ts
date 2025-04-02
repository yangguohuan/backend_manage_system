import { defineStore } from 'pinia'
import { reqGetSpuList, reqGetSpuInfo } from '@/api/spu/index'

export const useSpuStore = defineStore('spuStore', () => {
  const getSpuList = async (cId: number, pageNo: number, pageSize: number) => {
    const data = await reqGetSpuList(cId, pageNo, pageSize)
    return data
  }
  const getSpuInfo = async (sId: number) => {
    const data = await reqGetSpuInfo(sId)
    return data
  }
  return { getSpuList, getSpuInfo }
})
