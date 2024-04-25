import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortProductsState, SortedProducts } from '../types/sortProducts.types';

const initialState: SortProductsState = {
    sort: '',
    sortedProducts: [],
};

export const sortProductsSlice = createSlice({
    name: 'sortProducts',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        setSortedProducts: (state, action: PayloadAction<SortedProducts[]>) => {
            state.sortedProducts = action.payload;
        },
    },
});

export const { setSort, setSortedProducts } = sortProductsSlice.actions;

export default sortProductsSlice.reducer;
