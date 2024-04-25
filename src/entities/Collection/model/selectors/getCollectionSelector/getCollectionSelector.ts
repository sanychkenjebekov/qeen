import { RootState } from '@/app/providers/StoreProvider/config/store';

export const collectionSelector = (state: RootState) => state.products.products;
