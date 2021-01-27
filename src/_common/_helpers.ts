import { get } from 'lodash';

export const getMessage = (errors: any, name: string) => {
    const messageArr = get(errors, name);
    if (messageArr) {
        return messageArr.message;
    }
    return null;
};

export const getApiBaseUrl = () => {
    return '';
};

export function buildRequestHeader(): HeadersInit {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
    };
}