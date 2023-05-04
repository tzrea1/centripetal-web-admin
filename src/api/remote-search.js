import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/centripetal-web-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/centripetal-web-admin/transaction/list',
    method: 'get',
    params: query
  })
}
