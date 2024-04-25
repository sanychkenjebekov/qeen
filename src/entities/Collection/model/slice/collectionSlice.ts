import { createSlice } from '@reduxjs/toolkit';
import { fetchCollection } from '../services/fetchCollection';
import { CollectionTypes } from '../types/collection.types';

interface CollectionState {
    collection: CollectionTypes[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CollectionState = {
    collection: [],
    status: 'idle',
    error: null,
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCollection.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(fetchCollection.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.collection = action.payload;
        });
        builder.addCase(fetchCollection.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message ?? 'Unknown error';
        });
    },
});

export default collectionSlice.reducer;
