import request from '@/utils/request'

// 查询审核员实体列表
export function listAuditor(query) {
  return request({
    url: '/system/auditor/list',
    method: 'get',
    params: query
  })
}

// 查询审核员实体详细
export function getAuditor(auditorId) {
  return request({
    url: '/system/auditor/' + auditorId,
    method: 'get'
  })
}

// 新增审核员实体
export function addAuditor(data) {
  return request({
    url: '/system/auditor',
    method: 'post',
    data: data
  })
}

// 修改审核员实体
export function updateAuditor(data) {
  return request({
    url: '/system/auditor',
    method: 'put',
    data: data
  })
}

// 删除审核员实体
export function delAuditor(auditorId) {
  return request({
    url: '/system/auditor/' + auditorId,
    method: 'delete'
  })
}
