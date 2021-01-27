import MaskedInput from 'react-text-mask';
import {IMaskProps} from '../types';

interface TextMaskCustomProps extends IMaskProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

const MaskInput = (props: TextMaskCustomProps) => {
    const {inputRef, className, ...other}: any = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={props.mask}
            placeholderChar={props.placeholderChar && props.placeholderChar === 'underscore' ? '_' : '\u2000'}
            showMask={props.showMask && false}
            guide={props.guide || false}
            keepCharPositions={props.keepCharPositions || false}
            className={`${className}`}
        />
    );
};

export default MaskInput;
