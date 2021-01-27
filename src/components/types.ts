import { SelectProps, OutlinedTextFieldProps, TextFieldProps } from '@material-ui/core';
import NumberFormat from 'react-number-format';

interface IMetaInfo {
    apiVersion: string;
    dataVersion: string;
    epr: string;
    resourceType: string;
}

interface IErrorList {
    type: string;
    code: string;
    httpstatuscode: string;
    stacktrace: string;
    visible: string;
}

interface IWarningList extends IErrorList {}

interface IGeneralResponseData<T> {
    wrappedData: T;
}

export interface IGeneralResponse<T> {
    metaInfo: IMetaInfo;
    data: IGeneralResponseData<T>;
    errorList: IErrorList[];
    warningList: IWarningList[];
}

export interface IData {
    data: any[];
    displayValue: string;
    displayField: string;
}

export interface IOptionsData {
    /**
     * Checks data view of the component
     */
    options: IData;
}

interface ICommonFieldProps {
    /**
     * Checks error text view of the component
     */
    errorText?: string;
    /**
     * Checks the read of the component
     */
    readOnly?: boolean;
    /**
     * Checks label view of the component
     */
    labelActive?: boolean;
    /**
     * Checks size of the component
     */
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    /**
     * Checks custom style class of the component
     */
    className?: string;
    /**
     * It works according to the changing value of the component.
     */
    watch?: (e: any) => void;
    /**
     * Checks default value of the component for watch property
     */
    watchDefaultValue?: string | number | null | boolean | undefined;
    /**
     * Checks small auxiliary text view below component
     */
    helperText?: React.ReactNode;
    /**
     * It is the method that works by controlling the moment the key is down.
     */
    onKeyDown?: any;
    /**
     * It is the method that works by controlling the moment the key is up.
     */
    onKeyUp?: any;
    /**
     * Checks additional information that can be added to the right of the component.
     */
    startAdornment?: React.ReactNode;
    /**
     * Checks additional information that can be added to the left of the component.
     */
    endAdornment?: React.ReactNode;
    /**
     * Checks name of the component. This is important for data flow.
     */
    name: string;
}

export interface ICheckboxProps
    extends Omit<
        ICommonFieldProps,
        'labelActive' | 'size' | 'startAdornment' | 'endAdornment' | 'onKeyUp' | 'onKeyDown' | 'readOnly'
    > {
    /**
     * Checks the identify value of the component
     */
    id?: string;
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks place of the component label
     */
    labelPlacement?: 'start' | 'end' | 'top' | 'bottom';
    /**
     * Checks size of the component
     */
    size?: 'small' | 'medium';
    /**
     * Checks label of the component
     */
    checkedIcon?: React.ReactNode;
    /**
     * Checks label of the component
     */
    unCheckedIcon?: React.ReactNode;
    /**
     * Checks indeterminate of the component
     */
    indeterminate?: boolean;
    /**
     * Checks indeterminate icon view of the component
     */
    indeterminateIcon?: React.ReactNode;
    /**
     * Checks disabled of the component
     */
    disabled?: boolean;
    /**
     * Checks required of the component
     */
    required?: boolean;
    /**
     * Checks default checked of the component
     */
    defaultChecked?: boolean;
    /**
     * Checks disable animation of the component
     */
    disableRipple?: boolean;
    /**
     * Checks disable focus animation of the component
     */
    disableFocusRipple?: boolean;
    /**
     * Checks the onChange event of the component
     */
    onChange?: () => void;
    /**
     * Checks tab index number of the component
     */
    tabIndex?: number;
    /**
     * If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape).
     */
    edge?: 'start' | 'end' | false;
}

export interface IRadioGroupProps
    extends Omit<ICommonFieldProps, 'readOnly' | 'size' | 'onKeyDown' | 'onKeyUp' | 'startAdornment' | 'endAdornment'> {
    /**
     * Checks the identify value of the component
     */
    id?: string;
    /**
     * Checks the value of the component
     */
    value?: any;
    /**
     * Checks default value of the component
     */
    defaultValue?: number | string | Array<string>;
    /**
     * Checks the children value of the component. It should be Radio component
     */
    children: React.ReactNode;
    /**
     * Checks the disabled of the component
     */
    disabled?: boolean;
    /**
     * Checks tab index number of the component
     */
    tabIndex?: number;
    /**
     * Checks the required of the component
     */
    required?: boolean;
    /**
     * Checks onChange of the component
     */
    onChange?: () => void;
}

export interface IRadioProps
    extends Omit<
        ICheckboxProps,
        | 'indeterminate'
        | 'indeterminateIcon'
        | 'defaultChecked'
        | 'disableFocusRipple'
        | 'name'
        | 'tabIndex'
        | 'errorText'
    > {
    /**
     * Checks the value of the component
     */
    value: any;
}

export interface ISelectFieldProps
    extends Omit<
            SelectProps,
            | 'variant'
            | 'size'
            | 'margin'
            | 'onKeyDown'
            | 'onFocus'
            | 'onKeyUp'
            | 'multiline'
            | 'name'
            | 'label'
            | 'displayEmpty'
        >,
        IOptionsData,
        ICommonFieldProps {
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks the style class of the component
     */
    className?: string;
    /**
     * Checks empty option view of the component
     */
    displayEmpty?: boolean;
    /**
     * Checks empty value text of the component
     */
    displayEmptyValue?: string;
}

export interface IMultipleFieldProps
    extends Omit<
            SelectProps,
            'variant' | 'size' | 'margin' | 'onKeyDown' | 'onFocus' | 'onKeyUp' | 'displayEmpty' | 'name'
        >,
        IOptionsData,
        ICommonFieldProps {
    /**
     * Checks what is selected within the component looks like a chip.
     */
    viewChip?: boolean;
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks the style class of the component
     */
    className?: string;
}

export interface ITextFieldProps
    extends Omit<
            OutlinedTextFieldProps,
            'variant' | 'size' | 'margin' | 'onKeyDown' | 'onKeyUp' | 'name' | 'multiline' | 'rows'
        >,
        ICommonFieldProps {
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks text format structure of the component
     */
    maskFormat?: any;
    /**
     * Checks maximum character length of the component
     */
    maxLength?: number;
    /**
     * Checks minimum character length of the component
     */
    minLength?: number;
    /**
     * Checks the style class of the component
     */
    className?: string;
    /**
     * Checks the placeholder of the component
     */
    placeholder?: string;
    /**
     * If `true`, a textarea element will be rendered.
     */
    multiline?: boolean;
    /**
     * Number of rows to display when multiline option is set to true.
     */
    rows?: number;
}

export interface INumberFormatProps {
    thousandSeparator?: boolean | ',' | '.' | ' ';
    decimalSeparator?: ',' | '.';
    decimalScale?: number;
    fixedDecimalScale?: boolean;
    allowNegative?: boolean;
    allowEmptyFormatting?: boolean;
    prefix?: string;
    suffix?: string;
    type?: 'text' | 'tel' | 'password';
    format?: string;
    removeFormatting?: (formattedValue: string) => string;
    mask?: string;
    displayType?: 'input' | 'text' | undefined;
    returnValue?: 'floatValue' | 'formattedValue' | 'value';
}

export interface INumberFieldProps
    extends Omit<
            OutlinedTextFieldProps,
            'variant' | 'size' | 'margin' | 'onKeyDown' | 'onKeyUp' | 'type' | 'multiline' | 'row' | 'rowMax' | 'name'
        >,
        ICommonFieldProps {
    /**
     * Checks mask format of the component
     */
    format?: INumberFormatProps;
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks the style class of the component
     */
    className?: string;
    /**
     * Checks the placeholder of the component
     */
    placeholder?: string;
}

export interface IMaskProps {
    guide?: boolean;
    mask: any[];
    showMask?: boolean;
    keepCharPositions?: boolean;
    placeholderChar?: 'space' | 'underscore' | undefined;
}

export interface IMaskFieldProps
    extends Omit<
            OutlinedTextFieldProps,
            'variant' | 'size' | 'margin' | 'onKeyDown' | 'onKeyUp' | 'type' | 'multiline' | 'row' | 'rowMax' | 'name'
        >,
        ICommonFieldProps {
    /**
     * Checks mask format of the component
     */
    format: IMaskProps;
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks the style class of the component
     */
    className?: string;
    /**
     * Checks the placeholder of the component
     */
    placeholder?: string;
}

export interface IAutocompleteFieldProps
    extends Omit<TextFieldProps, 'variant' | 'size' | 'margin' | 'onKeyDown' | 'onFocus' | 'onKeyUp' | 'type' | 'name'>,
        IOptionsData,
        ICommonFieldProps {
    /**
     * Checks the multiple select option of the component
     */
    multiple?: boolean;
    /**
     * Checks the free writing of the component for search
     */
    freeWriting?: boolean;
    /**
     * Checks the close case of the component after select operation
     */
    disableCloseOnSelect?: boolean;
    /**
     * Checks the select option group of the component
     */
    group?: boolean;
    /**
     * Checks the select option group path of the component
     */
    groupPath?: string;
    /**
     * Checks the open case of the component
     */
    open?: boolean;
    /**
     * Checks the event of the component after open
     */
    onOpen?: (e?: any) => void;
    /**
     * Checks the event of the component after close
     */
    onClose?: (e?: any) => void;
    /**
     * Checks the event of the component after input text change
     */
    onInputChange?: (e: any) => void;
    /**
     * Checks the no option text of the component
     */
    noOptionsDataText?: string;
    /**
     * Checks the loading text of the component
     */
    loadingText?: React.ReactNode;
    /**
     * Checks the close icon view of the component
     */
    closeIcon?: React.ReactNode;
    /**
     * Checks the popup icon view of the component
     */
    popupIcon?: React.ReactNode;
    /**
     * Checks label of the component
     */
    label?: React.ReactNode;
    /**
     * Checks small auxiliary text view below component
     */
    helperText?: React.ReactNode;
    /**
     * Checks the style class of the component
     */
    className?: string;
    /**
     * Checks the placeholder of the component
     */
    placeholder?: string;
}

export interface INumberFormatCustomProps extends INumberFormatProps {
    /**
     * Checks the reference of the component
     */
    inputRef: (instance: NumberFormat | null) => void;
    /**
     * Checks the onChange event of the component
     */
    onChange: (event: { target: { value: any } }) => void;
    /**
     * Checks the style class of the component
     */
    className?: string;
}
