import request from '@/utils/request'
import type { attributeValueType } from '@/api/attributes/type'

enum API {
  GET_ATTR_VALUE_URL = '/activity_manage/api_query_attribute_value',
  UPDATE_ATTR_VALUE_URL = '/activity_manage/api_update_attribute',
  GET_ATTR_URL = '/activity_manage/api_query_attribute',
  GET_CATEGORY_THIRD_URL = '/activity_manage/api_query_category_third',
  GET_CATEGORY_SECONDARY_URL = '/activity_manage/api_query_category_secondary',
  GET_CATEGORY_PRIMARY_URL = '/activity_manage/api_query_category_primary',
  ADD_ATTRIBUTE_URL = '/activity_manage/api_add_attribute',
  DELETE_ATTRIBUTE_URL = '/activity_manage/api_delete_attribute',
}

export const reqGetAttributeValue = async (a_id: number) => {
  const result = await request.get(API.GET_ATTR_VALUE_URL + `/${a_id}`)
  return result
}

export const reqGetAttribute = async (a_id: number) => {
  const result = await request.get(API.GET_ATTR_URL + `/${a_id}`)
  return result
}

export const reqGetCategoryThird = async (a_id: number) => {
  const result = await request.get(API.GET_CATEGORY_THIRD_URL + `/${a_id}`)
  return result
}

export const reqGetCategorySecondary = async (a_id: number) => {
  const result = await request.get(API.GET_CATEGORY_SECONDARY_URL + `/${a_id}`)
  return result
}

export const reqGetCategoryPrimary = async () => {
  const result = await request.get(API.GET_CATEGORY_PRIMARY_URL)
  return result
}

export const reqAddAttribute = async (
  a_id: number,
  attributeName: string,
  attributeValue: attributeValueType[],
) => {
  const result = await request.post(API.ADD_ATTRIBUTE_URL, { a_id, attributeName, attributeValue })
  return result
}

export const reqUpdateAttributeValue = async (
  a_id: number,
  name: string,
  attributeValue: attributeValueType[],
) => {
  const result = await request.post(API.UPDATE_ATTR_VALUE_URL, { a_id, name, attributeValue })
  return result
}

export const reqDeleteAttribute = async (a_id: number) => {
  const result = await request.get(API.DELETE_ATTRIBUTE_URL + `/${a_id}`)
  return result
}
