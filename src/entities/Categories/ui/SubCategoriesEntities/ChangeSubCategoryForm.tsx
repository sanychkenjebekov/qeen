import { CategorysTypes } from '@/entities/Product/model/types/categorys.types';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import Select from '@/shared/ui/Select';
import { ChangeEvent, FC, FormEvent, memo } from 'react';

interface ChangeSubCategoryProps {
    handleSubmitChangeSubcategory: (e: FormEvent<HTMLFormElement>) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    categories: CategorysTypes[] | undefined;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    subCategoryValue: { title: string; category: string; image: string };
}

export const ChangeSubCategoryForm: FC<ChangeSubCategoryProps> = memo(props => {
    const {
        handleInputChange,
        handleSubmitChangeSubcategory,
        categories,
        subCategoryValue,
        handleFileChange,
    } = props;

    return (
        <form onSubmit={handleSubmitChangeSubcategory}>
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
                name="image"
                type="file"
                placeholder="Выберите картинку"
                onChange={handleFileChange}
            />
            <Select
                data={categories}
                name="category"
                value={subCategoryValue.category}
                onChange={handleInputChange}
            >
                Выберите категорию
            </Select>
            <Button typeButton="" style="admin-button text-base" type="submit">
                Изменить под категорию
            </Button>
        </form>
    );
});
