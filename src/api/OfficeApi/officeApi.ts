import request from '@/utils/request';

export const getFileFromServer = (fileId: string) => {
    return request({
        url: '/preview/resource/mbse/view/documentPreview' + '?objectId=' + fileId,
        headers: {
            "content-type": "application/json; charset=utf-8",
        },
        responseType: "blob",       //设置响应类型为blob，否则二进制流直接转换会出错
    })
}