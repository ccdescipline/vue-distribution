import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/User/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/Login/loginout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/Login/register',
    method: 'post',
    data
  })
}

export function getroleinfo() {
  return request({
    url: '/Login/getroleinfo',
    method: 'get'
  })
}

export function nameIsrepeat(name) {
  return request({
    url: '/Login/nameisrepeat',
    method: 'get',
    params: {
      username: name
    }
  })
}