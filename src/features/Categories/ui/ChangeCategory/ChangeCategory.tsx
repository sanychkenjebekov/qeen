import { useParams } from 'react-router-dom';
import { useUpdateCategoryMutation } from '../model/services/categoriesAPI';
import { ChangeCategoryForm } from '@/entities/Categories';
import { ChangeEvent, FormEvent, useState } from 'react';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';

export const ChangeCategory = () => {
    const { id } = useParams();
    const [updateCategory, { isSuccess, error: categoryError }] = useUpdateCategoryMutation();

    const [singleCategory, setSingleCategory] = useState({
        title: '',
        image: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSingleCategory({ ...singleCategory, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setSingleCategory({ ...singleCategory, image: selectedFile });
        }
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', singleCategory.title);
        formData.append('image', singleCategory.image);
        updateCategory({ id: Number(id), updatedCategory: formData });
        setSingleCategory({
            title: '',
            image: '',
        });
    };

    return (
        <>
            <ChangeCategoryForm
                singleCategory={singleCategory}
                handleSubmit={handleSubmit}
                handleOnChange={handleInputChange}
                handleFileChange={handleFileChange}
            />
            <SuccessErrorMessage
                text="Категория успешно изменена !"
                isSuccess={isSuccess}
                error={categoryError}
            />
        </>
    );
};
