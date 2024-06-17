import { isEmpty } from 'lodash-es'

let performenceTime = performance.now()

/**
 * 用来进行性能优化时进行时间的测算，并输出到控制台
 * @param msg 监听时间的额外输出信息
 * @returns 空
 */
export const watchTime = (msg: string) => {
  const t1 = performance.now()
  logToWindow(msg + ' : ', (t1 - performenceTime).toFixed(2), ' ms')
  performenceTime = t1
}
/**
 * 用来暂停一段时间再执行下方的函数
 * @example await sleep(500);
 * @param time 暂停执行的时间
 * @returns 空
 */
export const sleep = async (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const sliceData = (data: string) => {
  if (typeof data !== 'string') {
    return data
  } else {
    return data === undefined || data.length === 0
      ? '无'
      : data.length < 10
        ? data
        : data.slice(0, 10) + '...'
  }
}

const strMaxLength = 10
interface ISliceData {
  rawName: string
  displayName: string
}
/**
 * 将字符串切成...的形式
 * @param data 待裁切的字符串
 * @returns 字符串为空时返回无，长度超出10时用...来隐藏
 */
export const sliceName = (data: string): ISliceData => {
  if (isEmpty(data)) {
    return { rawName: data, displayName: '无' }
  } else if (data.length > strMaxLength) {
    return { rawName: data, displayName: data.slice(0, strMaxLength) + '...' }
  } else {
    return { rawName: data, displayName: data }
  }
}

export function logToWindow(...args: any) {
  console.log(...args)
}

/**
 * 将对象数组根据对象中的某个属性去重
 * @param arr 待去重的对象数组
 * @param keys 要去重的属性名称
 * @returns 去重后的数组
 */
export const deduplicatedArray = (arr: any[], ...keys: string[]) => {
  // 缓存用于记录
  const cache: any[] = []
  for (const obj of arr) {
    // 检查缓存中是否已经存在
    if (
      cache.find((cObj) => {
        return keys.every((key) => cObj[key] === obj[key])
      })
    ) {
      // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
      continue
    }
    // 不存在就说明以前没遇到过，把它记录下来
    cache.push(obj)
  }
  // 记录结果就是过滤后的结果
  return cache
}
/**
 * 将await转变为类似于go的[error, data]的格式
 * @return { Promise }
 */
export const awaitToGo = <T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }
      return [err, undefined]
    })
}
/**
 * 根据对象的某个key将之铺平成一个对象数组
 * @param obj 要展开的对象
 * @param key 对象上的key值
 */
export const flatObj = (obj: any, key: string, sortKey?: string) => {
  const target: any[] = []
  const baseFlat = (obj: any) => {
    target.push(obj)
    if (obj[key]?.length > 0) {
      obj[key].forEach((item: any) => {
        baseFlat(item)
      })
    }
  }
  baseFlat(obj)
  if (sortKey) {
    target.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return -1
      }
      if (a[sortKey] > b[sortKey]) {
        return 1
      }
      return 0
    })
  }
  return target
}
