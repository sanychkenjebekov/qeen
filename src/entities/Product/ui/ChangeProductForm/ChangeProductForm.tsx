import { ChangeEvent, FC, FormEvent, memo } from 'react';
import InputField from '@/shared/ui/Inputs/InputField';
import Button from '@/shared/ui/Buttons/Button';
import { ProductType } from '../../model/types/product.types';

interface ChangeProductForm {
    singleProduct: ProductType;
    handleOnChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmitChanges: (e: FormEvent<HTMLFormElement>) => void;
}

const ChangeProductForm: FC<ChangeProductForm> = memo(props => {
    const { handleOnChange, handleSubmitChanges, singleProduct } = props;

    return (
        <form>
            <InputField
                style="my-5"
                typeField=""
                name="title"
                type="text"
                placeholder="Введите название"
                onChange={handleOnChange}
                value={singleProduct.title}
            />
            <InputField
                style="my-5"
                typeField=""
                name="characteristics"
                type="text"
                placeholder="Введите характеристики"
                onChange={handleOnChange}
                value={singleProduct.characteristics}
            />
            <label htmlFor="price">Введите цену</label>
            <InputField
                style="my-5"
                typeField=""
                name="price"
                type="number"
                value={singleProduct.price}
                onChange={handleOnChange}
            />
            <InputField
                style="my-5"
                typeField=""
                name="brand"
                type="text"
                placeholder="Введите брэнд"
                onChange={handleOnChange}
                value={singleProduct.brand}
            />
            <InputField
                value=""
                style="my-5"
                typeField=""
                type="file"
                name="images"
                onChange={handleOnChange}
                placeholder="Выберите файл"
            />
            <InputField
                style="my-5"
                typeField=""
                name="description"
                type="text"
                placeholder="Введите описание"
                onChange={handleOnChange}
                value={singleProduct.description}
            />
            {/* <InputField
                style="my-5"
                typeField=""
                name="color"
                type="text"
                placeholder="Введите цвета"
                value={.color.toString()}
            /> */}
            {/* <InputField
                style="my-5"
                typeField=""
                name="size"
                type="text"
                placeholder="Введите размеры"
            />
            <label htmlFor="discount">Введите скидку</label>
            <InputField
                style="my-5"
                typeField=""
                name="discount"
                type="number"
                value={singleProduct.discount}
            /> */}
            {/* <Select
                data={availableCategories && availableCategories.map(filter => filter)}
                name="categories"
                value={String(singleProduct.subcategory)}
            >
                Выберите новую категорию
            </Select> */}

            <Button
                onClick={() => handleSubmitChanges}
                type="submit"
                typeButton=""
                style="admin-button text-base"
            >
                Изменить
            </Button>
        </form>
    );
});

export default ChangeProductForm;
