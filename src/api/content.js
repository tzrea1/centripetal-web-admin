import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/centripetal-web-admin/content/list',
    method: 'get',
    params: query
  })
}

export function fetchContent(id) {
  return request({
    url: '/centripetal-web-admin/content/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/centripetal-web-admin/content/pv',
    method: 'get',
    params: { pv }
  })
}

export function createContent(data) {
  return request({
    url: '/centripetal-web-admin/content/create',
    method: 'post',
    data
  })
}

export function updateContent(data) {
  return request({
    url: '/centripetal-web-admin/content/update',
    method: 'post',
    data
  })
}
