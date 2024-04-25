import { ColorTypes, SizesTypes } from '@/features/Colors&Sizes/ui/model/types/types';

export interface ProductType {
    id?: number;
    subcategory: number | string;
    title: string;
    description?: string;
    brand?: string;
    characteristics?: string;
    price: string;
    images1: string;
    color?: ColorTypes[];
    size?: SizesTypes[];
    discount?: string;
}

export interface ProductsApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ProductType[];
}

export interface ProductsTypes {
    id: number;
    name: string;
    title?: string;
    image: string;
    image1?: string;
    images1?: string;
    category?: string;
    price: number;
    size: string;
    color: string;
    is_favorite: boolean;
}
