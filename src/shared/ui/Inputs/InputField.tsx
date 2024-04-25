import React, { useState } from 'react';
import { Eye, EyeSlash, WarningCircle } from '@phosphor-icons/react';
import { InputFieldModelProps } from './InputFieldModel';

const InputField: React.FC<InputFieldModelProps> = ({
    type,
    typeField,
    value,
    onChange,
    placeholder,
    style,
    name,
    disabled,
    required,
}) => {
    const [showValue, setShowValue] = useState(false);

    return (
        <div
            className={`border flex box-border justify-between items-center rounded-[10px] bg-white  px-[16px] focus:border-primary h-[52px]
            ${typeField === 'error' ? 'border-red' : 'border-thirsty'}
            ${style || ''}
            `}
        >
            <input
                placeholder={placeholder ? placeholder : 'Something text...'}
                value={value}
                onChange={onChange}
                name={name}
                type={showValue ? 'text' : type}
                disabled={disabled}
                className="w-full outline-0"
                required={required}
            />
            {typeField === 'error' && type === 'text' ? (
                <WarningCircle className="text-red" size={25} />
            ) : null}
            {type === 'password' || (type === 'password' && typeField === 'error') ? (
                <>
                    {showValue ? (
                        <EyeSlash onClick={() => setShowValue(!showValue)} size={25} />
                    ) : (
                        <Eye onClick={() => setShowValue(!showValue)} size={25} />
                    )}
                </>
            ) : null}
        </div>
    );
};

export default InputField;
