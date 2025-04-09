import { defineStore } from 'pinia'
import type { attributeValueType } from '@/api/attributes/type'
import {
  reqGetCategoryPrimary,
  reqGetCategorySecondary,
  reqGetCategoryThird,
  reqGetAttribute,
  reqGetAttributeValue,
  reqAddAttribute,
  reqUpdateAttributeValue,
  reqDeleteAttribute,
  reqGetAllAttr,
} from '@/api/attributes/index'

export const useCategoryStore = defineStore('Category', () => {
  const thirdCategoryId = 0
  const divSelector = 0
  const getCategoryPrimary = async () => {
    const data = await reqGetCategoryPrimary()
    return data.data
  }
  const getCategorySecondary = async (a_id: number) => {
    const data = await reqGetCategorySecondary(a_id)
    return data.data
  }
  const getCategoryThird = async (a_id: number) => {
    const data = await reqGetCategoryThird(a_id)
    return data.data
  }
  const getAttribute = async (a_id: number) => {
    const data = await reqGetAttribute(a_id)
    return data.data
  }
  const getAttributeValue = async (a_id: number) => {
    const data = await reqGetAttributeValue(a_id)
    return data.data
  }
  const addAttribute = async (
    a_id: number,
    attributeName: string,
    attrValueArray: attributeValueType[],
  ) => {
    const data = await reqAddAttribute(a_id, attributeName, attrValueArray)
    return data
  }
  const updateAttributeValue = async (
    a_id: number,
    name: string,
    attrValueArray: attributeValueType[],
  ) => {
    const data = await reqUpdateAttributeValue(a_id, name, attrValueArray)
    return data
  }
  const getAllAttr = async (c_id: number) => {
    const data = await reqGetAllAttr(c_id)
    return data
  }
  const deleteAttribute = async (a_id: number) => {
    const result = await reqDeleteAttribute(a_id)
    return result
  }
  return {
    divSelector,
    thirdCategoryId,
    getCategoryPrimary,
    getCategorySecondary,
    getCategoryThird,
    getAttribute,
    addAttribute,
    updateAttributeValue,
    getAttributeValue,
    deleteAttribute,
    getAllAttr,
  }
})
