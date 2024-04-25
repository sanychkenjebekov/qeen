/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../model/services/categoriesAPI';
import Loader from '@/shared/ui/Loader/Loader';
import { useUpdateSubcategoryMutation } from '@/features/SubCategories/ui/services/apiSubCategories';
import { ChangeEvent, FormEvent, useState } from 'react';
import { ChangeSubCategoryForm } from '@/entities/Categories';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';

export const ChangeSubCategory = () => {
    const { id } = useParams();
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [updateSubcategory, { isSuccess, error: subCategoryError }] =
        useUpdateSubcategoryMutation();
    const [subCategoryValue, setSubCategoryValue] = useState({
        title: '',
        image: '',
        category: '0',
    });

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        return <h1>Что то пошло не так</h1>;
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSubCategoryValue({ ...subCategoryValue, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        //@ts-ignore
        setSubCategoryValue({ ...subCategoryValue, image: file });
    };
    const handleSubmitChangeSubcategory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', subCategoryValue.title);
        formData.append('category', subCategoryValue.category);
        formData.append('image', subCategoryValue.image);

        //@ts-ignore
        updateSubcategory({ id: Number(id), updatedSubcategory: formData });
        setSubCategoryValue({
            title: '',
            image: '',
            category: '0',
        });
    };

    return (
        <>
            <ChangeSubCategoryForm
                subCategoryValue={subCategoryValue}
                categories={categories?.results}
                handleFileChange={handleFileChange}
                handleInputChange={handleInputChange}
                handleSubmitChangeSubcategory={handleSubmitChangeSubcategory}
            />
            <SuccessErrorMessage
                text="Под категория успешно изменена !"
                isSuccess={isSuccess}
                error={subCategoryError}
            />
        </>
    );
};
