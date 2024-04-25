import { IBasket } from '@/pages/Basket/types/IBasket';

export interface Favourites {
    id: number;
    product: number;
    product_image: string;
}

export interface OrderResponse {
    id: number;
    products: IBasket[];
    price: number;
    types: string;
    location: string;
    delivery_date: string;
    status: string;
}

export interface PersonalUser {
    id: number;
    email: string;
    username: string;
    password?: string;
    phone_number: string;
}

export type PersonalUserMutation = Omit<PersonalUser, 'id'>;
