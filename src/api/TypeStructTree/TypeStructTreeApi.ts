import request from '@/utils/request'
import { IResponse } from '../PublicHelper'
import { urlPrefix } from '../ApiConfig';

/**
 * 使用mock时的前缀
 */
// const urlPrefix = '/mock/resource/compare/'
// const urlPrefix = '/resource/compare/'
// const devPrefix = getViteEnv(import.meta.env.MODE, 'VITE_API_PREFIX')

/**
 * 结构树页面top选择型号列表接口
 */
export const getTopNodeList = (): Promise<IResponse<any[]>> => {
  return request({
    // baseURL: 'http://atoz.asp.com:6023',
    url: urlPrefix + 'getTopNodeList',
    method: 'get'
  })
}