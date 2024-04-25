import { RootState } from '@/app/providers/StoreProvider/config/store';

export const productsSelector = (state: RootState) => state.products.products;
