import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login?name='+data.username+'&pwd='+data.password,
    method: 'get',
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

// export function login(data) {
//   return request({
//     url: '/vue-element-admin/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
