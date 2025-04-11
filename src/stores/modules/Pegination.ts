import { defineStore } from 'pinia'

export const usePeginationStore = defineStore('peginationStore', () => {
  const pageNo = 1
  const pageSize = 5
  const pageSizes = [5, 10]
  const total = 1
  const pegination = {
    pageNo: 1,
    pageSize: 5,
    pageSizes: [5, 10],
    total: 1,
    keyword: '',
  }
  return { pageNo, pageSize, pageSizes, total, pegination }
})
