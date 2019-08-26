import { axios } from '@/utils/req'
import axiosAPI from 'axios'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
class Sys {
  login (parameter) {
    return axios({
      url: '/sys/login',
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  unitAddOrUpdate (AddOrUpdate, parameter) {
    return axios({
      url: '/sys/unit/' + AddOrUpdate,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  unitDelete (parameter) {
    return axios({
      url: '/sys/unit/delete',
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  roleDelete (parameter) {
    return axios({
      url: '/sys/role/delete',
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  menuDelete (menuId) {
    return axios({
      url: '/sys/menu/delete/' + menuId,
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

  getMenuList () {
    return axios({
      url: '/sys/menu/list',
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  menuAddOrUpdate (AddOrUpdate, parameter) {
    return axios({
      url: '/sys/menu/' + AddOrUpdate,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  roleAddOrUpdate (AddOrUpdate, parameter) {
    return axios({
      url: '/sys/role/' + AddOrUpdate,
      method: 'post',
      data: parameter,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  getUnitList (parameter) {
    return axios({
      url: '/sys/unit/list',
      params: parameter,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  getRoleList (parameter) {
    return axios({
      url: '/sys/role/list',
      params: parameter,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

  getRoleOne (roleId) {
    return axios({
      url: '/sys/role/info/' + roleId,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  getUserList (parameter) {
    return axios({
      url: '/sys/user/list',
      params: parameter,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  getDictList (parameter) {
    return axios({
      url: '/sys/dict/list',
      params: parameter,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  getMessageList (parameter) {
    return axios({
      url: '/sys/message/list',
      params: parameter,
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
  logout () {
    return axios({
      url: '/auth/logout',
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }

  captcha (parameter) {
    return axiosAPI.get('http://192.100.7.63:8085/captcha.jpg?uuid=' + parameter)
  }
}
export default new Sys()
