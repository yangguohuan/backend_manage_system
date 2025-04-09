import { defineStore } from 'pinia'
import {
  reqTrademarkList,
  reqAddTrademark,
  reqUpdateTrademark,
  reqGetAllTrademarks,
} from '@/api/products/index'

const useTrademarkListStore = defineStore('trademark_list', () => {
  const urlPrefix = 'http://127.0.0.1:8000/static'
  // 图片上传的URL
  const uploadImageURL = 'http://127.0.0.1:8000/activity_manage/api_upload'

  const getTrademarkList = async (pageNo: number, pageSize: number) => {
    const list = await reqTrademarkList(pageNo, pageSize)
    return list
  }
  const getAllTrademarks = async () => {
    const data = await reqGetAllTrademarks()
    return data
  }
  const addTrademark = async (mark_name: string, mark_image: string) => {
    const message = await reqAddTrademark(mark_name, mark_image)
    return message
  }
  const updateTrademark = async (id: number, mark_name: string, mark_image: string) => {
    const message = await reqUpdateTrademark(id, mark_name, mark_image)
    return message
  }
  return {
    urlPrefix,
    uploadImageURL,
    getTrademarkList,
    addTrademark,
    updateTrademark,
    getAllTrademarks,
  }
})

export default useTrademarkListStore
