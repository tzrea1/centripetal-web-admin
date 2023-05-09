import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/system/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/system/transaction/list',
    method: 'get',
    params: query
  })
}
