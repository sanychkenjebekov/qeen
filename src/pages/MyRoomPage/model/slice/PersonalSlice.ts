import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getFavourites,
    getOrders,
    getSingleOrder,
    getUserInfo,
} from '@/pages/MyRoomPage/api/personalThunk';
import { Favourites, OrderResponse, PersonalUser } from '@/pages/MyRoomPage/model/types/types';
import { RootState } from '@/app/providers/StoreProvider/config/store';

interface PersonalState {
    personalUser: PersonalUser | null;
    orders: OrderResponse[];
    order: OrderResponse | null;
    favourites: Favourites[];
    favouritesLoading: boolean;
    personalUserLoading: boolean;
    ordersLoading: boolean;
}

const initialState: PersonalState = {
    personalUser: null,
    favourites: [],
    orders: [],
    order: null,
    favouritesLoading: false,
    personalUserLoading: false,
    ordersLoading: false,
};

const personalSlice = createSlice({
    name: 'personal',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, state => {
            state.personalUserLoading = true;
        });
        builder.addCase(
            getUserInfo.fulfilled,
            (state, { payload: personalUser }: PayloadAction<PersonalUser>) => {
                state.personalUserLoading = false;
                state.personalUser = personalUser;
            },
        );
        builder.addCase(getUserInfo.rejected, state => {
            state.personalUserLoading = false;
        });
        builder.addCase(getFavourites.pending, state => {
            state.favouritesLoading = true;
        });
        builder.addCase(
            getFavourites.fulfilled,
            (state, { payload: favourites }: PayloadAction<Favourites[]>) => {
                state.favouritesLoading = false;
                state.favourites = favourites;
            },
        );
        builder.addCase(getFavourites.rejected, state => {
            state.favouritesLoading = false;
        });
        builder.addCase(getOrders.pending, state => {
            state.ordersLoading = true;
        });
        builder.addCase(
            getOrders.fulfilled,
            (state, { payload: orders }: PayloadAction<OrderResponse[]>) => {
                state.ordersLoading = false;
                state.orders = orders;
            },
        );
        builder.addCase(getOrders.rejected, state => {
            state.ordersLoading = false;
        });
        builder.addCase(getSingleOrder.pending, state => {
            state.ordersLoading = true;
        });
        builder.addCase(
            getSingleOrder.fulfilled,
            (state, { payload: order }: PayloadAction<OrderResponse>) => {
                state.ordersLoading = false;
                state.order = order;
            },
        );
        builder.addCase(getSingleOrder.rejected, state => {
            state.ordersLoading = false;
        });
    },
});

export const personalReducer = personalSlice.reducer;
export const selectPersonalUser = (state: RootState) => state.personal.personalUser;
export const selectPersonalUserLoading = (state: RootState) => state.personal.personalUserLoading;
export const selectFavourites = (state: RootState) => state.personal.favourites;
export const selectOrders = (state: RootState) => state.personal.orders;
export const selectOrdersLoading = (state: RootState) => state.personal.ordersLoading;
export const selectOrder = (state: RootState) => state.personal.order;
