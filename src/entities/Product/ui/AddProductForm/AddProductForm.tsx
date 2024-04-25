/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from '@/shared/ui/Buttons/Button';
import InputField from '@/shared/ui/Inputs/InputField';
import Select from '@/shared/ui/Select';
import React, { ChangeEvent } from 'react';
import { SubCategory } from '@/features/Categories/ui/model/types/subCategory.types';
import { ProductType } from '../../model/types/product.types';
import { ColorTypes, SizesTypes } from '@/features/Colors&Sizes/ui/model/types/types';
import { CharacteristicsTypes } from '@/features/Characteristics/ui/model/types/characteristics.types';

interface AddProductFormProps {
    availableCategories: SubCategory[] | undefined;
    handleSubmitFilters: (e: ChangeEvent<HTMLFormElement>) => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleMultiSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    productData: ProductType;
    characteristics: CharacteristicsTypes[] | undefined;
    colors: ColorTypes[] | undefined;
    sizes: SizesTypes[] | undefined;
}

const AddProductForm: React.FC<AddProductFormProps> = props => {
    const {
        characteristics,
        availableCategories,
        handleSubmitFilters,
        handleInputChange,
        handleMultiSelect,
        productData,
        handleFileChange,
        colors,
        sizes,
    } = props;
    const pathname = window.location.pathname;

    return (
        <form onSubmit={handleSubmitFilters}>
            <InputField
                required={true}
                style="my-5"
                typeField=""
                name="title"
                type="text"
                placeholder={`${pathname.includes('change') ? 'Введите новое название' : 'Введите название'}`}
                value={productData.title}
                onChange={handleInputChange}
            />
            <InputField
                required={true}
                placeholder={`${pathname.includes('change') ? 'Введите новую цену' : 'Введите цену'}`}
                style="my-5"
                typeField=""
                name="price"
                type="number"
                value={productData.price}
                onChange={handleInputChange}
            />
            <InputField
                required={true}
                style="my-5"
                typeField=""
                name="brand"
                type="text"
                placeholder={`${pathname.includes('change') ? 'Введите новый брэнд' : 'Введите брэнд'}`}
                value={productData.brand}
                onChange={handleInputChange}
            />
            <label htmlFor="images1">
                {`${pathname.includes('change') ? 'Выберите новую картинку' : 'Выберите картинку(обязательно)'}`}
            </label>
            <InputField
                required={true}
                style="my-5"
                typeField=""
                type="file"
                name="images1"
                onChange={handleFileChange}
            />
            <label htmlFor="images2">
                {`${pathname.includes('change') ? 'Выберите новую картинку' : 'Выберите картинку(не обязательно)'}`}
            </label>
            <InputField
                required={false}
                style="my-5"
                typeField=""
                type="file"
                name="images2"
                onChange={handleFileChange}
            />
            <label htmlFor="images3">
                {`${pathname.includes('change') ? 'Выберите новую картинку' : 'Выберите картинку(не обязательно)'}`}
            </label>
            <InputField
                required={false}
                style="my-5"
                typeField=""
                type="file"
                name="images3"
                onChange={handleFileChange}
            />
            <InputField
                required={true}
                style="my-5"
                typeField=""
                name="description"
                type="text"
                placeholder={`${pathname.includes('change') ? 'Введите новое описание' : 'Введите описание'}`}
                value={productData.description}
                onChange={handleInputChange}
            />
            <InputField
                placeholder={`${pathname.includes('change') ? 'Введите новую скидку' : 'Введите скидку'}`}
                style="my-5"
                typeField=""
                name="discount"
                type="number"
                value={productData.discount}
                onChange={handleInputChange}
            />
            <div className="flex gap-5 flex-wrap items-center">
                <Select
                    multipleType={false}
                    data={availableCategories && availableCategories.map(filter => filter)}
                    name="subcategory"
                    //@ts-ignore
                    value={productData.subcategory}
                    onChange={handleInputChange}
                >
                    {productData.subcategory}
                </Select>
                <select
                    className="border rounded py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
                    id="size"
                    name="size"
                    multiple
                    //@ts-ignore
                    value={productData.size}
                    onChange={handleMultiSelect}
                >
                    {sizes?.map(size => (
                        <option key={size.id} value={size.id}>
                            {size.sizes}
                        </option>
                    ))}
                </select>
                <select
                    className="border rounded py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
                    id="color"
                    name="color"
                    multiple
                    //@ts-ignore
                    value={productData.color}
                    onChange={handleMultiSelect}
                >
                    {colors?.map(color => (
                        <option key={color.id} value={color.id}>
                            {color.colors}
                        </option>
                    ))}
                </select>
                <select
                    className="border rounded py-2 px-3 bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-500"
                    id="characteristics"
                    name="characteristics"
                    multiple
                    //@ts-ignore
                    value={productData.characteristics}
                    onChange={handleMultiSelect}
                >
                    {characteristics?.map(characteristic => (
                        <option key={characteristic.id} value={characteristic.id}>
                            {characteristic.title}
                        </option>
                    ))}
                </select>
            </div>

            <Button type="submit" typeButton="" style="admin-button !text-base ">
                {pathname.includes('change') ? 'Изменить' : 'Добавить'}
            </Button>
        </form>
    );
};

export default AddProductForm;
