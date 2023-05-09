import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/content/list',
    method: 'get',
    params: query
  })
}

export function fetchContent(id) {
  return request({
    url: '/system/content/detail',
    method: 'get',
    params: { id }
  })
}

export function createContent(data) {
  return request({
    url: '/system/content/create',
    method: 'post',
    data
  })
}

export function updateContent(data) {
  return request({
    url: '/system/content/update',
    method: 'post',
    data
  })
}

export function deleteContent(id) {
  return request({
    url: '/system/content/delete',
    method: 'post',
    params: { id }
  })
}
