import request from '@/utils/request'

enum API {
  TRADEMARK_LIST_URL = '/activity_manage/api_trademark_list',
}

export const reqTrademarkList = async (pageNo: number, pageSize: number) => {
  const list = await request.get(API.TRADEMARK_LIST_URL + `/${pageNo}/${pageSize}`)
  return list
}
