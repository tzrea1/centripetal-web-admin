import request from '@/utils/request'

// 查询虚拟场景相关文件列表
export function listFile(query) {
  return request({
    url: '/system/scene-file/list',
    method: 'get',
    params: query
  })
}

// 查询虚拟场景相关文件详细
export function getFile(scenefileId) {
  return request({
    url: '/system/scene-file/' + scenefileId,
    method: 'get'
  })
}

// 新增虚拟场景相关文件
export function addFile(data) {
  return request({
    url: '/system/scene-file',
    method: 'post',
    data: data
  })
}

// 修改虚拟场景相关文件
export function updateFile(data) {
  return request({
    url: '/system/scene-file',
    method: 'put',
    data: data
  })
}

// 删除虚拟场景相关文件
export function delFile(scenefileId) {
  return request({
    url: '/system/scene-file/' + scenefileId,
    method: 'delete'
  })
}
