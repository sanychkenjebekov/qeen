import { useCreateSizeMutation } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import { ChangeEvent, FormEvent, useState } from 'react';

const AdminPanelSizesForm = () => {
    const [createSize, { isSuccess, error: sizeError }] = useCreateSizeMutation();
    const [size, setSize] = useState({
        sizes: '',
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        createSize(size);
        setSize({ sizes: '' });
    };
    return (
        <div className="mb-5">
            <form onSubmit={handleSubmit} className="flex items-center gap-5 flex-wrap">
                <InputField
                    required
                    value={size.sizes}
                    placeholder="Добавить размер"
                    type="text"
                    typeField=""
                    style=""
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSize({ ...size, sizes: e.target.value })
                    }
                />
                <Button type="submit" typeButton="" style="admin-button text-base">
                    Добавить
                </Button>
            </form>
            <SuccessErrorMessage
                text="Размер успешно добавлен !"
                isSuccess={isSuccess}
                error={sizeError}
            />
        </div>
    );
};

export default AdminPanelSizesForm;
