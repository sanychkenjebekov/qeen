import categorysReducer from '@/entities/Product/model/slice/categorysSlice';
import collectionReducer from '@/entities/Collection/model/slice/collectionSlice';
import productsReducer from '@/entities/Product/model/slice/productsSlice';
import productCategoriesReducer from '@/features/FilterProductByCategory/model/slice/ProductCategorySlice';
import sortProductsReducer from '@/features/SortProducts/model/slice/SortProductsSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';

import { categoriesAPI } from '@/features/Categories/ui/model/services/categoriesAPI';
import { productsAPI } from '@/features/Product/ui/model/services/productAPI';
import { subcategoriesAPI } from '@/features/SubCategories/ui/services/apiSubCategories';
import { usersReducer } from '@/pages/AdminPanelPages/AdminPanelUsers/model/slices/usersSlice';
import { authReducer } from '@/pages/AuthPage/model/slice/authSlice';
import { personalReducer } from '@/pages/MyRoomPage/model/slice/PersonalSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import { collectionAPI } from '../../../../features/Collections/ui/model/services/collectionAPI';
import { colorsAPI } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { sizesAPI } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import { characteristicsAPI } from '@/features/Characteristics/ui/model/services/characteristicsAPI';
import { ordersReducer } from '@/pages/AdminPanelPages/AdminPanelOrders/model/slice/OrdersSlice';

const authPersistConfig = {
    key: 'store:users',
    storage: storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    sortProducts: sortProductsReducer,
    productCategories: productCategoriesReducer,
    [subcategoriesAPI.reducerPath]: subcategoriesAPI.reducer,
    [characteristicsAPI.reducerPath]: characteristicsAPI.reducer,
    [colorsAPI.reducerPath]: colorsAPI.reducer,
    [sizesAPI.reducerPath]: sizesAPI.reducer,
    [categoriesAPI.reducerPath]: categoriesAPI.reducer,
    [productsAPI.reducerPath]: productsAPI.reducer,
    [collectionAPI.reducerPath]: collectionAPI.reducer,
    products: productsReducer,
    categorys: categorysReducer,
    collection: collectionReducer,
    personal: personalReducer,
    orders: ordersReducer,
    users: usersReducer,
    auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
            },
        }).concat(
            subcategoriesAPI.middleware,
            categoriesAPI.middleware,
            productsAPI.middleware,
            collectionAPI.middleware,
            colorsAPI.middleware,
            sizesAPI.middleware,
            characteristicsAPI.middleware,
        ),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
