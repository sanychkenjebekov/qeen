import React, { memo } from 'react';
import { ProductItem } from '../..';
import { ProductType } from '../../model/types/product.types';

interface ProductListProps {
    currentProducts: ProductType[] | undefined;
}

export const ProductList: React.FC<ProductListProps> = memo(props => {
    const { currentProducts } = props;
    
    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24 justify-items-center">
                {currentProducts?.map(product => (
                    <ProductItem product={product} key={product.id} uniqueKey={product.id} />
                ))}
            </ul>
        </>
    );
});
