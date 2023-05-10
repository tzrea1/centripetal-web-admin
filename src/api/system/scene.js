import request from '@/utils/request'

// 查询虚拟场景列表
export function listScene(query) {
  return request({
    url: '/system/scene/list',
    method: 'get',
    params: query
  })
}

// 查询虚拟场景详细
export function getScene(sceneId) {
  return request({
    url: '/system/scene/' + sceneId,
    method: 'get'
  })
}

// 新增虚拟场景
export function addScene(data) {
  return request({
    url: '/system/scene',
    method: 'post',
    data: data
  })
}

// 修改虚拟场景
export function updateScene(data) {
  return request({
    url: '/system/scene',
    method: 'put',
    data: data
  })
}

// 删除虚拟场景
export function delScene(sceneId) {
  return request({
    url: '/system/scene/' + sceneId,
    method: 'delete'
  })
}
