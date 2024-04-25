import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsTypes } from '../types/product.types';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import axios from 'axios';

export const fetchProducts = createAsyncThunk<ProductsTypes[], void, { state: RootState }>(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(`https://65c68c3be5b94dfca2e1a6be.mockapi.io/queen`);
        return response.data;
    },
);
