/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AddSubCategoryForm } from '@/entities/Categories';
import { useCreateSubcategoryMutation } from '@/features/SubCategories/ui/services/apiSubCategories';
import { ChangeEvent, useState } from 'react';
import { useGetCategoriesQuery } from '../model/services/categoriesAPI';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';

export const AddSubCategory = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [createSubcategory, { isSuccess, error: subcategoryError }] =
        useCreateSubcategoryMutation();
    const [subCategoryValue, setSubCategoryValue] = useState({
        title: '',
        image: '',
        category: 'Выберите категорию',
    });

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

    const handleSubmitCategories = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', subCategoryValue.title);
        formData.append('image', subCategoryValue.image);
        formData.append('category', subCategoryValue.category);
        //@ts-ignore
        createSubcategory(formData);
        setSubCategoryValue({
            title: '',
            image: '',
            category: 'Выберите категорию',
        });
    };

    return (
        <>
            <AddSubCategoryForm
                categories={categories?.results}
                subCategoryValue={subCategoryValue}
                handleFileChange={handleFileChange}
                handleInputChange={handleInputChange}
                handleSubmitCategories={handleSubmitCategories}
            />
            <RequestProcessing isLoading={isLoading} error={error} />
            <SuccessErrorMessage
                text="Под категория успешно добавлена !"
                error={subcategoryError}
                isSuccess={isSuccess}
            />
        </>
    );
};
