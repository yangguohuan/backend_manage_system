import request from '@/utils/request'

enum API {
  GET_SPU_LIST = '/spu_manage/api_show_spu_list',
  GET_SPU_INFO = '/spu_manage/api_show_spu_info',
}

export const reqGetSpuList = async (cId: number, pageNo: number, pageSize: number) => {
  const data = await request.get(API.GET_SPU_LIST + `/${cId}/${pageNo}/${pageSize}`)
  return data
}

export const reqGetSpuInfo = async (sId: number) => {
  const data = await request.get(API.GET_SPU_INFO + `/${sId}`)
  return data
}
