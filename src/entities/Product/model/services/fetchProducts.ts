import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsTypes } from '../types/product.types';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import axios from 'axios';
import { BASE_URL } from '@/app/constants/contants';

export const fetchProducts = createAsyncThunk<ProductsTypes[], void, { state: RootState }>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(`${BASE_URL}/products/list/all/product/
`);
        return response.data.results;
    },
);
