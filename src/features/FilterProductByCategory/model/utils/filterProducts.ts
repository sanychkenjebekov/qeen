/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';
import { ProductType } from '@/entities/Product/model/types/product.types';

export const filterProducts = (products: ProductType[], filters: CategorysTypes[]) => {
    if (filters.length === 0) {
        return products;
    }
    const filterSet = new Set(filters);
    return products.filter(product => {
        return (
            //@ts-ignore
            filterSet.has(product.subcategory) ||
            //@ts-ignore
            filterSet.has(product.color?.map(colorType => colorType.colors)?.join()) ||
            //@ts-ignore
            filterSet.has(product.size?.map(sizeType => sizeType.sizes).join())
        );
    });
};

export const clearFilter = (selectedFilter: CategorysTypes[], item: string) => {
    //@ts-ignore
    return selectedFilter.filter(filter => filter !== item);
};

export const selectFilter = (selectedFilter: CategorysTypes[], filterTypes: string[]) => {
    const newSelectedFilters = [...selectedFilter];

    filterTypes.forEach(filterType => {
        //@ts-ignore
        if (!newSelectedFilters.includes(filterType)) {
            //@ts-ignore
            newSelectedFilters.push(filterType);
        }
    });
    return newSelectedFilters;
};
