import { defineStore } from 'pinia'
import { reqTrademarkList, reqAddTrademark, reqUpdateTrademark } from '@/api/products/index'

const useTrademarkListStore = defineStore('trademark_list', () => {
  const getTrademarkList = async (pageNo: number, pageSize: number) => {
    const list = await reqTrademarkList(pageNo, pageSize)
    return list
  }
  const addTrademark = async (mark_name: string, mark_image: string) => {
    const message = await reqAddTrademark(mark_name, mark_image)
    return message
  }
  const updateTrademark = async (id: number, mark_name: string, mark_image: string) => {
    const message = await reqUpdateTrademark(id, mark_name, mark_image)
    return message
  }
  return { getTrademarkList, addTrademark, updateTrademark }
})

export default useTrademarkListStore
