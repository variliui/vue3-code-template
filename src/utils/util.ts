import { isEmpty } from 'lodash-es';

let performanceTime = performance.now();

/**
 * 用来进行性能优化时进行时间的测算，并输出到控制台
 * @param msg 监听时间的额外输出信息
 * @returns 空
 */
export const watchTime = (msg: string) => {
    const t1 = performance.now();
    logToWindow(msg + ' : ', (t1 - performanceTime).toFixed(2), ' ms');
    performanceTime = t1;
};
/**
 * 用来暂停一段时间再执行下方的函数
 * @example await sleep(500);
 * @param time 暂停执行的时间
 * @returns 空
 */
export const sleep = async (time: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
/**
 * 对输入的字符串进行切片处理
 * @param data 输入的字符串
 * @returns 如果输入的不是字符串，直接返回输入值；
 *          如果输入的是字符串，但是未定义或长度为0，返回'无'；
 *          如果输入的是字符串，且长度小于10，返回原字符串；
 *          如果输入的是字符串，且长度大于或等于10，返回前10个字符加上'...'。
 */
export const sliceData = (data: string) => {
    if (typeof data !== 'string') {
        return data;
    } else {
        return data === undefined || data.length === 0
            ? '无'
            : data.length < 10
              ? data
              : data.slice(0, 10) + '...';
    }
};

const strMaxLength = 10;
interface ISliceData {
    rawName: string;
    displayName: string;
}
/**
 * 将字符串切成...的形式
 * @param data 待裁切的字符串
 * @returns 字符串为空时返回无，长度超出10时用...来隐藏
 */
export const sliceName = (data: string): ISliceData => {
    if (isEmpty(data)) {
        return { rawName: data, displayName: '无' };
    } else if (data.length > strMaxLength) {
        return { rawName: data, displayName: data.slice(0, strMaxLength) + '...' };
    } else {
        return { rawName: data, displayName: data };
    }
};

export const logToWindow = (...args: any) => {
    console.log(...args);
};

/**
 * 将对象数组根据对象中的某个属性去重
 * @param arr 待去重的对象数组
 * @param keys 要去重的属性名称
 * @returns 去重后的数组
 */
export const deduplicatedArray = (arr: any[], ...keys: string[]) => {
    // 缓存用于记录
    const cache: any[] = [];
    for (const obj of arr) {
        // 检查缓存中是否已经存在
        if (
            cache.find((cObj) => {
                return keys.every((key) => cObj[key] === obj[key]);
            })
        ) {
            // 已经存在说明以前记录过，现在这个就是多余的，直接忽略
            continue;
        }
        // 不存在就说明以前没遇到过，把它记录下来
        cache.push(obj);
    }
    // 记录结果就是过滤后的结果
    return cache;
};
/**
 * 将await转变为类似于go的[error, data]的格式
 * @return { Promise }
 */
export const awaitToGo = async <T, U = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<[U, undefined] | [null, T]> => {
    try {
        const data = await promise;
        const result: [null, T] = [null, data];
        return result;
    } catch (err) {
        if (errorExt) {
            const parsedError = Object.assign({}, err, errorExt);
            return [parsedError, undefined];
        }
        const resultError: [U, undefined] = [err.message, undefined];
        return resultError;
    }
};
/**
 * 根据对象的某个key将之铺平成一个对象数组
 * @param obj 要展开的对象
 * @param key 对象上的key值
 */
export const flatObj = (obj: any, key: string, sortKey?: string) => {
    const target: any[] = [];
    const baseFlat = (obj: any) => {
        target.push(obj);
        if (obj[key]?.length > 0) {
            obj[key].forEach((item: any) => {
                baseFlat(item);
            });
        }
    };
    baseFlat(obj);
    if (sortKey) {
        target.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) {
                return -1;
            }
            if (a[sortKey] > b[sortKey]) {
                return 1;
            }
            return 0;
        });
    }
    return target;
};

/**
 * 根据icon名称获取随机颜色
 * @param icon icon名称
 * @param fullAlpha 是否完全透明
 * @returns 随机颜色 '#xxxxxx80' 或 '#xxxxxxFF'
 */
export const getIconColor = (icon: string, fullAlpha?: boolean) => {
    const hash = icon.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c + (fullAlpha ? 'ff' : '80');
};

/**
 * @returns 随机8位的字符串
 */
export const generateRandomString = () => {
    return Math.random().toString(36).slice(-8);
};

// 防抖函数
export function debounce(func: Function, wait: number, immediate: boolean) {
    let timeout: NodeJS.Timeout | undefined;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = undefined;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}