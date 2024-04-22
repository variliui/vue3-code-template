import { AxiosResponse } from 'axios'
import { loadEnv } from 'vite';

export interface IResponse<T = any> extends AxiosResponse {
  data: T
  code: number
  msg: string
}

export const getViteEnv = (mode: string, target: string) => {
	return loadEnv(mode, process.cwd())[target];
};

/**
 * 在这里添加对外导出的变量会导致使用此导出变量的函数出现inject__query报错
 */