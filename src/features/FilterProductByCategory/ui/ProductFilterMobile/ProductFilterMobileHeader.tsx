import { ArrowLeft, X } from '@phosphor-icons/react';
import React, { memo } from 'react';

interface ProductFilterMobileHeaderProps {
    setCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categoryOpen: boolean;
    filterName: string;
    toggleMenu: () => void;
}

export const ProductFilterMobileHeader: React.FC<ProductFilterMobileHeaderProps> = memo(props => {
    const { setCategoryOpen, categoryOpen, filterName, toggleMenu } = props;
    return (
        <div className="flexCenter font-semibold my-8">
            <span
                onClick={() => setCategoryOpen(prev => !prev)}
                className={`${categoryOpen ? 'block' : 'hidden'}`}
            >
                <ArrowLeft size={24} />
            </span>
            <span className="flex-1 text-2xl text-center">{filterName}</span>
            <button onClick={toggleMenu}>
                <X size={24} />
            </button>
        </div>
    );
});
