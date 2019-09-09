import request from '@/utils/req'

export function queryUserInfo() {
  return request('/user/current', {
    method: 'get'
  })
}
