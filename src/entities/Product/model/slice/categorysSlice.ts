import { createSlice } from '@reduxjs/toolkit';
import { fetchCategorys } from '../services/fetchCategorys';
import { CategorysTypes } from '../types/categorys.types';

interface CategorysState {
    categorys: CategorysTypes[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CategorysState = {
    categorys: [],
    status: 'idle',
    error: null,
};

const categorysSlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCategorys.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(fetchCategorys.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.categorys = action.payload;
        });
        builder.addCase(fetchCategorys.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
        });
    },
});

export default categorysSlice.reducer;
