import request from '@/utils/request'

// 查询权限角色，包括普通用户user，管理员leader，组长headman列表
export function listRole(query) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询权限角色，包括普通用户user，管理员leader，组长headman详细
export function getRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'get'
  })
}

// 新增权限角色，包括普通用户user，管理员leader，组长headman
export function addRole(data) {
  return request({
    url: '/system/role',
    method: 'post',
    data: data
  })
}

// 修改权限角色，包括普通用户user，管理员leader，组长headman
export function updateRole(data) {
  return request({
    url: '/system/role',
    method: 'put',
    data: data
  })
}

// 删除权限角色，包括普通用户user，管理员leader，组长headman
export function delRole(roleId) {
  return request({
    url: '/system/role/' + roleId,
    method: 'delete'
  })
}
