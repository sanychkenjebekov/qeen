import React, { ChangeEvent, memo, useMemo } from 'react';
import { sortProductsOptions } from '../model/constants/sort.constants';
import { setSort } from '../model/slice/SortProductsSlice';
import { useAppDispatch } from '@/app/providers/StoreProvider/config/hooks';

interface SortProductsProps {
    sort: string;
}

export const SortProducts: React.FC<SortProductsProps> = memo(props => {
    const { sort } = props;
    const dispatch = useAppDispatch();
    const onChangeSort = useMemo(
        () => (e: ChangeEvent<HTMLSelectElement>) => {
            dispatch(setSort(e.target.value));
        },
        [],
    );
    return (
        <div className="bg-secondary rounded-lg">
            <label htmlFor="sortSelect" className="sr-only"></label>
            <select
                id="sortSelect"
                onChange={onChangeSort}
                className="m-4 bg-transparent outline-none cursor-pointer"
                defaultValue={sort}
            >
                {sortProductsOptions.map(sortOption => (
                    <option
                        value={sortOption.value}
                        className="cursor-pointer"
                        key={sortOption.value}
                    >
                        {sortOption.label}
                    </option>
                ))}
            </select>
        </div>
    );
});
