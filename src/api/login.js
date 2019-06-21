import { apiAxios as request } from '@/utils/request'

// 角色删除接口
export async function signIn (params) {
  return await request.post(`/login`, params)
}
