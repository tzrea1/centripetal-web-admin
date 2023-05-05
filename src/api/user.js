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

export function fetchList(query) {
  return request({
    url: '/centripetal-web-admin/user/list',
    method: 'get',
    params: query
  })
}

export function fetchUser(id) {
  return request({
    url: '/centripetal-web-admin/user/detail',
    method: 'get',
    params: { id }
  })
}

export function createUser(data) {
  return request({
    url: '/centripetal-web-admin/user/create',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/centripetal-web-admin/user/edit',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/centripetal-web-admin/user/update',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/centripetal-web-admin/user/delete',
    method: 'post',
    data
  })
}
