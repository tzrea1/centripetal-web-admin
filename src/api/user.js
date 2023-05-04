import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/centripetal-web-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/centripetal-web-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/centripetal-web-admin/user/logout',
    method: 'post'
  })
}
