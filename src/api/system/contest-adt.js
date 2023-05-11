import request from '@/utils/request'

// 查询审核员审核答题活动的记录列表
export function listContest_adt(query) {
  return request({
    url: '/system/contest-adt/list',
    method: 'get',
    params: query
  })
}

// 查询审核员审核答题活动的记录详细
export function getContest_adt(query) {
  return request({
    url: '/system/contest-adt',
    method: 'get',
    params: query
  })
}

// 新增审核员审核答题活动的记录
export function addContest_adt(data) {
  return request({
    url: '/system/contest-adt',
    method: 'post',
    data: data
  })
}

// 修改审核员审核答题活动的记录
export function updateContest_adt(data) {
  return request({
    url: '/system/contest-adt',
    method: 'put',
    data: data
  })
}

// 删除审核员审核答题活动的记录
export function delContest_adt(auditorIds) {
  return request({
    url: '/system/contest-adt',
    method: 'delete',
    data: auditorIds
  })
}
