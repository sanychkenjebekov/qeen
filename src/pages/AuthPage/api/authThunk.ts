import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginError, User } from '@/pages/AuthPage/model/types/types';
import { LoginMutation } from '@/pages/AuthPage/model/types/LoginModel';
import { axiosApi } from '@/app/providers/http/axiosApi';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { logoutState } from '@/pages/AuthPage/model/slice/authSlice';
import { RegisterMutation } from '@/pages/AuthPage/model/types/RegisterModel';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<void, RegisterMutation>('auth/register', async user => {
    const zeroInNumber = user.number.includes('0');
    const codeInNumber = user.number.includes('+');
    let phone_number = '';
    if (zeroInNumber) {
        phone_number = '+996' + user.number.slice(1);
    }
    if (codeInNumber) {
        phone_number = '+996' + user.number.slice(4);
    }
    await axiosApi.post('/users/register/user/', {
        ...user,
        username: user.name,
        phone_number,
        password2: user.password,
    });
});

export const checkCode = createAsyncThunk<User, string>('auth/checkCode', async code => {
    const response = await axiosApi.patch('/users/verify/register-code/', { code });
    return response.data;
});

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: LoginError }>(
    'auth/login',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post<User>('/users/login/user/', user);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 401) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
    'auth/logout',
    async (_, { getState, dispatch }) => {
        const token = getState().auth.user?.refresh;
        await axiosApi.post('/account/logout/user/', {
            refresh_token: token,
        });
        dispatch(logoutState());
    },
);
