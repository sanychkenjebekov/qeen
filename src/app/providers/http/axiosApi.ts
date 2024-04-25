import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { BASE_URL } from '@/app/constants/contants';

export const axiosApi = axios.create({
    baseURL: BASE_URL,
});

export const addInterceptor = (store: Store<RootState>) => {
    axiosApi.interceptors.request.use(config => {
        const token = store.getState().auth.user?.access;
        config.headers.set('Authorization', token ? 'Bearer ' + token : undefined);
        return config;
    });
};
