import { useEffect } from 'react';
import { Checkbox as MuiCheckbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { getMessage } from '../../_common/_helpers';
import { ICheckboxProps } from '../types';

const Checkbox = (props: ICheckboxProps) => {
    const {
        id = uuidv4(),
        name,
        defaultChecked,
        errorText,
        watch,
        size,
        disabled,
        className,
        required,
        tabIndex,
        helperText,
        label,
        onChange,
        labelPlacement,
        unCheckedIcon,
        checkedIcon,
        disableRipple,
        disableFocusRipple,
        indeterminate,
        indeterminateIcon,
        edge,
    } = props;

    const { control, errors, setError, watch: watchFunc, setValue } = useFormContext();

    const watchValue = watchFunc(name);

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
                error={!!getMessage(errors, name)}
                className={`custom-checkbox-wrapper ${className}`}
                disabled={disabled}
                required={required}
                tabIndex={tabIndex}
            >
                <Controller
                    id={id}
                    name={name}
                    control={control}
                    defaultValue={defaultChecked}
                    render={(controllerProps: any) => {
                        return (
                            <FormControlLabel
                                className={'custom-checkbox-label'}
                                control={
                                    <MuiCheckbox
                                        className={'custom-checkbox'}
                                        defaultChecked={defaultChecked}
                                        checked={controllerProps.value}
                                        checkedIcon={checkedIcon}
                                        icon={unCheckedIcon}
                                        disableRipple={disableRipple}
                                        disableFocusRipple={disableFocusRipple}
                                        indeterminate={indeterminate}
                                        indeterminateIcon={indeterminateIcon}
                                        value={controllerProps.value}
                                        onChange={() => {
                                            controllerProps.onChange && controllerProps.onChange();
                                            onChange && onChange();
                                            setValue(name, !watchValue);
                                        }}
                                        size={size}
                                        edge={edge}
                                    />
                                }
                                label={label}
                                labelPlacement={labelPlacement}
                            />
                        );
                    }}
                />
                {(!!getMessage(errors, name) || helperText) && (
                    <FormHelperText id="component-error-text">{getMessage(errors, name) || helperText}</FormHelperText>
                )}
            </FormControl>
        </>
    );
};

Checkbox.defaultProps = {
    labelPlacement: 'end',
    size: 'medium',
    indeterminate: false,
    disabled: false,
    required: false,
    edge: false,
};

export default Checkbox;
