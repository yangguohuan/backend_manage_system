// 定义返回值list的接口函数，规范代码
export interface trademarkListType {
  page: number
  pageSize: number
  total: number
  totalPages: number
  data: []
}

export interface trademarkType {
  id: number
  mark_name: string
  mark_image: string
  image_url: string
  date_added: string
}
