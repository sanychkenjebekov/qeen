import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { User } from '@/pages/AdminPanelPages/AdminPanelUsers/model/types/types';
import { ListResponse } from '@/app/types/types';

export const getUsers = createAsyncThunk<User[]>('admin/getUsers', async () => {
    const response = await axiosApi.get<ListResponse<User>>('/users/list/user/');
    return response.data.results;
});

export const deleteUser = createAsyncThunk<void, number>('admin/deleteUser', async id => {
    await axiosApi.delete(`/users/delete/user/${id}/`);
});
