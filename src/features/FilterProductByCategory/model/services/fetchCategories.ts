import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';

export const fetchCategories = createAsyncThunk<CategorysTypes[], void, { state: RootState }>(
    'categories/fetchCategories',
    async () => {
        const response = await axiosApi.get(`categorys/list/all/category/`);
        const data = await response.data;
        return data;
    },
);

export const fetchCategoryById = createAsyncThunk<CategorysTypes[], number, { state: RootState }>(
    'category/fetchCategoryById',
    async (id: number) => {
        const response = await axiosApi.get(`/categorys/rud/category/${id}/`);
        const data = await response.data;
        return data;
    },
);
