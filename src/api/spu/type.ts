import type { TRADEMRAK } from '../attributes/type'
import type { attrType } from '../attributes/type'
export interface SPU {
  id: number
  third_category_id: number
  trademark: string
  title: string
  content: string
  images: Array<SPUIMAGE>
  attributes?: Array<ATTRONSPU>
  trademark_details: TRADEMRAK
}

export interface ATTRONSPU {
  id: number
  attribute: number
  spu: number
  attribute_details: attrType
  flag?: boolean
}

// 定义一个spu图片接口
export interface SPUIMAGE {
  id: number
  name: string
  url: string
  spu: number
}
