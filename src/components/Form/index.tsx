import { useCallback, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { object } from 'yup';

export interface IProps {
    /**
     * Checks submit method of the form
     */
    onSubmit: any;
    /**
     * Checks child elements of the form
     */
    children?: any;
    /**
     * Checks default values of the form
     */
    defaultValues?: any;
    /**
     * Checks validation rules of the form
     */
    validationSchema?: any;
}

const useYupValidationResolver = (validationSchema: any) =>
    useCallback(
        async (data: any) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });
                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                return {
                    values: {},
                    errors: errors.inner.reduce(
                        (allErrors: any, currentError: any) => ({
                            ...allErrors,
                            [currentError.path]: {
                                type: currentError.type ?? 'validation',
                                message:
                                    currentError.type === 'typeError'
                                        ? `Tip Hatası. (Çıktı '${currentError.params.type}' bir değer olmalı)`
                                        : currentError.message,
                            },
                        }),
                        {},
                    ),
                };
            }
        },
        [validationSchema],
    );

const Form = ({ defaultValues, onSubmit, children, validationSchema }: IProps) => {
    const vs = useMemo(() => object({ ...validationSchema }), [validationSchema]);
    const resolver = useYupValidationResolver(vs);

    const methods = useForm({ defaultValues: defaultValues, resolver });
    const onSubmitForm = (data: any) => onSubmit(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitForm)} noValidate autoComplete="off">
                {children}
            </form>
        </FormProvider>
    );
};

Form.displayName = 'Form';
export default Form;
