/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, useState } from 'react';
import { useCreateCategoryMutation } from '@/features/Categories/ui/model/services/categoriesAPI';
import { AddCategoryForm } from '@/entities/Categories';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';

export const AddCategory = () => {
    const [createCategory, { isSuccess, error }] = useCreateCategoryMutation();
    const [categoryValue, setCategoryValue] = useState({
        title: '',
        image: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCategoryValue({ ...categoryValue, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            //@ts-ignore
            setCategoryValue({ ...categoryValue, image: selectedFile });
        }
    };

    const handleSubmitCategories = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', categoryValue.title);
        formData.append('image', categoryValue.image);
        //@ts-ignore
        createCategory(formData);
        setCategoryValue({
            title: '',
            image: '',
        });
    };

    return (
        <section className="max-admin-container padding-admin-container">
            <AddCategoryForm
                handleInputChange={handleInputChange}
                handleSubmitCategories={handleSubmitCategories}
                categoryValue={categoryValue}
                handleFileChange={handleFileChange}
            />
            <SuccessErrorMessage
                text="Категория успешно добавлена !"
                isSuccess={isSuccess}
                error={error}
            />
        </section>
    );
};
