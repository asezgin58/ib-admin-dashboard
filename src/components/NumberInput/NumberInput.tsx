import React from 'react';
import {omit} from 'lodash';
import NumberFormat from 'react-number-format';
import {INumberFormatCustomProps} from '../types';

const NumberInput= (props: INumberFormatCustomProps) => {
    const {inputRef, className, onChange, ...inputFormatOther} = props;

    if (props.returnValue === 'formattedValue' && (props.prefix || props.suffix)) {
        console.warn(
            'If you use suffix or prefix, for returnValue props, you must choose one of the following;' +
            '\n\n"floatValue (integer value)", "value (string value)"' +
            '\n\notherwise you will enter an infinite loop',
        );
    }

    return (
        <NumberFormat
            getInputRef={inputRef}
            className={`${className} seker-form-number-input-format`}
            {...omit(inputFormatOther, 'returnValue')}
            isAllowed={(values) => {
                return !(props.returnValue === 'floatValue' && values.value.length === 16);
            }}
            isNumericString={true}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: props.returnValue ? values[props.returnValue] : values.value,
                    },
                });
            }}
        />
    );
};

export default NumberInput;