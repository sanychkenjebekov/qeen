import { useUpdateColorMutation } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { ColorTypes } from '@/features/Colors&Sizes/ui/model/types/types';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import Modal from '@/widgets/Modal/Modal';
import { Placeholder } from '@phosphor-icons/react';
import { ChangeEvent, FC, FormEvent, memo, useState } from 'react';

interface AdminColorsTableProps {
    colors: ColorTypes[] | undefined;
    deleteColor: (id: number) => void;
}

const AdminColorsTable: FC<AdminColorsTableProps> = memo(props => {
    const { colors, deleteColor } = props;
    const [colorValue, setColorValue] = useState({
        colors: '',
    });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [colorId, setColorId] = useState<number>(0);
    const [updateColor, { isSuccess, error }] = useUpdateColorMutation();
    const handleUpdateSize = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateColor({ id: colorId, updatedColor: colorValue });
        setColorValue({ colors: '' });
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                className="bg-secondary flex flex-col items-center p-10 rounded-xl w-96"
            >
                <span className="text-xl text-primary mb-5 font-semibold">Изменить цвет</span>
                <form className="flex flex-col items-center" onSubmit={handleUpdateSize}>
                    <InputField
                        placeholder="Новый цвет"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setColorValue({ colors: e.target.value })
                        }
                        name="size"
                        value={colorValue.colors}
                        type="text"
                        typeField=""
                    />
                    <SuccessErrorMessage
                        isSuccess={isSuccess}
                        error={error}
                        text="Размер успешно обновлен"
                    />
                    <Button typeButton="" style="admin-button text-base" type="submit">
                        Обновить
                    </Button>
                </form>
            </Modal>
            {colors?.length === 0 ? (
                <h2 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Нет цветов <Placeholder size={32} />
                </h2>
            ) : (
                <table className="w-full border-collapse border bg-secondary border-gray-200 overflow-scroll">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Цвета</th>
                        </tr>
                    </thead>

                    <tbody>
                        {colors?.map((color, index) => (
                            <tr key={index} className="border border-gray-200">
                                <td className="flex justify-between border border-gray-200 px-4 py-2">
                                    {color.colors}
                                    <div className="flexCenter gap-3">
                                        <Button
                                            onClick={() => deleteColor(color.id)}
                                            type="submit"
                                            typeButton="error"
                                            style="!text-base !p-2"
                                        >
                                            Удалить
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setColorId(color.id);
                                                setIsVisible(prev => !prev);
                                            }}
                                            type="submit"
                                            typeButton="primary"
                                            style="!text-base !p-2"
                                        >
                                            Изменить
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
});

export default AdminColorsTable;
