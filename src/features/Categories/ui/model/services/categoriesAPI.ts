import { BASE_URL } from '@/app/constants/contants';
import { CategoriesApiResponse } from '@/entities/Product/model/types/categorys.types';
import { access_token } from '@/shared/config/localstorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const categoriesAPI = createApi({
    reducerPath: 'categoriesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/categorys`,
    }),
    tagTypes: ['Categories'],

    endpoints: builder => ({
        getCategories: builder.query<CategoriesApiResponse, void>({
            query: () => ({
                url: 'list/all/category',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Categories'],
        }),
        getSingleCategory: builder.query<CategoriesApiResponse, number>({
            query: id => ({
                url: `list/one/category/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Categories'],
        }),

        createCategory: builder.mutation<CategoriesApiResponse, Partial<CategoriesApiResponse>>({
            query: category => ({
                url: `create/category/`,
                method: 'POST',
                body: category,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: id => ({
                url: `rud/category/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Categories'],
        }),
        updateCategory: builder.mutation({
            query: ({ id, updatedCategory }) => ({
                url: `rud/category/${id}/`,
                method: 'PUT',
                body: updatedCategory,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Categories'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetSingleCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoriesAPI;
