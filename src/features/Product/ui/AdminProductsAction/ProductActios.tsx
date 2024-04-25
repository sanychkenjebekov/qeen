/* eslint-disable @typescript-eslint/ban-ts-comment */
import AddProductForm from '@/entities/Product/ui/AddProductForm/AddProductForm';
import { useGetCharacteristicsQuery } from '@/features/Characteristics/ui/model/services/characteristicsAPI';
import { useGetColorsQuery } from '@/features/Colors&Sizes/ui/model/services/colorsApi';
import { useGetSizesQuery } from '@/features/Colors&Sizes/ui/model/services/sizesApi';
import { useGetSubcategoriesQuery } from '@/features/SubCategories/ui/services/apiSubCategories';
import SuccessErrorMessage from '@/shared/ui/SuccessErrorMessage';
import RequestProcessing from '@/widgets/RequestProcessing/RequestProcessing';
import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateProductMutation, useUpdateProductMutation } from '../model/services/productAPI';

const ProductAction = () => {
    const { data: subCategories, isLoading, error } = useGetSubcategoriesQuery();
    const { data: colors, isLoading: colorsLoading, error: colorError } = useGetColorsQuery();
    const { data: sizes, isLoading: sizesLoading, error: sizeError } = useGetSizesQuery();
    const { data: characteristics } = useGetCharacteristicsQuery();

    const [createProduct, { isSuccess, error: productError }] = useCreateProductMutation();
    const [updateProduct, { isSuccess: updateSuccess, error: updateError }] =
        useUpdateProductMutation();

    const pathname = window.location.pathname;
    const { id } = useParams();
    const [productData, setProductData] = useState({
        subcategory: 'Выберите категорию',
        title: '',
        price: '',
        description: '',
        brand: '',
        characteristics: [],
        images1: '',
        images2: '',
        images3: '',
        color: [],
        size: [],
        discount: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };
    const handleMultiSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter(option => option.selected)
            .map(option => option.value);
        setProductData({ ...productData, [name]: selectedValues });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //@ts-ignore
            setProductData({ ...productData, images1: e.target.files[0] });
        } else {
            //@ts-expect-error
            setProductData({ ...productData, images1: null });
        }
    };

    const handleSubmitFilters = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('subcategory', productData.subcategory);
        formData.append('title', productData.title);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('brand', productData.brand);
        //@ts-ignore
        formData.append('characteristics', productData.characteristics);
        formData.append('images1', productData.images1);
        //@ts-ignore
        formData.append('color', productData.color);
        //@ts-ignore
        formData.append('size', productData.size);
        formData.append('discount', productData.discount);
        pathname.includes('change')
            ? updateProduct({ id: Number(id), updatedProduct: formData })
            : //@ts-ignore
              createProduct(formData);
        
        setProductData({
            subcategory: 'Выберите категорию',
            title: '',
            price: '',
            description: '',
            brand: '',
            characteristics: [],
            images1: '',
            images2: '',
            images3: '',
            color: [],
            size: [],
            discount: '',
        });
    };

    return (
        <>
            <AddProductForm
                colors={colors?.results}
                sizes={sizes?.results}
                characteristics={characteristics?.results}
                //@ts-ignore
                productData={productData}
                handleSubmitFilters={handleSubmitFilters}
                availableCategories={subCategories?.results}
                handleInputChange={handleInputChange}
                handleMultiSelect={handleMultiSelect}
                handleFileChange={handleFileChange}
            />
            <RequestProcessing
                isLoading={isLoading || colorsLoading || sizesLoading}
                error={error || colorError || sizeError}
            />
            <SuccessErrorMessage
                isSuccess={pathname.includes('change') ? updateSuccess : isSuccess}
                error={pathname.includes('change') ? updateError : productError}
                text={
                    pathname.includes('change')
                        ? 'Товар успешно изменен !'
                        : 'Товар успешно добавлен !'
                }
            />
        </>
    );
};

export default ProductAction;
