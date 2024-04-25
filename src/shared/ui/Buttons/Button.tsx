import React from 'react';
import { ButtonModelProps } from './ButtonModel';

const Button: React.FC<ButtonModelProps> = ({
    children,
    type,
    style,
    typeButton,
    onClick,
    disabled,
}) => {
    return (
        <button
            type={type || 'button'}
            className={`py-[14px] px-[78px] rounded-[10px] leading-6
            ${typeButton === 'primary' ? 'text-white bg-primary hover:bg-hoverPrimary focus:bg-focusPrimary' : ''} 
            ${typeButton === 'error' ? `bg-red text-white` : ''} 
            ${typeButton === 'disabled' ? 'text-disabledText bg-disabledBackground' : ''}
            ${typeButton === 'contained' ? 'border-[2px] border-primary text-primary bg-tertiary' : ''}
            ${style || ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
