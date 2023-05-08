import request from '@/utils/request'

// 查询党史内容学习活动列表
export function listContent(query) {
  return request({
    url: '/system/content/list',
    method: 'get',
    params: query
  })
}

// 查询党史内容学习活动详细
export function getContent(phStudyId) {
  return request({
    url: '/system/content/' + phStudyId,
    method: 'get'
  })
}

// 新增党史内容学习活动
export function addContent(data) {
  return request({
    url: '/system/content',
    method: 'post',
    data: data
  })
}

// 修改党史内容学习活动
export function updateContent(data) {
  return request({
    url: '/system/content',
    method: 'put',
    data: data
  })
}

// 删除党史内容学习活动
export function delContent(phStudyId) {
  return request({
    url: '/system/content/' + phStudyId,
    method: 'delete'
  })
}
