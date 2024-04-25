import { RootState } from '@/app/providers/StoreProvider/config/store';

export const selectCategory = (state: RootState) => state.productCategories.selectedCategory;
