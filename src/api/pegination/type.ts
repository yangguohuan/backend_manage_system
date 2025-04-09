import type { SPU } from '../spu/type'

// 定义一个前端获取对象的类型
export interface peginationType {
  // 返回查询结果提示，成功或者失败
  message: string

  // 返回查询结果提示代码，200 或 400
  status: number

  // 返回spu总数
  totalCount?: number

  // 返回总页数
  totalPages?: number

  // 返回当前页码
  currentPage?: number

  // 返回页面包含数据数量
  pageSize?: number

  // 返回数据内容
  data?: SPU[] | SPU
}
