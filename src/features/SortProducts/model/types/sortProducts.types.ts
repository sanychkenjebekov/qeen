export interface SortProductsState {
    sort: string;
    sortedProducts: SortedProducts[];
}

export interface SortedProducts {
    id: string;
    name: string;
    image: string;
    clothing?: string;
    price: number;
    size: string;
    color: string;
}
