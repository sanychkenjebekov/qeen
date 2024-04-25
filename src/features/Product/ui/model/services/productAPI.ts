import { BASE_URL } from '@/app/constants/contants';
import { ProductsApiResponse } from '@/entities/Product/model/types/product.types';
import { access_token } from '@/shared/config/localstorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/products/`,
    }),
    tagTypes: ['Products'],

    endpoints: builder => ({
        getProducts: builder.query<ProductsApiResponse, number>({
            query: page => ({
                url: `list/all/product/?page=${page}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Products'],
        }),
        getSingleProduct: builder.query<ProductsApiResponse, number>({
            query: id => ({
                url: `list/one/product/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Products'],
        }),

        createProduct: builder.mutation<ProductsApiResponse, Partial<ProductsApiResponse>>({
            query: product => ({
                url: `create/product/`,
                method: 'POST',
                body: product,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProduct: builder.mutation<void, number | undefined>({
            query: id => ({
                url: `delete/product/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            query: ({ id, updatedProduct }) => ({
                url: `update/product/${id}/`,
                method: 'PUT',
                body: updatedProduct,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = productsAPI;
