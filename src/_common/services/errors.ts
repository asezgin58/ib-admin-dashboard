import { AxiosError } from 'axios';
import { get } from 'lodash';

export const getFieldError = (error: AxiosError) => {
    let errorObject: any = null;

    if (error && error.isAxiosError && error.response) {
        const err: any = error.response.data;
        if (get(err, ['Errors', 'Items']) && get(err, ['Errors', 'Items']).length) {
            get(err, ['Errors', 'Items']).forEach((item: any) => {
                errorObject = {
                    ...errorObject,
                    [item.Key]: item.Message,
                };
            });
        }
    }

    return errorObject;
};

export const removeFieldError = (errors: any, nextValue: any, key: string) => {
    if (errors && errors[key] && errors[key] !== nextValue) {
        const errObj: any = errors;
        delete errObj[key];
        return errObj;
    }

    return errors;
};
