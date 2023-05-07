import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/centripetal-web-admin/group/list',
    method: 'get',
    params: query
  })
}

export function fetchInfo(id) {
  return request({
    url: '/centripetal-web-admin/group/info',
    method: 'get',
    params: { id }
  })
}

export function createGroup(data) {
  return request({
    url: '/centripetal-web-admin/group/create',
    method: 'post',
    data
  })
}

export function deleteGroup(data) {
  return request({
    url: '/centripetal-web-admin/group/delete',
    method: 'post',
    data
  })
}

// 小组信息
export function deleteMember(data) {
  return request({
    url: '/centripetal-web-admin/group/id/delete/memberid',
    method: 'post',
    data
  })
}

export function addMember(data) {
  return request({
    url: '/centripetal-web-admin/group/id/addmember',
    method: 'post',
    data
  })
}

export function postNotification(data) {
  return request({
    url: '/centripetal-web-admin/group/notice',
    method: 'post',
    data
  })
}

export function fetchNotifications(id) {
  return request({
    url: '/centripetal-web-admin/group/notice',
    method: 'get',
    params: { id }
  })
}
