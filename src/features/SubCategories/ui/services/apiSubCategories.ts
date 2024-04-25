import { BASE_URL } from '@/app/constants/contants';
import { SubCategoryApiResponse } from '@/features/Categories/ui/model/types/subCategory.types';
import { access_token } from '@/shared/config/localstorage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subcategoriesAPI = createApi({
    reducerPath: 'subcategoriesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/categorys/`,
    }),
    tagTypes: ['Subcategories'],

    endpoints: builder => ({
        getSubcategories: builder.query<SubCategoryApiResponse, void>({
            query: () => ({
                url: 'list/all/subcategory',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Subcategories'],
        }),
        getSingleSubcategory: builder.query<SubCategoryApiResponse, number>({
            query: id => ({
                url: `list/one/subcategory/${id}/`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['Subcategories'],
        }),

        createSubcategory: builder.mutation<
            SubCategoryApiResponse,
            Partial<SubCategoryApiResponse>
        >({
            query: subcategory => ({
                url: `create/subcategory/`,
                method: 'POST',
                body: subcategory,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Subcategories'],
        }),
        deleteSubcategory: builder.mutation<void, string | undefined>({
            query: id => ({
                url: `rud/subcategory/${id}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: ['Subcategories'],
        }),
        updateSubcategory: builder.mutation({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            query: ({ id, updatedSubcategory }) => ({
                url: `rud/subcategory/${id}/`,
                method: 'PUT',
                body: updatedSubcategory,
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }),
            invalidatesTags: ['Subcategories'],
        }),
    }),
});

export const {
    useGetSubcategoriesQuery,
    useGetSingleSubcategoryQuery,
    useCreateSubcategoryMutation,
    useDeleteSubcategoryMutation,
    useUpdateSubcategoryMutation,
} = subcategoriesAPI;
