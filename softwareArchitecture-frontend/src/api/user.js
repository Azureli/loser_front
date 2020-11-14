import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/loginCheck',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
