import { SUCCESS_CODE, timeout } from './helper'
import { MockMethod } from 'vite-plugin-mock'

export default [
  // mock模板
  {
    url: 'mockUrl',
    method: 'post',
    timeout,
    response: ({ query, body }) => {
      return {
        code: SUCCESS_CODE,
        msg: '',
        data: '',
      }
    }
  }
] as MockMethod[]
