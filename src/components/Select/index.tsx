import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Select as MuiSelect,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    InputAdornment,
} from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import { ISelectFieldProps } from '../types';
import { getMessage } from '../../_common/_helpers';

const Select = (props: ISelectFieldProps) => {
    const {
        helperText,
        errorText,
        name,
        id = uuidv4(),
        className = '',
        size = 'large',
        defaultValue,
        disabled,
        readOnly,
        required,
        labelActive,
        displayEmpty = false,
        displayEmptyValue = 'Seçimi kaldır',
        watch,
        watchDefaultValue,
        hidden = false,
        tabIndex = 0,
        autoFocus = false,
        startAdornment,
        options,
        label,
        ...rest
    } = props;

    const { data, displayValue, displayField } = options;
    const { control, errors, setError, watch: watchFunc } = useFormContext();
    const watchValue = watchDefaultValue ? watchFunc(name, watchDefaultValue) : watchFunc(name);

    const renderItems = () => {
        if (data && data.length) {
            return data.map((item: any, i: number) => {
                return (
                    <MenuItem key={`single_select_${i}`} value={item[displayValue]}>
                        {item[displayField]}
                    </MenuItem>
                );
            });
        }

        return null;
    };

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
        <>
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
                <InputLabel
                    htmlFor={id}
                    {...(props.hasOwnProperty('labelActive') && labelActive ? { shrink: true } : {})}
                >
                    {label}
                </InputLabel>
                <Controller
                    as={
                        <MuiSelect
                            label={label}
                            displayEmpty={!displayEmpty}
                            readOnly={readOnly}
                            autoFocus={autoFocus}
                            MenuProps={{
                                PaperProps: {
                                    className: 'select-dropdown-menu-container',
                                    style: { maxHeight: 300 },
                                },
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                },
                                transformOrigin: {
                                    vertical: 'top',
                                    horizontal: 'left',
                                },
                                getContentAnchorEl: null,
                            }}
                            {...(startAdornment
                                ? {
                                      startAdornment: (
                                          <InputAdornment position="start">{startAdornment}</InputAdornment>
                                      ),
                                  }
                                : {})}
                            {...rest}
                        >
                            {displayEmpty && watchValue && (
                                <MenuItem className="dropdown-empty-value" value="">
                                    <span>&#10006;</span>
                                    {displayEmptyValue}
                                </MenuItem>
                            )}
                            {renderItems()}
                        </MuiSelect>
                    }
                    labelId={id}
                    id={id}
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                />
                {(!!getMessage(errors, name) || helperText) && (
                    <FormHelperText id="component-error-text">{getMessage(errors, name) || helperText}</FormHelperText>
                )}
            </FormControl>
        </>
    );
};

Select.defaultProps = {
    size: 'large',
    displayEmptyValue: 'Seçimi kaldır',
    displayEmpty: false,
};

export default Select;
