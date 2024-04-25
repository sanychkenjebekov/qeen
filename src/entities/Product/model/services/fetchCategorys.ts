import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { CategorysTypes } from '../types/categorys.types';

export const fetchCategorys = createAsyncThunk<CategorysTypes[], void, { state: RootState }>(
    'categorys/fetchCategorys',
    async () => {
        const response = await axios.get<CategorysTypes[]>(
            `http://3.123.17.71/categorys/list/all/category/`,
        );
        const data = await response.data;
        return data;
    },
);
