import { createAsyncThunk } from '@reduxjs/toolkit';
import { OrderData } from '@/pages/Basket/types/Order';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { RootState } from '@/app/providers/StoreProvider/config/store';

export const createOrder = createAsyncThunk<void, OrderData, { state: RootState }>(
    'orders/create',
    async (data, { getState }) => {
        const userId = getState().auth.user?.user_id;
        await axiosApi.post('/account/history/create/', {
            ...data,
            user: userId,
            location: data.deliver.location,
            types: data.deliver.type,
            payment_type: data.paymentType,
        });
    },
);
