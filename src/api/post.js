import { apiAxios as request } from '@/utils/request'

export async function getList (params) {
  return await request.get(`/post/list`, { params })
}
// 角色删除接口
export async function addArticle (params) {
  return await request.post(`/post/add`, params)
}
