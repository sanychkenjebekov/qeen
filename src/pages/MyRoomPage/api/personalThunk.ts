import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/app/providers/http/axiosApi';
import {
    Favourites,
    OrderResponse,
    PersonalUser,
    PersonalUserMutation,
} from '@/pages/MyRoomPage/model/types/types';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { ListResponse } from '@/app/types/types';

export const getUserInfo = createAsyncThunk<PersonalUser, undefined>('personal/user', async () => {
    const response = await axiosApi.get<PersonalUser>('/account/user/info/');
    return response.data;
});

export const changePersonalUser = createAsyncThunk<PersonalUser, PersonalUserMutation>(
    'personal/updateUser',
    async user => {
        const response = await axiosApi.patch(`/account/user/update/`, user);
        return response.data;
    },
);

export const createFavourite = createAsyncThunk<void, number | undefined, { state: RootState }>(
    'personal/favourites',
    async (product, { getState }) => {
        const user = getState().auth.user?.user_id;
        await axiosApi.post('/favorites/create/favorite/', { user, product });
    },
);

export const getFavourites = createAsyncThunk<Favourites[], undefined>(
    'personal/getFavourites',
    async () => {
        const response = await axiosApi.get<ListResponse<Favourites>>('/favorites/list/favorite/');
        return response.data.results;
    },
);

export const getOrders = createAsyncThunk<OrderResponse[]>('orders/getAll', async () => {
    const response = await axiosApi.get<ListResponse<OrderResponse>>('/account/history/by/user/');
    return response.data.results;
});

export const getSingleOrder = createAsyncThunk<OrderResponse, number>(
    'orders/getSingle',
    async id => {
        const response = await axiosApi.get<OrderResponse>(`/account/history/change/${id}/`);
        return response.data;
    },
);

export const deleteFavourite = createAsyncThunk<void, number>(
    'personal/deleteFavourite',
    async id => {
        await axiosApi.delete(`/favorites/delete/favorite/${id}`);
    },
);
