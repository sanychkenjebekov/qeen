import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUsers } from '@/pages/AdminPanelPages/AdminPanelUsers/api/adminUserThunk';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { User } from '@/pages/AdminPanelPages/AdminPanelUsers/model/types/types';

interface UsersState {
    users: User[];
    getUsersLoading: boolean;
}

const initialState: UsersState = {
    users: [],
    getUsersLoading: false,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUsers.pending, state => {
            state.getUsersLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, { payload: users }: PayloadAction<User[]>) => {
            state.getUsersLoading = false;
            state.users = users;
        });
        builder.addCase(getUsers.rejected, state => {
            state.getUsersLoading = false;
        });
    },
});

export const usersReducer = userSlice.reducer;
export const selectUsers = (state: RootState) => state.users.users;
export const selectGetUsersLoading = (state: RootState) => state.users.getUsersLoading;
