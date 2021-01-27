import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAxios, { configure, UseAxios } from 'axios-hooks';
import toastMessage from '../../components/Notification/toastMessage';
import { getFieldError, removeFieldError } from './errors';
//import { encryption } from '../../lib/_helpers';

function buildRequestHeader(): HeadersInit {
    return {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
    };
}

const Api: any = Axios.create({
    baseURL: '',
    timeout: Number(5000),
});

let toastObject: any = {
    messageType: 'error',
    timeout: 5000,
    position: 'bottomRight',
};

const cancelToken = Axios.CancelToken.source();

// request interceptor
Api.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        config.headers = buildRequestHeader();
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

// rreponse interceptor
Api.interceptors.response.use(
    (response: AxiosResponse) => {
        //response.data = decryption(response.data);
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/auth/login?ref=' + window.location.pathname;
            }

            if ([403, 404].indexOf(error.response.status) > -1) {
                toastObject = {
                    ...toastObject,
                    message: 'Sistemsel bir hata oluştu, Lütfen yeniden deneyin.',
                };
            } else if ([400, 422].indexOf(error.response.status) > -1) {
                const err: any = error.response.data;

                toastObject = {
                    ...toastObject,
                    message: err.Error.Message || 'Bir hata oluştu, Lütfen işlemleri kontrol edin.',
                };
            } else {
                toastObject = {
                    ...toastObject,
                    message: 'Sistemsel bir hata oluştu, Lütfen yeniden deneyin.',
                };
            }

            toastMessage(toastObject);
        } else {
            toastObject = {
                ...toastObject,
                message: 'İşlem zaman aşımına uğradı, Lütfen yeniden deneyin.',
            };
            error.message && toastMessage(toastObject);
        }

        return Promise.reject(error);
    },
);

configure({ cache: false, axios: Api });
const axiosHooks: UseAxios = useAxios;

export { axiosHooks, Api, getFieldError, removeFieldError, cancelToken };
