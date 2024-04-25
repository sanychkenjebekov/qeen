interface Color {
    id?: string;
    colors: string;
}

interface Sizes {
    id?: string;
    sizes: string;
}

export interface ProductsTypes {
    id?: string;
    subcategory: number;
    title: string;
    description: string;
    brand: string;
    characteristics: string;
    price: number;
    images1: string;
    color: Color[];
    size: Sizes[];
    discount?: number;
}
