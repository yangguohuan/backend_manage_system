export interface categoryType {
  id: number
  name: string
  upperId?: number
  dateAdded: string
}

export interface reqCategoryType {
  message: string
  data: categoryType[]
}

export interface attrType {
  id: number
  name: string
  upperId?: number
  dateAdded: string
  attribute_values: object[]
}

export interface attributeValueType {
  name: string
  readOnly?: boolean
}

export interface reqAttrType {
  message: string
  data: attrType[]
}

export interface addResponseMessageType {
  message: string
  status: string
}
