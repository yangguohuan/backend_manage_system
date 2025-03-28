import { defineStore } from 'pinia'
import { reqTrademarkList } from '@/api/products/index'

const useTrademarkListStore = defineStore('trademark_list', () => {
  const getTrademarkList = async (pageNo: number, pageSize: number) => {
    const list = await reqTrademarkList(pageNo, pageSize)
    return list
  }
  return { getTrademarkList }
})

export default useTrademarkListStore
