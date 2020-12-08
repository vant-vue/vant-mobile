import { axios } from '@/utils/request'
import {getHeadersLocalStorage} from '@/utils/cookie'

//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
	headers:{"localStorage":JSON.stringify(getHeadersLocalStorage())},
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
  return axios({
    url: url,
    method:method ,
	headers:{"localStorage":JSON.stringify(getHeadersLocalStorage())},
    data: parameter
  })
}

//put
export function putAction(url,parameter) {
  return axios({
    url: url,
    method:'put',
	headers:{"localStorage":JSON.stringify(getHeadersLocalStorage())},
    data: parameter
  })
}

//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
	headers:{"localStorage":JSON.stringify(getHeadersLocalStorage())},
    params: parameter
  })
}

//deleteAction
export function deleteAction(url,parameter) {
  return axios({
    url: url,
    method: 'delete',
	headers:{"localStorage":JSON.stringify(getHeadersLocalStorage())},
    params: parameter
  })
}

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url,parameter){
  return axios({
    url: url,
    method:'post' ,
    data: parameter,
    responseType: 'blob'
  })
}
