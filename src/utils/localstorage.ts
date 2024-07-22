export const LocalStorageMethods = {
    get: 'get',
    set: 'set',
    remove: 'remove'
};

export const LocalStorageKeys = {
    idConnections: 'idConnections'
};

const localStorageError = '浏览器不支持localStorage';

export const handleLocalStorage = (method: string, key: string, value?: any) => {
    if (!window.localStorage) {
        alert(localStorageError);
    }
    switch (method) {
        case LocalStorageMethods.get: {
            const temp = window.localStorage.getItem(key);
            if (temp) {
                return temp;
            } else {
                return false;
            }
        }
        case LocalStorageMethods.set: {
            window.localStorage.setItem(key, value);
            break;
        }
        case LocalStorageMethods.remove: {
            window.localStorage.removeItem(key);
            break;
        }
        default: {
            return false;
        }
    }
};
