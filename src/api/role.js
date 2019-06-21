import { apiAxios as request } from '@/utils/request'

export async function xxx (params) {
  return await request.get(`/api/user/getUserInfo.json`, { params })
}
// 打开新增角色或者修改界面加载相应数据接口
export async function getMenu (id) {
  return await request.get(`/role/queryInfoByRole.action?id=${id}`)
}
// 打开新增角色或者修改界面加载相应数据接口
export async function editRole (params) {
  return await request.post(`/role/insertRole.action`, params)
}
// 角色删除接口
export async function getRoleList (params) {
  return await request.post(`/api/login`, params)
}
