import request from '@/utils/request'

// 查询user用户参与答题活动的关系列表
export function listContest_rec(query) {
  return request({
    url: '/system/contest-rec/list',
    method: 'get',
    params: query
  })
}

// 查询user用户参与答题活动的关系详细
export function getContest_rec(userId) {
  return request({
    url: '/system/contest-rec/' + userId,
    method: 'get'
  })
}

// 新增user用户参与答题活动的关系
export function addContest_rec(data) {
  return request({
    url: '/system/contest-rec',
    method: 'post',
    data: data
  })
}

// 修改user用户参与答题活动的关系
export function updateContest_rec(data) {
  return request({
    url: '/system/contest-rec',
    method: 'put',
    data: data
  })
}

// 删除user用户参与答题活动的关系
export function delContest_rec(userId) {
  return request({
    url: '/system/contest-rec/' + userId,
    method: 'delete'
  })
}
