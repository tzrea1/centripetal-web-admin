import request from '@/utils/request'

// 查询user用户参与党史内容学习的关系列表
export function listContent_rec(query) {
  return request({
    url: '/system/content-rec/list',
    method: 'get',
    params: query
  })
}

// 查询user用户参与党史内容学习的关系详细
export function getContent_rec(phStudyId) {
  return request({
    url: '/system/content-rec/' + phStudyId,
    method: 'get'
  })
}

// 新增user用户参与党史内容学习的关系
export function addContent_rec(data) {
  return request({
    url: '/system/content-rec',
    method: 'post',
    data: data
  })
}

// 修改user用户参与党史内容学习的关系
export function updateContent_rec(data) {
  return request({
    url: '/system/content-rec',
    method: 'put',
    data: data
  })
}

// 删除user用户参与党史内容学习的关系
export function delContent_rec(phStudyId) {
  return request({
    url: '/system/content-rec/' + phStudyId,
    method: 'delete'
  })
}
