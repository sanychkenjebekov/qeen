import { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectSortedProducts = (state: RootState) => state.sortProducts.sortedProducts;
