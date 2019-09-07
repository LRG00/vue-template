import { axios } from '@/utils/request'

export function login (parameter) {
  return axios({
    url: '/login',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}