import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../services/fetchCategories';
import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';

interface Category {
    selectedCategory: CategorysTypes[];
    categories: CategorysTypes[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: Category = {
    selectedCategory: [],
    categories: [],
    status: 'idle',
    error: null,
};

export const productCategoriesSlice = createSlice({
    name: 'productCategory',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<CategorysTypes[]>) => {
            state.selectedCategory = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, state => {
                state.status = 'failed';
                state.error = 'Error';
            });
    },
});

export const { setSelectedCategory } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
