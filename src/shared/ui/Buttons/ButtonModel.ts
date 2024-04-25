import React from 'react';

export interface ButtonModelProps extends React.PropsWithChildren {
    typeButton: string;
    type: 'submit' | 'button';
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: string;
}
