/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ProductType } from '@/entities/Product/model/types/product.types';
import { SubCategory } from '../model/types/subCategory.types';

export const mapProductSubCategory = (products: ProductType[], subCategories: SubCategory[]) => {
    const subCategoriesMap = {};
    subCategories.forEach(subCategory => {
        //@ts-ignore
        subCategoriesMap[subCategory.id] = subCategory.title;
    });

    return products.map(product => ({
        ...product,
        //@ts-ignore
        subcategory: subCategoriesMap[product.subcategory],
    }));
};
