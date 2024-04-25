export interface IProductDetail {
    id: number;
    subcategory: number;
    title: string;
    price: number;
    description: string;
    brand: string;
    characteristics: {
        title: string;
        value: string;
    }[];
    is_any: boolean;
    images1: string | null;
    images2: string | null;
    images3: string | null;
    color: { id: number; colors: string }[];
    size: { id: number; sizes: string }[];
    discount: number | null;
    is_favorite: boolean;
}
