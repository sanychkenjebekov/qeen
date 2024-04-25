import { RootState } from '@/app/providers/StoreProvider/config/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CollectionTypes } from '../types/collection.types';

export const fetchCollection = createAsyncThunk<CollectionTypes[], void, { state: RootState }>(
    'collection/fetchCollection',
    async () => {
        const response = await axios.get<CollectionTypes[]>(
            `http://3.123.17.71/collection/list/all/category/`,
        );
        const data = await response.data;
        return data;
    },
);
