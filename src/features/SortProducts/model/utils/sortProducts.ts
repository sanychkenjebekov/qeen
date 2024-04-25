/* eslint-disable @typescript-eslint/no-explicit-any */
export const sortProducts = (products: any, sort: string) => {
    const sortedProducts = [...products];

    if (sort === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    return sortedProducts;
};
