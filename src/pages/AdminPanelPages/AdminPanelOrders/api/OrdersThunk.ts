import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { ListResponse } from '@/app/types/types';
import { OrdersResponseAdmin } from '@/pages/AdminPanelPages/AdminPanelOrders/model/types/types';

export const getOrders = createAsyncThunk<OrdersResponseAdmin[]>('orders/getAll', async () => {
    const response =
        await axiosApi.get<ListResponse<OrdersResponseAdmin>>('/account/history/list/');
    return response.data.results;
});

interface ChangeData {
    id: number;
    status: string;
}

export const changeStatusOrder = createAsyncThunk<void, ChangeData>(
    'orders/status',
    async ({ id, status }) => {
        await axiosApi.patch(`/account/history/change/${id}/`, { status });
    },
);
