import { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectSort = (state: RootState) => state.sortProducts.sort;
