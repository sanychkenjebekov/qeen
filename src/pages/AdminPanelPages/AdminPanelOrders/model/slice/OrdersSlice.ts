import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '@/pages/AdminPanelPages/AdminPanelOrders/api/OrdersThunk';
import { RootState } from '@/app/providers/StoreProvider/config/store';
import { OrdersResponseAdmin } from '@/pages/AdminPanelPages/AdminPanelOrders/model/types/types';

interface OrdersState {
    orders: OrdersResponseAdmin[];
    orderLoading: boolean;
}

const initialState: OrdersState = {
    orders: [],
    orderLoading: false,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOrders.pending, state => {
            state.orderLoading = true;
        });
        builder.addCase(getOrders.fulfilled, (state, { payload: orders }) => {
            state.orderLoading = false;
            state.orders = orders;
        });
        builder.addCase(getOrders.rejected, state => {
            state.orderLoading = false;
        });
    },
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrdersAdmin = (state: RootState) => state.orders.orders;
export const selectOrdersAdminLoading = (state: RootState) => state.orders.orderLoading;
