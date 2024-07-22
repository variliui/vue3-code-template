import request from '@/utils/request'
import { ISearchMenuAccessResp } from './headerApiHelper'

/**获取角色菜单信息 */
export const searchMenuAccess = (): Promise<ISearchMenuAccessResp> => {
    return request({
        url: 'platform/resource/mbse/search/searchMenuAccess',
        method: 'get'
    })
}


