import { X } from '@phosphor-icons/react';
import { FC } from 'react';

interface SelectedFilterProps {
    selectedFilter: string[];
    clearFilterType: (arg: string) => void;
}

export const SelectedFilter: FC<SelectedFilterProps> = ({ selectedFilter, clearFilterType }) => {
    return (
        <div className="flex items-center flex-wrap">
            {selectedFilter.map(el => (
                <div
                    key={el}
                    className="py-2 px-4 bg-secondary text-primary opacity-70 rounded-3xl text-lg flexCenter gap-3 w-fit mb-10"
                >
                    {el}
                    <X onClick={() => clearFilterType(el)} size={16} className="cursor-pointer" />
                </div>
            ))}
        </div>
    );
};
