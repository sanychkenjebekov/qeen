import React from 'react';

export interface InputFieldModelProps {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    name?: string;
    typeField: string;
    placeholder?: string;
    style?: string;
    disabled?: boolean;
    required?: boolean;
}
