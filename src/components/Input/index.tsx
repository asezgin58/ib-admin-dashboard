import { useEffect } from 'react';
import { OutlinedInput, InputLabel, FormControl, FormHelperText, InputAdornment } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { ITextFieldProps } from '../types';
import { getMessage } from '../../_common/_helpers';

const Input = (props: ITextFieldProps) => {
    const {
        helperText,
        errorText,
        name,
        id = uuidv4(),
        autoComplete = 'off',
        type = 'text',
        className = '',
        size = 'large',
        defaultValue,
        disabled,
        readOnly,
        required,
        watch,
        labelActive,
        watchDefaultValue,
        hidden = false,
        tabIndex = 0,
        autoFocus = false,
        startAdornment,
        endAdornment,
        maxLength,
        minLength,
        onFocus,
        onBlur,
        label,
        multiline,
        rows,
        placeholder,
        ...rest
    } = props;

    const { control, errors, setError, watch: watchFunc } = useFormContext();

    const watchValue = watchDefaultValue ? watchFunc(name, watchDefaultValue) : watchFunc(name);

    useEffect(() => {
        errorText &&
            setError(name, {
                type: 'manual',
                message: errorText,
            });
        // eslint-disable-next-line
    }, [errorText, name]);

    useEffect(() => {
        watch && watch(watchValue);
    }, [watchValue, watch]);

    return (
        <FormControl
            variant="outlined"
            error={!!getMessage(errors, name)}
            className={`custom-outlined-input ${size} ${className}`}
            disabled={disabled}
            required={required}
            fullWidth
            tabIndex={tabIndex}
            hidden={hidden}
        >
            <InputLabel htmlFor={id} {...(props.hasOwnProperty('labelActive') && labelActive ? { shrink: true } : {})}>
                {label}
            </InputLabel>
            <Controller
                as={
                    <OutlinedInput
                        type={type}
                        readOnly={readOnly}
                        autoFocus={autoFocus}
                        onFocus={(e: any) => onFocus && onFocus(e)}
                        label={label}
                        autoComplete={autoComplete}
                        notched={labelActive}
                        inputProps={{
                            maxLength: maxLength,
                            minLength: minLength,
                            onBlur: (e: any) => {
                                e.persist();
                                onBlur && onBlur(e);
                            },
                            placeholder: placeholder,
                        }}
                        multiline={multiline}
                        rows={rows}
                        {...rest}
                        {...(startAdornment
                            ? {
                                  startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
                              }
                            : {})}
                        {...(endAdornment
                            ? {
                                  endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
                              }
                            : {})}
                    />
                }
                id={id}
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
            {(!!getMessage(errors, name) || helperText) && (
                <FormHelperText id="component-error-text">{getMessage(errors, name) || helperText}</FormHelperText>
            )}
        </FormControl>
    );
};

Input.defaultProps = {
    size: 'large',
};

export default Input;
