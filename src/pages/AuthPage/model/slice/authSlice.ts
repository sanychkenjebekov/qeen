import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginError, User } from '@/pages/AuthPage/model/types/types';
import { checkCode, login, register } from '@/pages/AuthPage/api/authThunk';
import { RootState } from '@/app/providers/StoreProvider/config/store';

interface AuthState {
    user: User | null;
    registerLoading: boolean;
    loginLoading: boolean;
    loginError: LoginError | null;
}

const initialState: AuthState = {
    user: null,
    registerLoading: false,
    loginLoading: false,
    loginError: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutState: state => {
            state.user = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(register.pending, state => {
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, state => {
            state.registerLoading = false;
        });
        builder.addCase(register.rejected, state => {
            state.registerLoading = false;
        });
        builder.addCase(checkCode.pending, state => {
            state.registerLoading = true;
        });
        builder.addCase(checkCode.fulfilled, (state, { payload: data }: PayloadAction<User>) => {
            state.registerLoading = false;
            state.user = data;
        });
        builder.addCase(checkCode.rejected, state => {
            state.registerLoading = false;
        });
        builder.addCase(login.pending, state => {
            state.loginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload: data }: PayloadAction<User>) => {
            state.loginLoading = false;
            state.user = data;
        });
        builder.addCase(login.rejected, (state, { payload: error }) => {
            state.loginLoading = false;
            state.loginError = error || null;
        });
    },
});

export const authReducer = authSlice.reducer;
export const { logoutState } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectLoginLoading = (state: RootState) => state.auth.loginLoading;
export const selectLoginError = (state: RootState) => state.auth.loginError;
