import React, { memo } from 'react';
import { CaretRight } from '@phosphor-icons/react';

interface MobileFilterListProps {
    categoryOpen: boolean;
    handleOpenCategory: (value: string) => void;
}

export const MobileFilterList: React.FC<MobileFilterListProps> = memo(props => {
    const { categoryOpen, handleOpenCategory } = props;
    const filters = [
        {
            id: 1,
            name: 'Категории',
        },
        {
            id: 2,
            name: 'Цвет',
        },
        {
            id: 3,
            name: 'Размер',
        },
    ];
    return (
        <ul className={`${categoryOpen ? 'hidden' : 'block'}`}>
            {filters.map(filter => (
                <li key={filter.id}>
                    <p
                        onClick={() => handleOpenCategory(filter.name)}
                        className="flexBetween cursor-pointer gap-8"
                    >
                        <span className="text-xl font-semibold">{filter.name}</span>
                        <CaretRight size={24} />
                    </p>
                    <hr className="my-5 text-primary" />
                </li>
            ))}
        </ul>
    );
});
