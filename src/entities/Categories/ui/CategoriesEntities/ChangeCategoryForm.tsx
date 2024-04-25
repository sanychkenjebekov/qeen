import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import { ChangeEvent, FC, FormEvent, memo } from 'react';

interface ChangeCategoryFormProps {
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    singleCategory: { title: string; image: string };
}

export const ChangeCategoryForm: FC<ChangeCategoryFormProps> = memo(props => {
    const { handleOnChange, handleSubmit, handleFileChange, singleCategory } = props;

    return (
        <form onSubmit={handleSubmit}>
            <InputField
                style="my-5"
                typeField=""
                name="title"
                type="text"
                placeholder="Введите новую категорию"
                value={singleCategory.title}
                onChange={handleOnChange}
            />
            <InputField
                style="my-5"
                typeField=""
                name="image"
                type="file"
                placeholder="Введите новую картинку"
                onChange={handleFileChange}
            />

            <Button type="submit" typeButton="" style="admin-button text-base">
                Изменить
            </Button>
        </form>
    );
});
