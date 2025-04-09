import type { attrType, attributeValueType } from '../attributes/type'
import type { SPUIMAGE } from '../spu/type'

export interface SKU {
  id: number
  spu: number
  name: string
  price: number | string
  weight: number | string
  describe: string
  image: number
  imageDetail: SPUIMAGE
  skuAttributes?: Array<SKUATTR>
  attributeValues?: Array<attributeValueType>
}

export interface SKUATTR {
  id?: number
  attribute: attrType
  category?: number
  skuAttributeValues: Array<SKUATTRVALUE>
}

export interface SKUATTRVALUE {
  id?: number
  attributeValue: attributeValueType
}
