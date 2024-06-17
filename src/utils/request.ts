import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/auth'
import { logToWindow } from '@/utils/util'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// create an axios instance
const service: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: import.meta.env.VITE_API_PREFIX,
  // send cookies when cross-domain requests
  withCredentials: true,
  // request timeout
  timeout: 6000
})

// request interceptor
service.interceptors.request.use(
  //@ts-ignore
  (config: AxiosRequestConfig) => {
    // // do something before request is sent
    // if(import.meta.env.MODE === 'development') {
    //   // 让每个请求携带自定义token 请根据实际情况自行修改
    //   config.headers['Authorization'] = token
    // }else{
    //   if (getToken()) {
    //     // 让每个请求携带自定义token 请根据实际情况自行修改
    //     config.headers['Authorization'] = getToken()
    //   }
    // }
    return config
  },
  (error) => {
    // do something with request error
    logToWindow(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    //@ts-ignore
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    // return response
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error: any) => {
    logToWindow('error: ' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
