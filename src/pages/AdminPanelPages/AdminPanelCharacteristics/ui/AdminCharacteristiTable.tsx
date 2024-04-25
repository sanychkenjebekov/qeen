import { useUpdateCharacteristicMutation } from '@/features/Characteristics/ui/model/services/characteristicsAPI';
import { CharacteristicsTypes } from '@/features/Characteristics/ui/model/types/characteristics.types';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import Modal from '@/widgets/Modal/Modal';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

interface AdminCharacteristicTableProps {
    characteristics: CharacteristicsTypes[] | undefined;
    deleteCharacteristics: (id: number) => void;
}

const AdminCharacteristiTable: FC<AdminCharacteristicTableProps> = ({
    characteristics,
    deleteCharacteristics,
}) => {
    const [updateCharacteristic, { isSuccess, error }] = useUpdateCharacteristicMutation();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [characteristic, setCharacteristic] = useState<Omit<CharacteristicsTypes, 'id'>>({
        title: '',
        value: '',
    });
    const [characteristicId, setCharacteristicId] = useState<number>(0);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCharacteristic({ ...characteristic, [name]: value });
    };
    const handleUpdateCharacteristic = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateCharacteristic({ id: characteristicId, updatedCharacteristic: characteristic });
        setCharacteristic({ title: '', value: '' });
    };

    return (
        <>
            <Modal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                className="bg-secondary flex flex-col items-center p-10 rounded-xl w-96"
            >
                <span className="text-xl text-primary mb-5 font-semibold">
                    Изменить характеристику
                </span>
                <form className="flex flex-col items-center" onSubmit={handleUpdateCharacteristic}>
                    <InputField
                        style="mb-5"
                        placeholder="Новое название"
                        onChange={handleInputChange}
                        name="title"
                        value={characteristic.title}
                        type="text"
                        typeField=""
                    />
                    <InputField
                        placeholder="Новое значение"
                        onChange={handleInputChange}
                        name="value"
                        value={characteristic.value}
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
            <table className="w-full border-collapse border bg-secondary border-gray-200 overflow-scroll">
                <thead>
                    <tr>
                        <th className="border border-gray-200 px-4 py-2" scope="col">
                            Название
                        </th>
                        <th className="border border-gray-200 px-4 py-2" scope="col">
                            Значение
                        </th>
                        <th className="border border-gray-200 px-4 py-2" scope="col">
                            Действия
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {characteristics?.map(characteristic => (
                        <tr className="border border-gray-200" key={characteristic.id}>
                            <td className="border border-gray-200 px-4 py-2">
                                {characteristic.title}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                {characteristic.value}
                            </td>
                            <td className="border border-gray-200 px-4 py-2">
                                <div className="flexCenter gap-3">
                                    <Button
                                        onClick={() => deleteCharacteristics(characteristic.id)}
                                        type="submit"
                                        typeButton="error"
                                        style="!text-base !p-2"
                                    >
                                        Удалить
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setCharacteristicId(characteristic.id);
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
        </>
    );
};

export default AdminCharacteristiTable;
