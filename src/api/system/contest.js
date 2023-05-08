import request from '@/utils/request'

// 查询答题活动列表
export function listContest(query) {
  return request({
    url: '/system/contest/list',
    method: 'get',
    params: query
  })
}

// 查询答题活动详细
export function getContest(quizActivityId) {
  return request({
    url: '/system/contest/' + quizActivityId,
    method: 'get'
  })
}

// 新增答题活动
export function addContest(data) {
  return request({
    url: '/system/contest',
    method: 'post',
    data: data
  })
}

// 修改答题活动
export function updateContest(data) {
  return request({
    url: '/system/contest',
    method: 'put',
    data: data
  })
}

// 删除答题活动
export function delContest(quizActivityId) {
  return request({
    url: '/system/contest/' + quizActivityId,
    method: 'delete'
  })
}
