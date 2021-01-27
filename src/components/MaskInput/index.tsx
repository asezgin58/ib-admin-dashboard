import React, { useEffect } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { IMaskFieldProps } from '../types';
import MaskedInput from './MaskInput';
import { getMessage } from '../../_common/_helpers';

const MaskInput = (props: IMaskFieldProps) => {
    const {
        helperText,
        errorText,
        name,
        id = uuidv4(),
        autoComplete = 'off',
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
        format,
        onFocus,
        label,
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
        <Controller
            render={(controllerProps) => (
                <TextField
                    {...controllerProps}
                    type="text"
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    label={label}
                    required={required}
                    autoComplete={autoComplete}
                    InputLabelProps={{
                        ...(labelActive ? { shrink: true } : {}),
                    }}
                    hidden={hidden}
                    fullWidth
                    disabled={disabled}
                    multiline={false}
                    spellCheck={false}
                    variant="outlined"
                    error={!!getMessage(errors, name)}
                    tabIndex={tabIndex}
                    className={`custom-outlined-input ${size} ${className}`}
                    helperText={getMessage(errors, name) || helperText}
                    InputProps={{
                        ...(startAdornment
                            ? {
                                  startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
                              }
                            : {}),
                        ...(endAdornment
                            ? {
                                  endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
                              }
                            : {}),
                        inputComponent: MaskedInput as any,
                        inputProps: {
                            ...format,
                        },
                    }}
                    onChange={(e) => {
                        controllerProps.onChange(e.target.value);
                    }}
                    onFocus={(e: any) => onFocus && onFocus(e)}
                    {...rest}
                />
            )}
            id={id}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    );
};

MaskInput.defaultProps = {
    size: 'large',
};

export default MaskInput;
