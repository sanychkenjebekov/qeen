import { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectCategories = (state: RootState) => state.productCategories.selectedCategory;
