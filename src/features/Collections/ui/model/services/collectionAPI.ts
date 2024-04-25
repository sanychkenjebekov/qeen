import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { CollectionTypes } from '@/entities/Collection/model/types/collection.types';
import { BASE_URL } from '@/app/constants/contants';

export const collectionAPI = createApi({
    reducerPath: 'collectionAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/collection`,
    }),
    tagTypes: ['Collection'],

    endpoints: builder => ({
        getCollection: builder.query<CollectionTypes, void>({
            query: () => ({
                url: 'list/collection',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Collection'],
        }),
        getSingleCategory: builder.query<CollectionTypes[], number>({
            query: id => ({
                url: `list/collection/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Collection'],
        }),

        createCategory: builder.mutation<CollectionTypes, Partial<CollectionTypes>>({
            query: category => ({
                url: `create/collection/`,
                method: 'POST',
                body: category,
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Collection'],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: id => ({
                url: `rud/collection/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Collection'],
        }),
        updateCategory: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            query: (id: number, updatedCategory: CategoryTypes) => ({
                url: `rud/collection/${id}/`,
                method: 'PUT',
                body: updatedCategory,
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Collection'],
        }),
    }),
});

export const {
    useGetCollectionQuery,
    useGetSingleCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = collectionAPI;
