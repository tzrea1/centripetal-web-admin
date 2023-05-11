import request from '@/utils/request'

// 查询审核员审核党史内容学习的记录列表
export function listContent_adt(query) {
  return request({
    url: '/system/content-adt/list',
    method: 'get',
    params: query
  })
}

// 查询审核员审核党史内容学习的记录详细
export function getContent_adt(query) {
  return request({
    url: '/system/content-adt',
    method: 'get',
    params: query
  })
}

// 新增审核员审核党史内容学习的记录
export function addContent_adt(data) {
  return request({
    url: '/system/content-adt',
    method: 'post',
    data: data
  })
}

// 修改审核员审核党史内容学习的记录
export function updateContent_adt(data) {
  return request({
    url: '/system/content-adt',
    method: 'put',
    data: data
  })
}

// 删除审核员审核党史内容学习的记录
export function delContent_adt(data) {
  return request({
    url: '/system/content-adt',
    method: 'delete',
    data: data
  })
}
