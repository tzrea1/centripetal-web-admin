import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/system/table/list',
    method: 'get',
    params
  })
}
