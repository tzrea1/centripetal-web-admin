import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/contest/list',
    method: 'get',
    params: query
  })
}

export function fetchContest(id) {
  return request({
    url: '/system/contest/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/system/contest/pv',
    method: 'get',
    params: { pv }
  })
}

export function createContest(data) {
  return request({
    url: '/system/contest/create',
    method: 'post',
    data
  })
}

export function editContest(data) {
  return request({
    url: '/system/contest/edit',
    method: 'post',
    data
  })
}

export function updateContest(data) {
  return request({
    url: '/system/contest/update',
    method: 'post',
    data
  })
}

export function deleteContest(data) {
  return request({
    url: '/system/contest/delete',
    method: 'post',
    data
  })
}
