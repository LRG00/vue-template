import { apiAxios as request } from '@/utils/request'

export async function getList (params) {
  return await request.get(`/cate/list`, { params })
}
// 角色删除接口
export async function addArticle (params) {
  return await request.post(`/cate/add`, params)
}
