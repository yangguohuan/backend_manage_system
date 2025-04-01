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
} from '@/api/attributes/index'

const useCategoryStore = defineStore('Category', () => {
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
  const deleteAttribute = async (a_id: number) => {
    const result = await reqDeleteAttribute(a_id)
    return result
  }
  return {
    getCategoryPrimary,
    getCategorySecondary,
    getCategoryThird,
    getAttribute,
    addAttribute,
    updateAttributeValue,
    getAttributeValue,
    deleteAttribute,
  }
})

export default useCategoryStore
