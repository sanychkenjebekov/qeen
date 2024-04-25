import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import { ChangeEvent, FC, memo } from 'react';

interface AddCategoryFormProps {
    handleSubmitCategories: (e: ChangeEvent<HTMLFormElement>) => void;
    categoryValue: { title: string; image: string };
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AddCategoryForm: FC<AddCategoryFormProps> = memo(props => {
    const { handleInputChange, handleSubmitCategories, categoryValue, handleFileChange } = props;
    return (
        <>
            <form onSubmit={handleSubmitCategories} encType="multipart/form-data">
                <InputField
                    style="my-5"
                    typeField=""
                    name="title"
                    type="text"
                    placeholder="Введите название"
                    value={categoryValue.title}
                    onChange={handleInputChange}
                />
                <InputField
                    style="my-5"
                    typeField=""
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                />
                <Button style="admin-button text-base" typeButton="" type="submit">
                    Добавить категорию
                </Button>
            </form>
        </>
    );
});
