// import { encode } from 'punycode';

export * from './constant';

export const getItemInLocalStorage = (key) => {
    if (!key) {
        console.error('cannot store in local storage');
    }
    return localStorage.getItem(key);
}

export const removeItemInLocalStorage = (key) => {
    if (!key || !value) {
        console.error('cannot store in local storage');
    }
    localStorage.removeItem(key);
}

export const setItemInLocalStorage = (key, value) => {
    if (!key || !value) {
        console.error('cannot store in local storage');
    }
    const valueToStore = typeof value !== "string" ? JSON.stringfy(value) : value;
    localStorage.setItem(key, valueToStore);
}
export const getFormBody = (params) => {
    let formBody = [];
    for (let properKey in params) {
        let encodedKey = encodeURIComponent(properKey);
        let encodedValue = encodeURIComponent(params[properKey]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
}

