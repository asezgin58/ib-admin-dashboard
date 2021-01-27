import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Select,
    MenuItem,
    FormControl,
    FormHelperText,
    InputLabel,
    Checkbox,
    ListItemText,
    Chip,
} from '@material-ui/core';
import { Controller, useFormContext } from 'react-hook-form';
import { IMultipleFieldProps } from '../types';
import { getMessage } from '../../_common/_helpers';

const MultiSelect = (props: IMultipleFieldProps) => {
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
        watch,
        watchDefaultValue,
        hidden = false,
        tabIndex = 0,
        viewChip = false,
        autoFocus = false,
        options,
        ...rest
    } = props;

    const { data, displayValue, displayField } = options;
    const { control, errors, setError, watch: watchFunc } = useFormContext();
    const watchValue = watchDefaultValue ? watchFunc(name, watchDefaultValue) : watchFunc(name);

    const renderItems = () => {
        if (data && data.length) {
            return data.map((item: any, i: number) => {
                return (
                    <MenuItem key={`single_select_${i}`} value={item[displayValue]} disableGutters dense>
                        <Checkbox
                            color="default"
                            disableRipple
                            checked={watchValue.indexOf(item[displayValue]) > -1}
                            className={`custom-multi-select-item-checkbox`}
                        />
                        <ListItemText primary={item[displayField]} className={`custom-multi-select-item-text`} />
                    </MenuItem>
                );
            });
        }

        return null;
    };

    const getMultipleCustomRender = (
        selected: any[],
        data: any[],
        displayValue: string,
        displayField: string,
        viewChip = false,
    ) => {
        const showStr: any[] = [];

        data &&
            data.length &&
            selected &&
            selected.length &&
            selected.forEach((a: any) => {
                const x: any = data.filter((item: any) => item[displayValue] === a)[0];
                if (x) {
                    showStr.push(x![displayField]);
                }
            });

        if (viewChip) {
            return (
                showStr.length && (showStr as string[])!.map((value: any, i: number) => <Chip key={i} label={value} />)
            );
        }

        return showStr.length ? (showStr as string[])!.join(', ') : selected;
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
                    {props.label}
                </InputLabel>
                <Controller
                    as={
                        <Select
                            label={props.label}
                            readOnly={readOnly}
                            autoFocus={autoFocus}
                            multiple={true}
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
                            renderValue={(selected: any) => {
                                return getMultipleCustomRender(selected, data, displayValue, displayField, viewChip);
                            }}
                            {...rest}
                        >
                            {renderItems()}
                        </Select>
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

MultiSelect.defaultProps = {
    size: 'large',
    viewChip: false,
};

export default MultiSelect;
