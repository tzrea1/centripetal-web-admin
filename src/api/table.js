import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/centripetal-web-admin/table/list',
    method: 'get',
    params
  })
}
