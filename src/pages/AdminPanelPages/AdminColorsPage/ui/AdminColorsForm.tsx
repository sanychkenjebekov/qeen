import { useCreateColorMutation } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import { ChangeEvent, FormEvent, useState } from 'react';

const AdminColorsForm = () => {
    const [createColor, { isSuccess, error: colorError }] = useCreateColorMutation();
    const [color, setColor] = useState({
        colors: '',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColor({ ...color, colors: e.target.value });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        createColor(color);
        setColor({ colors: '' });
    };
    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit} className="flex items-center gap-5 flex-wrap">
                <InputField
                    required
                    value={color.colors}
                    placeholder="Добавить цвет"
                    type="text"
                    typeField=""
                    onChange={handleChange}
                />
                <Button type="submit" typeButton="" style="admin-button text-base">
                    Добавить
                </Button>
                <span className="text-base font-bold text-primary">
                    Цвета должны быть на английском языке !
                </span>
            </form>
            <SuccessErrorMessage
                text="Цвет удачно добавлен !"
                isSuccess={isSuccess}
                error={colorError}
            />
        </div>
    );
};

export default AdminColorsForm;
