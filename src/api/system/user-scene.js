import request from '@/utils/request'

// 查询用户虚拟场景间体验关系列表
export function listUser(query) {
  return request({
    url: '/system/scene-user/list',
    method: 'get',
    params: query
  })
}

// 查询用户虚拟场景间体验关系详细
export function getUser(userId) {
  return request({
    url: '/system/scene-user/' + userId,
    method: 'get'
  })
}

// 新增用户虚拟场景间体验关系
export function addUser(data) {
  return request({
    url: '/system/scene-user',
    method: 'post',
    data: data
  })
}

// 修改用户虚拟场景间体验关系
export function updateUser(data) {
  return request({
    url: '/system/scene-user',
    method: 'put',
    data: data
  })
}

// 删除用户虚拟场景间体验关系
export function delUser(userId) {
  return request({
    url: '/system/scene-user/' + userId,
    method: 'delete'
  })
}
