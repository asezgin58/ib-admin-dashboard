import { useEffect, useRef } from 'react';
import { Button as MuiButton, CircularProgress } from '@material-ui/core';
import { IButtonProps } from './type';

const Button = (props: IButtonProps) => {
    const {
        id,
        name,
        className,
        disabled,
        disableFocusRipple = false,
        fullWidth,
        href,
        component,
        startAdornment,
        endAdornment,
        text,
        centerRipple,
        type,
        onRef,
        loading,
        onClick,
        disableRipple = false,
        tabIndex = 0,
        outlined = false,
        color = 'default',
        size = 'large',
        iconButton,
    } = props;

    const button = useRef();

    useEffect(() => {
        onRef && onRef(button);
    });

    return (
        <MuiButton
            id={id}
            name={name}
            variant="outlined"
            disabled={disabled}
            disableFocusRipple={disableFocusRipple}
            disableRipple={disableRipple}
            href={href}
            fullWidth={fullWidth}
            centerRipple={centerRipple}
            type={type}
            className={`custom-outlined-button ${iconButton ? 'custom-icon-button' : ''} ${size} ${
                color || 'default'
            } ${outlined ? 'outlined' : ''} ${className || ''}`}
            onClick={(e: any) => onClick && onClick(e)}
            buttonRef={button}
            tabIndex={tabIndex}
            component={component}
        >
            {loading ? (
                <CircularProgress size={20} />
            ) : (
                <>
                    {startAdornment ? <span className={'start-adornment'}>{startAdornment}</span> : null}
                    <span className={'button-text'}>{text}</span>
                    {endAdornment ? <span className={'end-adornment'}>{endAdornment}</span> : null}
                </>
            )}
        </MuiButton>
    );
};

Button.defaultProps = {
    disableFocusRipple: false,
    disableRipple: false,
    tabIndex: 0,
    outlined: false,
    color: 'default',
    size: 'large',
};

export default Button;
