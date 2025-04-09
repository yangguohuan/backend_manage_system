import request from '@/utils/request'

enum API {
  TRADEMARK_LIST_URL = '/activity_manage/api_trademark_list',
  GET_ALL_TRADEMARKS_URL = '/activity_manage/api_get_all_trademarks',
  ADD_TRADEMARK_URL = '/activity_manage/api_add_trademark',
  UPDATE_TRADEMARK_URL = '/activity_manage/api_update_trademark',
  DELETE_TRADEMARK_URL = '/activity_manage/api_trademark_delete',
}

export const reqTrademarkList = async (pageNo: number, pageSize: number) => {
  const list = await request.get(API.TRADEMARK_LIST_URL + `/${pageNo}/${pageSize}`)
  return list
}

export const reqGetAllTrademarks = async () => {
  const list = await request.get(API.GET_ALL_TRADEMARKS_URL)
  return list
}

export const reqAddTrademark = async (mark_name: string, mark_image: string) => {
  const message = request.post(API.ADD_TRADEMARK_URL, { mark_name, mark_image })
  return message
}

export const reqUpdateTrademark = async (
  mark_id: number,
  mark_name: string,
  mark_image: string,
) => {
  const message = request.post(API.UPDATE_TRADEMARK_URL, { mark_id, mark_name, mark_image })
  return message
}

export const reqDeleteTrademark = async (mark_id: number) => {
  const message = request.get(API.DELETE_TRADEMARK_URL + `/${mark_id}`)
  return message
}
