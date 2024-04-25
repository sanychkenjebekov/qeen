import { useUpdateSizeMutation } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import { SizesTypes } from '@/features/Colors&Sizes/ui/model/types/types';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import Modal from '@/widgets/Modal/Modal';
import { Placeholder } from '@phosphor-icons/react';
import React, { ChangeEvent, memo, useState } from 'react';

interface AdminPanelSizesTableProps {
    sizes: SizesTypes[] | undefined;
    deleteSize: (id: number) => void;
}

const AdminPanelSizesTable: React.FC<AdminPanelSizesTableProps> = memo(props => {
    const { sizes, deleteSize } = props;
    const [sizeValue, setSizeValue] = useState({
        sizes: '',
    });
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [sizeId, setSizeId] = useState<number>(0);
    const [updateSize, { isSuccess, error }] = useUpdateSizeMutation();
    const handleUpdateSize = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSize({ id: sizeId, updatedSize: sizeValue });
        setSizeValue({ sizes: '' });
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                className="bg-secondary flex flex-col items-center p-10 rounded-xl w-96"
            >
                <span className="text-xl text-primary mb-5 font-semibold">Изменить размер</span>
                <form className="flex flex-col items-center" onSubmit={handleUpdateSize}>
                    <InputField
                        placeholder="Новый размер"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setSizeValue({ sizes: e.target.value })
                        }
                        name="size"
                        value={sizeValue.sizes}
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
            {sizes?.length === 0 ? (
                <h2 className="flexCenter gap-5 text-center text-2xl text-primary font-semibold">
                    Нет размеров <Placeholder size={32} />
                </h2>
            ) : (
                <table className="w-full border-collapse border bg-secondary border-gray-200 overflow-scroll">
                    <thead>
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Размеры</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sizes?.map((size, index) => (
                            <tr key={index} className="border border-gray-200">
                                <td className="flex justify-between border border-gray-200 px-4 py-2">
                                    {size.sizes}
                                    <div className="flexCenter gap-3">
                                        <Button
                                            onClick={() => deleteSize(size.id)}
                                            type="submit"
                                            typeButton="error"
                                            style="!text-base !p-2"
                                        >
                                            Удалить
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setSizeId(size.id);
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

export default AdminPanelSizesTable;
