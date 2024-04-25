interface Sizes {
    sizes: string;
}
interface Colors {
    colors: string;
}

export interface ProductsType {
    id?: string;
    subcategory: number;
    title: string;
    description: string;
    brand: string;
    characteristics: string;
    price: string;
    images1: string;
    color: Colors[];
    size: Sizes[];
    discount: string;
}

export interface ProductsTypes {
    id: string;
    name: string;
    image: string;
    category?: string;
    price: number;
    size: string;
    color: string;
    is_favorite: boolean;
}
