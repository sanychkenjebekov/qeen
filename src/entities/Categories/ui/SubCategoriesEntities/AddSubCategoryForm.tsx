import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import Select from '@/shared/ui/Select';
import { ChangeEvent, FC, memo } from 'react';

interface AddSubCategoryFormProps {
    handleSubmitCategories: (e: ChangeEvent<HTMLFormElement>) => void;
    subCategoryValue: { title: string; image: string; category: string };
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    categories: CategorysTypes[] | undefined;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AddSubCategoryForm: FC<AddSubCategoryFormProps> = memo(props => {
    const {
        handleInputChange,
        handleSubmitCategories,
        categories,
        subCategoryValue,
        handleFileChange,
    } = props;
    return (
        <>
            <form onSubmit={handleSubmitCategories} encType="multipart/form-data">
                <InputField
                    style="my-5"
                    typeField=""
                    name="title"
                    type="text"
                    placeholder="Введите название"
                    value={subCategoryValue.title}
                    onChange={handleInputChange}
                />
                <InputField
                    style="my-5"
                    typeField=""
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />

                <Select
                    data={categories && categories.map(category => category)}
                    value={subCategoryValue.category}
                    onChange={handleInputChange}
                    name="category"
                >
                    {subCategoryValue.category}
                </Select>
                <Button style="admin-button text-base" typeButton="" type="submit">
                    Добавить под категорию
                </Button>
            </form>
        </>
    );
});
