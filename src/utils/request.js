import axios from 'axios'
import { APILIST } from './config'
import router from '../router'
import { message } from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.withCredentials = true

class Axios {
  constructor (baseUrl) {
    this.instance = null
    this.init(baseUrl)
  }

  init (baseUrl) {
    this.instance = axios.create({
      baseURL: baseUrl
    })
    // http request 拦截器
    this.instance.interceptors.request.use(config => {
      const token = localStorage.getItem('token')
      config.headers.common['Authorization'] = 'Bearer ' + token
      return config
    })

    // http response 拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.data.status === '401') {
          router.replace({
            path: '/login'
          })
          return message.error(response.data.msg)
        }
        return response.data
      },
      error => {
        console.log(error.response, 'pp')
        if (error.response) {
          const { status } = error.response
          if (status === 401) {
            alert(error.response.data + 'token过期请重新登录')
            router.replace({
              path: '/login'
            })
            return error
          }
        }
      }
    )
  }
}
console.log(APILIST.api, 'jjjjjjj')
export const apiAxios = new Axios(APILIST.api).instance
export default {
  Axios,
  apiAxios
}
