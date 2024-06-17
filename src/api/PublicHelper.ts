import { AxiosResponse } from 'axios'

export interface IResponse<T = any> extends AxiosResponse {
  data: T
  code: number
  msg: string
}