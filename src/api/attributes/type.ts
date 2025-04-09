export interface categoryType {
  id: number
  name: string
  upperId?: number
}
export interface attrType {
  id: number
  name: string
  category: number
  attribute_values?: Array<attributeValueType>
  valAndAttr?: string
}

export interface attributeValueType {
  id?: number
  name: string
  attribute?: number
  readOnly?: boolean
}

export interface TRADEMRAK {
  id: number
  mark_name: string
  mark_image: string
}
